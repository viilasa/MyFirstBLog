import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import client from '../../sanity';

const useStyles = makeStyles((theme) => ({
  financeContainer: {
    padding: theme.spacing(3),
  },
  financePost: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9 aspect ratio
  },
  cardContent: {
    flexGrow: 1,
  },
  financePostTitle: {
    textAlign: 'center',
    textDecoration: 'none',
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
}));

function Finance() {
  const classes = useStyles();
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.fetch(`
          *[_type == "finance"] | order(sortOrder asc) | [0...40] {
            _id,
            slug {
              current
            },
            image {
              asset->{
                url
              }
            },
            title,
            content
          }
        `);
        setArticleData(response);
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    fetchData();
  }, []);

  const handleLinkClick = (index) => {
    setArticleData((prevData) => {
      const newData = [...prevData];
      newData[index].showContent = true;
      return newData;
    });
  };

  return (
    <div className={classes.financeContainer}>
      <Grid container spacing={3}>
        {articleData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={item._id}>
            <Card className={classes.financePost}>
              <CardMedia
                className={classes.cardMedia}
                image={item.image.asset.url}
                title="Finance Post"
              />
              <CardContent className={classes.cardContent}>
                {item.slug && item.slug.current ? (
                  <Link to={`/finance/${item.slug.current}`} onClick={() => handleLinkClick(index)}>
                    <Typography variant="h6" component="h3" className={classes.financePostTitle}>
                      {item.title}
                    </Typography>
                  </Link>
                ) : (
                  <Typography variant="h6" component="h3" className={classes.financePostTitle}>
                    {item.title}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Finance;