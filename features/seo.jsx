import { NextSeo } from "next-seo";

export const SeoComponent = ({ title, fullTitle, thumbnails, url, excerpt, topics, ogtype }) => {
  if (!thumbnails) {
    thumbnails = { big: `${process.env.NEXT_PUBLIC_BASE_URL || ''}/logo-hm.jpeg` }
  }
  return (
    <NextSeo
      title={title}
      titleTemplate=" %s | Hanami Mastery - a knowledge base to hanami framework"
      twitter={{
        site: "@hanamimastery",
        handle: "@sebwilgosz",
        cardType: "summary_large_image",
      }}
      additionalMetaTags={[
        {
          name: "twitter:image",
          content: thumbnails.big,
        },
      ]}
      canonical={url}
      description={excerpt}
      openGraph={{
        article: {
          authors: ["https://www.facebook.com/sebastian.wilgosz"],
          topics,
        },
        locale: "en_US",
        url,
        fullTitle,
        description: excerpt,
        defaultImageWidth: 120,
        defaultImageHeight: 630,
        type: "article",
        site_name: "Hanami Mastery - a knowledge base to hanami framework",
        images: [
          {
            url: thumbnails.big,
            width: 780,
            height: 440,
            alt: title,
          },
        ],
      }}
      facebook={{
        appId: process.env.NEXT_PUBLIC_FB_APP_ID,
      }}
    />
  );
};
