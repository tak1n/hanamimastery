const readingTime = require("reading-time")
const matter = require("gray-matter")
const mdxPrism = require("mdx-prism")
const { serialize } = require("next-mdx-remote/serialize");


/*
  Extends the file meta data by additional fields and information, like
  adding HOST to the thumbnail urls, adding slug (from filename), path, URL, etc
  @param [String] filePath, i.e 'episodes/1-super-episode'
  @param [Object] data object to extend, read from the file
*/
function _serializeContentData(filePath, data) {
  const postSlug = filePath.split("/").slice(1)[0];
  const itemPath = (type == 'pages') ? postSlug : filePath;

  return {
    ...data,
    slug: postSlug,
    path: itemPath,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/${itemPath}`,
    namespace: postPath.split("/").slice(0)[0],
    thumbnail: {
      full: `${process.env.NEXT_PUBLIC_BASE_URL}${data.thumbnail.full}`,
      big: `${process.env.NEXT_PUBLIC_BASE_URL}${data.thumbnail.big}`,
      small: `${process.env.NEXT_PUBLIC_BASE_URL}${data.thumbnail.small}`
    }
  }
}

/*
  Reads content object based on given type and slug
  @param [String] the folderName (optional), i.e: "articles"
  @param [string] slug
  @return [Object] a content object
*/

async function getContentBySlug(type, slug) {
  const filePath = slug ? `${type}/${slug}` : type
  const source = await readFileByPath(filePath);

  const { data, content } = matter(source);
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [mdxPrism],
    },
  });
  return {
    mdxSource,
    frontMatter: {
      wordCount: content.split(/\s+/gu).length,
      readingTime: readingTime(content),
      slug: slug || null,
      ..._serializeContentData(filePath, data),
    },
  };
}

/*
  Reads content of the given type. If no type given, reads both articles and episodes, then sorts them all by publishedAt.
  @param [String] the folderName (optional), i.e: "articles"
  @param [string] slug
  @return [Array] list of content objects
*/
async function getContent(type) {
  const paths = await getPaths(type);

  return paths.reduce((allPosts, filePath) => {
    const source = await readFileByPath(filePath);
    const { data } = matter(source);

    return [
      _serializeContentData(filePath, data),
      ...allPosts,
    ].sort((itemA, itemB) => {
      if (itemA.publishedAt > itemB.publishedAt) return -1;
      if (itemA.publishedAt < itemB.publishedAt) return 1;
      return 0;
    });
  }, []);
}

/*
  Fetches content by the given tag
  @param []
*/
async function getContentByTag(tag) {
  const posts = await getContent();
  return posts.filter((item) => (item.tags.includes(tag)));
}

exports.getContent = getContent;
exports.getContentBySlug = getContentBySlug;
exports.getContentbyTag = getContentByTag;
