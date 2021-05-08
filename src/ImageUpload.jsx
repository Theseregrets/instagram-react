import { Button } from '@material-ui/core';
import React, { useState } from 'react';
import { db, storage } from './Firebase';
import firebase from 'firebase'


function ImageUpload({ username }) {
    const [image, setImage] = useState(null)
    const [progress, setProgress] = useState(0);
    const [caption, setCaption] = useState('')

    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    }
    const handleUpload = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                //progress function
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress)
            },
            error => {
                //ERROR FUNCTION
                console.log(error)
                alert(error.message)
            },
            () => {
                //STORAGE FUN
                storage
                    .ref('images')
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        //post image in db
                        db.collection('posts').add({
                            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                            caption: caption,
                            imageUrl: url,
                            username: { username }

                        })
                    })
                setProgress(0)
                setCaption('')
                setImage(null)
            }

        )

    }

    return (
        <div>
            <progress value={progress} max='100' /> <br />
            <input
                type="text"
                placeholder='enter caption here'
                onChange={event => setCaption(event.target.value)}
                value={caption} />

            <input
                type="file"
                onChange={handleChange} />

            <Button onClick={handleUpload}>Upload</Button>
        </div>
    );
}

export default ImageUpload;