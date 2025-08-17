import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './spotlight.css';
import client from '../sanity';

function Editors() {
  const [postData, setPostData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.fetch(`
          *[_type == "spotlight"] | order(sortOrder asc) | [0...3] {
            _id,
            title,
            "imageUrl": imageBlog.asset->url,
            slug {
              current
            },
            paragraph
          }
        `);
        setPostData(response);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="editors-pick-container">
      <div className="title">
        <h2>SpotLight</h2>
      </div>
      <div className="editors-pick-posts-container">
        {postData.map((post) => (
          <div className="editors-pick-post" key={post._id}>
            <div className="editors-pick-post-image">
              {post.imageUrl && <img src={post.imageUrl} alt="editors pick post" />}
            </div>
            <div className="editors-pick-post-content">
              {post.slug && post.slug.current ? (
                <Link to={`/spotlight/${post.slug.current}`}>
                  <h3>{post.title}</h3>
                </Link>
              ) : (
                <h3>{post.title}</h3>
              )}
              <p>{post.paragraph}</p>
            </div>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default Editors;
