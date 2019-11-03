import React from 'react';
import { Link } from 'react-router-dom';

const Posts = ({ posts, loading }) => {
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul className='list-group mb-4'>
      {posts.map(post => (
        <li key={post.id} className='list-group-item'>
           <div><Link to="/buyerhome">{post.item_name}</Link></div>
        </li>
      ))}
    </ul>
  );
};

export default Posts;