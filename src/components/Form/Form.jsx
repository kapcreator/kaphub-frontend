import React, { useState, useEffect } from 'react'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { createPost, updatePost, getPost } from '../../actions/posts';
import { comment } from '../../api';
import preloader from '../../images/preloader.gif'
import "./Form.css"

const Form = () => {
  const initialPostData = { title: '', description: '', tags: '', url: '', icon: '', comments: '' }
  const { post, isLoading } = useSelector((state) => state.posts);
  const [postData, setPostData] = useState(initialPostData);
  const dispatch = useDispatch();
  const history = useHistory();
  const user = JSON.parse(localStorage.getItem('profile'));
  const { id } = useParams();

  const clear = () => {
    setPostData(initialPostData);
  }

  useEffect(() => {
    if(id) {
      dispatch(getPost(id))
    }
  }, [id])

  useEffect(() => {
    if(post && id) {
      setPostData({ title: post?.title, description: post?.description, tags: post?.tags.join(", "), url: post?.url, comments: post?.comments.join(", ") }) 
    } else {
      clear()
    }
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()

    const creator = user?.result?.name
    
    let tags = []
    if(postData.tags.length > 0) {
      tags = postData.tags.split(", ")
    }

    let comments = []
    if(postData.comments.length > 0) {
      comments = postData.comments.split(", ")
    }

    if(id) {
      dispatch(updatePost(id, { ...postData, creator, tags, comments }));
    } else {
      dispatch(createPost({ ...postData, creator, tags, comments }));
    }

    history.push(`/posts/dashboard`)
  }

  if (id && post) {
    if (user.result.googleId !== post.creatorId && user.result._id !== post.creatorId) {
      return <h2>Not your post!</h2>
    }
  }

  if(id && isLoading) {
    return (
      <img src={preloader} className='preloader' />
    )
  }

  return (
    <div>
      <form className='form' autoComplete='off' noValidate onSubmit= {handleSubmit}>
        <h2>{ id ? 'Edit' : 'Create' } a Project</h2>
        <input type="text" name='title' placeholder='Title' value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })} />
        <input type="text" name='description' placeholder='Description' value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })} />
        <input type="text" name='tags' placeholder='Tags' value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value })} />
        <input type="text" name='url' placeholder='Url' value={postData.url} onChange={(e) => setPostData({ ...postData, url: e.target.value })} />
        { id && <input type="text" name='comments' placeholder='Comments' value={postData.comments} onChange={(e) => setPostData({ ...postData, comments: e.target.value })} /> }
        <label>Icon:</label>
        <FileBase type='file' multiple={false} onDone={({base64}) => setPostData({ ...postData, icon: base64 })} />
        <button className='btn'>Submit</button>
        <button onClick={(e)=>{e.preventDefault(); clear()}} className='btn'>Clear</button>
      </form>
    </div>
  )
}

export default Form