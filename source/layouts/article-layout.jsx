/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Typography,
  Card,
  CardContent,
  CardHeader,
} from '@material-ui/core';
import { Grid, Container, makeStyles } from '@material-ui/core';
import EmailSubscriptionForm from '../features/email-subscription-form';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(2),
  },
}));

const ArticleLayout = ({ aside, article }) => {
  const classes = useStyles();
  return (
    <Grid
      container
      className={classes.root}
      component={(props) => (
        <Container maxWidth="lg" component="main" {...props} />
      )}
    >
      <Grid item xs={12} md={8} component="article">
        {article}
      </Grid>
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader
            disableTypography
            title={
              <Typography variant="h5">
                Sponsor this project on Github!
              </Typography>
            }
            subheader={
              <>
                <Typography variant="subtitle1">
                  10% of all your support goes to Hanami development support
                </Typography>
              </>
            }
          />
          <CardContent>
            <Typography>
              <iframe
                src="https://ghbtns.com/github-btn.html?user=swilgosz&type=sponsor"
                frameborder="0"
                scrolling="0"
                width="150"
                height="20"
                title="GitHub" /
                >
            </Typography>
          </CardContent>
        </Card>
        <EmailSubscriptionForm />
      </Grid>
    </Grid>
  );
};

export default ArticleLayout;
