import React from 'react'
import { useSelector } from 'react-redux'
import Post from './Post/Post'
import preloader from '../../images/preloader.gif'

import "./Posts.css"

const Posts = ({title}) => {
  const { posts, isLoading } = useSelector((state) => state.posts);

  return (
    isLoading ? <img src={preloader} className='preloader' /> : (
      <div className='posts'>
        <h2 className='section-title'>{title}</h2>
        {posts.length > 0 ? (
          <div className="posts-grid">
            {posts.map((post) => (
              <Post post={post} key={post._id} />
            )) }
          </div>
        ) : (
          <h4 style={{color: 'var(--gray-color)'}}>No Result</h4>
        )}
      </div>
    )
  )
}

export default Posts