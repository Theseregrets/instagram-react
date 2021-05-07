import logo from './logo.svg';
import './App.css';
import Post from './Post'

function App() {
  return (
    <div className="App">
      <div className='app__header'>
        <img
          className='app__header-img'
          src='https://1000logos.net/wp-content/uploads/2017/02/Instagram-Logo.png'
          alt='logo' />
      </div>
      <Post imageUrl='' />
      <Post />
      <Post />
      <Post />
      <Post />

    </div>
  );
}

export default App;
