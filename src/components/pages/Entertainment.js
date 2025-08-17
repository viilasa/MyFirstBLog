//Finance Main Page
import React, { useEffect, useState } from 'react';
import '../main.css';
import client from '../../sanity';
import { Link } from 'react-router-dom';

function Blog() {
  const [articleData, setArticleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.fetch(`
          *[_type == "entertainment"] | order(sortOrder asc) | [0...3] {
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
    <div className="blog-container">
      <div className="blog-posts-container">
        {articleData.map((item, index) => (
          <div key={item._id} className="blog-post">
            <div className="blog-post-image">
              <img src={item.image.asset.url} alt="blog post" />
            </div>
            <div className="blog-post-content">
              {item.slug && item.slug.current ? (
                <Link to={`/Entertainment/${item.slug.current}`} onClick={() => handleLinkClick(index)}>
                  {item.title}
                </Link>
              ) : (
                <span>{item.title}</span>
              )}
            </div>
            {item.showContent && (
              <div className="blog-article-content">
                <p>{item.content}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Blog;
