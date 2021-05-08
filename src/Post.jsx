import React, { useState, useEffect } from 'react';
import './Post.css'
import Avatar from '@material-ui/core/Avatar'
import { db } from './Firebase'
import firebase from 'firebase'

const Post = ({ postId, user, username, caption, imageUrl }) => {
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    useEffect(() => {
        let unsubscribe
        if (postId) {
            unsubscribe = db
                .collection('post')
                .doc(postId)
                .collection('comments')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) => {
                    setComment(snapshot.docs.map((doc) => doc.data()))
                })
        }
        return () => {
            unsubscribe();
        }
    }, [postId])
    const postComment = (event) => {
        event.preventDefault()
        db.collection('posts').doc(postId).collection('comment').add({
            text: comment,
            username: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()

        })
    }
    return (
        <div className='post'>
            <div className="post__header">
                <Avatar
                    className='post__avatar'
                    alt={username}
                    src='static/images/avatar/1.jpg'
                />
                <h3>{username}</h3>
            </div>

            <img
                className='post__img'
                src={imageUrl} alt="" />
            <h4 className='post__text'><strong>{username}</strong> {caption}</h4>
            {comments.map(comment => {
                return (
                    <p>
                        <strong>{comment.username} </strong>
                        {comment.text}
                    </p>
                )
            })}
            <form className='post__form'>
                <input type="text"
                    className='post__input'
                    placeholder='add a comment'
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                />
                <button
                    className='post__btn'

                    type='submit'
                    onClick={postComment}
                >Post</button>


            </form>
        </div>
    );
}

export default Post;