import React, { useEffect, useState } from 'react';
import './entertaiment.css';
import client from '../sanity';

function Entertaiment() {
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.fetch(`
          *[_type == "entertainment"] | order(sortOrder asc) | [0...2] {
            _id,
            slug {
              current
            },
            image {
              asset->{
                url
              }
            },
            title
          }
        `);
        setArticleData(response);
      } catch (error) {
        console.error('Error fetching article data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ent-container">
      <div className="title-size"><h1>Entertaiment</h1></div>
      <hr />
      <div className="ent-posts-container">
        {articleData.map((item) => (
          <div key={item._id} className="ent-post">
            <div className="ent-post-image">
              <img src={item.image.asset.url} alt="ent post" />
            </div>
            <div className="ent-post-content">
              {item.slug && item.slug.current ? (
                <a href={`/entertainment/${item.slug.current}`}>
                  <h3>{item.title}</h3>
                </a>
              ) : (
                <h3>{item.title}</h3>
              )}
            </div>
          </div>
        ))}
      </div>
      {articleData.length === 2 && <hr />}
    </div>
  );
}

export default Entertaiment;
