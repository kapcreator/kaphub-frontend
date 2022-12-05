import React from 'react'
import { useHistory } from 'react-router-dom'
import logo from "../../../images/logo.png"

import "./Post.css"

const Post = ({ post }) => {
  const history = useHistory();
  
  const openPost = () => {
    history.push(`/posts/${post._id}`);
  }

  return (
    <button className="post" onClick={openPost}>
      <img src={post.icon || logo} className='post-img' />
      <p className="post-title">{post.title}</p>
    </button>
  )
}

export default Post