import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

const Chats = () => {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () => {
        auth.signOut();
        history.push('/');
    };

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob(); // blobs are files we want to transfer in binary format
        return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
    };

    useEffect(() => {
        if (!user || user === null) {
            history.push('/');
            return;
        }
        // if we do have the user, get the chat engine corresponding user
        axios
            .get('https://api.chatengine.io/users/me/', {
                headers: {
                    'project-id': process.env.REACT_APP_CHAT_ENGINE_ID,
                    'user-name': user.email,
                    'user-secret': user.uid
                }
            })
            .then(() => {
                setLoading(false);
            })
            // if we do not already have a chat engine profile
            .catch(() => {
                let formData = new FormData();

                formData.append('email', user.email);
                formData.append('username', user.email);
                formData.append('secret', user.uid);

                // get user profile photo
                getFile(user.photoURL).then((avatar) => {
                    formData.append('avatar', avatar, avatar.name);
                    axios
                        .post('https://api.chatengine.io/users/', formData, {
                            headers: {
                                'private-key':
                                    process.env.REACT_APP_CHAT_ENGINE_KEY
                            }
                        })
                        .then(() => setLoading(false))
                        .catch((error) => console.log(error)); // if user creation is not successful
                });
            });
    }, [user, history]);

    if (!user || loading) return 'Loading...';

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">Unichat</div>
                <div className="logout-tab" onClick={handleLogout}>
                    Logout
                </div>
            </div>

            <ChatEngine
                height="calc(100vh -66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
            />
        </div>
    );
};

export default Chats;
