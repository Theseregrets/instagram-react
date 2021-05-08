
import React, { useState, useEffect } from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal'
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import Avatar from '@material-ui/core/Avatar'

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));



function App() {

  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle)

  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        //user logged in
        console.log(authUser)
        setUser(authUser)
      }
      else {
        //user logged out
        setUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [user, username])

  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map((doc) => {
        return ({
          id: doc.id,
          post: doc.data()
        })
      }));
    })
  }, []);
  const signUp = event => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(authUser => {
        return (
          authUser.user.updateProfile({
            displayName: username
          })
        )
      })
      .catch(error => alert(error.message))
    setOpen(false)
  }

  const signIn = event => {
    event.preventDefault()
    auth
      .signInWithEmailAndPassword(email, password)
      .catch(error => alert(error.message))
    setOpenSignIn(false)
  }

  return (
    <div className="App">
      <div className='app__header'>
        <img
          className='app__header-img'
          src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png'
          alt='logo' />
        <div className='app__header-btn'>
          {user ? (
            <div>

              <Button onClick={() => auth.signOut()}>Log Out</Button>

            </div>
          ) : (
            <div>
              <Button onClick={() => setOpenSignIn(true)} >Sign In</Button>
              <Button onClick={() => setOpen(true)} >Sign Up</Button>
            </div>

          )
          }

        </div>

      </div>


      {user?.displayName ? (
        <ImageUpload username={user.displayName} />

      ) : (
        <h3>login to upload</h3>
      )}



      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <img
              className='app__header-img'
              src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png'
              alt='logo' /> <br />
            <Input
              type='text'
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            /> <br />
            <Input
              type='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> <br />
            <Input
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> <br />
            <Button type='submit' onClick={signUp} >Sign Up</Button>
          </form>

        </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className='app__signup'>
            <img
              className='app__header-img'
              src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png'
              alt='logo' /> <br />
            <Input
              type='email'
              placeholder='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            /> <br />
            <Input
              type='password'
              placeholder='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            /> <br />
            <Button type='submit' onClick={signIn} >Sign In</Button>
          </form>

        </div>
      </Modal>




      {
        posts.map(({ id, post }) => {
          return (
            <Post
              key={id}
              postId={id}
              user={user}
              username={post.username.username}
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
