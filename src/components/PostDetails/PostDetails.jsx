import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment';
import { useParams, useHistory } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getPost, getPostsBySearch, updatePost, favPost, getCreator } from '../../actions/posts'
import { showModal } from '../../actions/modal';
import * as api from '../../api'

import preloader from '../../images/preloader.gif'
import logo from '../../images/logo.png'
import favorite from '../../images/favorite.png'
import favoriteFill from '../../images/favoriteFill.png'
import check from '../../images/check.png'
import './PostDetails.css'

require('dotenv').config()

const PostDetails = () => {
  const user = useSelector((state) => state.auth.authData) || JSON.parse(localStorage.getItem('profile'))
  const creator = useSelector((state) => state.posts.creator) || ''
  const { post, posts, isLoading } = useSelector((state) => state.posts)
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getPost(id));
  }, [id])

  useEffect(() => {
    if(post) {
      dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));

      dispatch(getCreator(post.creatorId))
    }
  }, [post])

  const runPost = async () => {
    dispatch(updatePost(id, {...post, runCount: post.runCount++ }))

    await api.increaseScore(post.title, 'TITLE')
    post.tags.forEach(async (tag) => {
      await api.increaseScore(tag, 'TAG')
    });

    window.open(post.url, "_blank");
  }

  const handleFavPost = () => {
    if(!user) {
      history.push('/auth')
      return
    }

    dispatch(favPost(id, user.result._id))
  }


  if(!post) return null;

  if(isLoading) {
    return <img src={preloader} className='preloader' />
  }

  const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

  const openPost = (_id) => history.push(`/posts/${_id}`);

  return (
    <div className='post-details'>
      <div>
        <div className='post-details__icon-container' style={{backgroundImage: `url(${post.icon || logo})`}}>
          <img src={post.icon || logo} alt={post.title} />
        </div>

        <div>
          <div className='post-details__info'>
            <div className='post-details__header'>
              <h2 className='post-details__title text-nowrap'>{post.title}</h2>
              <div className='post-details__action'>
                <button onClick={post.url?.length > 0 ? runPost : (()=>dispatch(showModal(`Can't Run. Target is empty!`, (()=>{}) )))} className='btn post-details__run-btn'>Run</button>
                <button onClick={handleFavPost} className='btn-transparent'><img src={user?.result.favorites.includes(id) ? favoriteFill : favorite } height="25px" /></button>
              </div>
            </div>
            <p className='post-details__tags text-nowrap'>#{post.tags.join(" #")}</p>
            <p>{post.description}</p>
            <h3 style={{display: 'flex', alignItems: 'center'}}>By: &nbsp;{creator._id == process.env.REACT_APP_ADMIN_ID ? (<><span style={{color: "var(--secondary-color)"}}>{creator.name}</span>&nbsp;<img src={check} height='25px' /></>) : creator.name}</h3>
            <h3 style={{color: "var(--gray-color)"}}>{moment(post.createdAt).fromNow()}</h3>
          </div>

          <CommentSection post={post} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className='post-details__recommend'>
          <h3>From related searches</h3>
          <hr />
          <div className='post-details__recommend-items'>
            {recommendedPosts.map(({ title, icon, _id }) => (
              <div onClick={() => openPost(_id)} key={_id} className='post-details__recommend-item'>
                <img src={icon || logo} />
                <h4 style={{color: "var(--gray-color)"}} className="text-nowrap">{title}</h4>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails