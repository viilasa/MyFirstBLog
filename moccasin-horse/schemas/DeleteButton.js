// DeleteButton.js

import React from 'react';
import PropTypes from 'prop-types';

const DeleteButton = ({ type }) => (
  <button
    onClick={() => {
      if (confirm('Are you sure you want to delete this article?')) {
        // Call a function to delete the article here
        console.log('Delete article');
      }
    }}
    style={{ background: 'red', color: 'white' }}
  >
    Delete
  </button>
);

DeleteButton.propTypes = {
  type: PropTypes.object, // The type object from Sanity
};

export default DeleteButton;