
import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db } from './Firebase'

function App() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => {
        return ({
          id: doc.id,
          post: doc.data()
        })
      }));
    })
  }, []);

  return (
    <div className="App">
      <div className='app__header'>
        <img
          className='app__header-img'
          src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png'
          alt='logo' />
      </div>
      {
        posts.map(({ id, post }) => {
          return (
            <Post
              key={id}
              username={post.username}
              caption={post.caption}
              imageUrl={post.imageUrl}
            />
          )
        })
      }

    </div>
  );
}

export default App;
