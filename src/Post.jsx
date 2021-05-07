import React from 'react';
import './Post.css'
import Avatar from '@material-ui/core/Avatar'

const Post = () => {
    return (
        <div className='post'>
            <div className="post__header">
                <Avatar
                    className='post__avatar'
                    alt='theseregrets'
                    src='static/images/avatar/1.jpg'
                />
                <h3>theseregrets</h3>
            </div>

            <img
                className='post__img'
                src="https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752" alt="" />
            <h4 className='post__text'><strong>These_regrets</strong> life is fucked</h4>

        </div>
    );
}

export default Post;