import React, { useEffect, useState } from 'react';
import './finance.css';
import client from '../sanity';
import { Link } from 'react-router-dom';

function Finance() {
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.fetch(`
          *[_type == "finance"] | order(sortOrder asc) | [0...2] {
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

  const articles = (
    <div className="finance-container">
      <div className="title-size">
        <h1>Finance</h1>
      </div>
      <hr />
      <div className="finance-posts-container">
        {articleData.map((item) => (
          <div key={item._id} className="finance-post card">
            <div className="finance-post-image">
              <img src={item.image.asset.url} alt="finance post" />
            </div>
            <div className="finance-post-content">
              {item.slug && item.slug.current ? (
                <Link to={`/finance/${item.slug.current}`}>
                  <h3>{item.title}</h3>
                </Link>
              ) : (
                <span>{item.title}</span>
              )}
              {/* Render the content of the article if needed */}
            </div>
          </div>
        ))}
      </div>
      {/* Display horizontal line if there are only two articles */}
      {articleData.length === 2 && <hr />}
    </div>
  );

  const error = <h1>no articles</h1>;

  return <>{articleData.length === 0 ? error : articles}</>;
}

export default Finance;
