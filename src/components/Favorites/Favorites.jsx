import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getFavPosts } from '../../actions/posts';
import preloader from '../../images/preloader.gif'
import logo from '../../images/logo.png'

import "./Favorites.css"

const Favorites = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const user = JSON.parse(localStorage.getItem('profile'))
  
  useEffect(() => {
    dispatch(getFavPosts(user.result._id))
  }, [])

  const { posts, isLoading } = useSelector((state) => state.posts);

  if(!posts.length && !isLoading) return <div className='info-text'>Favorites is empty. Click star icon in project details to add new one</div>

  if(isLoading) return <img src={preloader} className='preloader' />
  return (
    <div className='favorites'>
      <h2 className='section-title'>Favorites:</h2>
      <div className='favorites-grid'>
        {posts.map((post) => (
          <div key={post._id} className='favorites-item' onClick={()=>history.push(`/posts/${post._id}`)}>
            <img src={post.icon || logo} />
            <p className='favorites-item__title text-nowrap'>{post.title}</p>
          </div>
        )) }
      </div>
    </div>
  )
}

export default Favorites