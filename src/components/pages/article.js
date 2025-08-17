import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import imageUrlBuilder from '@sanity/image-url';
import sanityClient from '../../sanity';
import PortableText from '@sanity/block-content-to-react';
import { FaFacebook, FaTwitter, FaInstagram, FaReddit } from 'react-icons/fa';

import './art.css';

const useImageSerializer = (node) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchImageUrl = async () => {
      try {
        const assetQuery = `*[_type == 'sanity.imageAsset' && _id == $assetId][0] {
          url
        }`;
        const { url } = await sanityClient.fetch(assetQuery, { assetId: node.asset._ref });
        setImageUrl(url);
      } catch (error) {
        console.log('Error fetching image URL:', error);
      }
    };

    fetchImageUrl();
  }, [node.asset._ref]);

  return imageUrl;
};

const Article = () => {
  const { slug } = useParams();
  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const query = `*[_type == 'main' && slug.current == $slug][0] {
          title,
          content
        }`;
        const result = await sanityClient.fetch(query, { slug });

        if (result) {
          setArticleData(result);
        }
      } catch (error) {
        console.log('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [slug]);

  if (!articleData) {
    return <div>Loading...</div>;
  }

  const { title, content } = articleData;

  // Function to build image URLs using Sanity's imageUrlBuilder
  const builder = imageUrlBuilder(sanityClient);
  const urlFor = (source) => builder.image(source);

  // Custom serializer for images
  const ImageSerializer = ({ node }) => {
    const imageUrl = useImageSerializer(node);

    if (!imageUrl) {
      return <div>Loading image...</div>;
    }

    return (
      <div className="ContentImage">
        <img src={imageUrl} alt={node.alt} />
      </div>
    );
  };

  // Custom serializers for blocks
  const serializers = {
    types: {
      block: ({ node, children }) => {
        const { style = 'normal' } = node;
        switch (style) {
          case 'h1':
            return <h1>{children}</h1>;
          case 'h2':
            return <h2>{children}</h2>;
          case 'h3':
            return <h3>{children}</h3>;
          case 'h4':
            return <h4>{children}</h4>;
          case 'blockquote':
            return <blockquote>{children}</blockquote>;
          case 'large':
            return <p className="LargeText">{children}</p>;
          case 'small':
            return <p className="SmallText">{children}</p>;
          default:
            return <p>{children}</p>;
        }
      },
      image: ImageSerializer,
    },
    marks: {
      strong: ({ children }) => <strong>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      underline: ({ children }) => <u>{children}</u>,
      strikethrough: ({ children }) => <del>{children}</del>,
    },
  };

  const shareArticle = () => {
    const urlToShare = `${window.location.origin}/article/${slug}`;
    const articleTitle = title;

    const encodedUrlToShare = encodeURIComponent(urlToShare);
    const encodedArticleTitle = encodeURIComponent(articleTitle);

    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrlToShare}`;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrlToShare}&text=${encodedArticleTitle}`;
    const instagramShareUrl = 'https://www.instagram.com/';
    const redditShareUrl = `https://www.reddit.com/submit?url=${encodedUrlToShare}&title=${encodedArticleTitle}`;

    return (
      <div className="ShareSection">
        <div className="ShareIcons">
          <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </a>
          <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </a>
          <a href={instagramShareUrl} target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </a>
          <a href={redditShareUrl} target="_blank" rel="noopener noreferrer">
            <FaReddit />
          </a>
        </div>
      </div>
    );
  };

  return (
    <div className="article-container">
      {shareArticle()}
      <PortableText blocks={content} serializers={serializers} />
    </div>
  );
};

export default Article;
