import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import client from '../sanity';
import "./mustread.css";


const MustRead = () => {
  const [postData, setPostData] = useState([]);

  // Fetch the data from Sanity
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.fetch(`
          *[_type == "mustRead"] | order(_createdAt desc) [0...1]{
            title,
            "imageUrl": imageBlog.asset->url,
            paragraph,
            slug {
              current
            }
          }
        `);
        setPostData(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="must-read-section">
      <h2 className="must-read-title">Must Read</h2>
      <div className="must-read-container">
        {postData.map((post) => (
          <div className="must-read-post" key={post.title}>
            <div className="must-read-post-image">
              {post.imageUrl && (
                <img src={post.imageUrl} alt="blog post" />
              )}
            </div>
            <div className="must-read-post-content">
              {post.slug && post.slug.current ? (
                <Link to={`/MustRead/${post.slug.current}`}>
                  <h3>{post.title}</h3>
                  <p>{post.paragraph}</p>
                </Link>
              ) : (
                <>
                  
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MustRead;
