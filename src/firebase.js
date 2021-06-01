import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase
    .initializeApp({
        apiKey: 'AIzaSyAy_IgD3pV5suWpLARgLmTfA19cQt9odq4',
        authDomain: 'unichat-1e622.firebaseapp.com',
        projectId: 'unichat-1e622',
        storageBucket: 'unichat-1e622.appspot.com',
        messagingSenderId: '216592268937',
        appId: '1:216592268937:web:e975fbb4796471301bd058'
    })
    .auth();
