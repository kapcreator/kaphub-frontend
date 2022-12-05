import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getPostsByCreator, deletePost } from '../../actions/posts';
import { showModal } from '../../actions/modal';
import logo from '../../images/logo.png'
import preloader from '../../images/preloader.gif'

import "./Dashboard.css"

const Dashboard = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = JSON.parse(localStorage.getItem('profile'))

  const handleDeletePost = (post) => {
    // if(window.confirm(`Delete post "${post.title}" ?`)) dispatch(deletePost(post._id))

    dispatch(showModal(`Delete post "${post.title}" ?`, ()=>dispatch(deletePost(post._id))))
  }
  
  useEffect(() => {
    dispatch(getPostsByCreator(user.result._id))
  }, [])

  const { posts, isLoading } = useSelector((state) => state.posts);

  if(!posts.length && !isLoading) return 'No Posts';

  if(isLoading) return <img src={preloader} className='preloader' />
  return (
    <div className='dashboard'>
      <h2>Projects:</h2>
      <div className='dashboard__items'>
        {posts.map((post) => (
          <div key={post._id} className='dashboard__item' onClick={()=>history.push(`/posts/${post._id}`)}>
            <img src={post.icon || logo} height='50px' />
            <p className='dashboard__item-title text-nowrap'>{post.title}</p>
            <button onClick={(e) => {e.stopPropagation(); history.push(`/posts/edit/${post._id}`)}} className='btn'>Edit</button>
            <button onClick={(e) => {e.stopPropagation(); handleDeletePost(post)}} className='btn'>Delete</button>
          </div>
        )) }
      </div>
    </div>
  )
}

export default Dashboard