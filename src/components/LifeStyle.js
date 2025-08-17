import React, { useEffect, useState } from 'react';
import './lifestyle.css';
import client from '../sanity';

function Lifestyles() {
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.fetch(`
          *[_type == "lifestyle"] | order(sortOrder asc) | [0...2] {
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
    <div className="ls-container">
      <div className="title-size"><h1>Lifestyle</h1></div>
      <hr />
      <div className="ls-posts-container">
        {articleData.map((item) => (
          <div key={item._id} className="ls-post">
            <div className="ls-post-image">
              <img src={item.image.asset.url} alt="ls post" />
            </div>
            <div className="ls-post-content">
              {item.slug && item.slug.current ? (
                <a href={`/lifestyle/${item.slug.current}`}>
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

export default Lifestyles;
