import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { commentPost } from '../../actions/posts'
import "./CommentSection.css"

const CommentSection = ({ post }) => {
  const [comments, setComments] = useState(post?.comments);
  const [comment, setComment] = useState('');
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('profile'));
  const commentsRef = useRef();

  const handleClick = async (e) => {
    e.preventDefault()

    const finalComment = `${user.result.name} : ${comment}`;

    const newComments = await dispatch(commentPost(finalComment, post._id));

    setComments(newComments);
    setComment('');

    commentsRef.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (
    <div className='comment-section'>
      <div>
        <h3 className='comment-section__title'>Comments</h3>
        {comments.map((comment, i) => (
          <p key={i}><strong>{comment.split(" :")[0]}</strong> : {comment.split(" : ")[1]}</p>
        ))}
        <div ref={commentsRef} />
      </div>
      {user?.result?.name && (
        <form className="comment-section__form">
          <h4>Write a Comment</h4>
          <textarea name='comment' placeholder="Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
          <button type='submit' className="btn" onClick={handleClick} disabled={!comment}>Comment</button>
        </form>
      )}
    </div>
  )
}

export default CommentSection