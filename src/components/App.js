import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { AuthProvider } from '../contexts/AuthContext';

import Chats from './Chats';
import Login from './Login';

function App() {
    return (
        <div style={{ fontFamily: 'Avenir' }}>
            <Router>
                {/* React context gave us a provider object with which we can wrap
                our component tree so components in it down the line have access
                to the state variables the context brings w/ it */}
                <AuthProvider>
                    <Switch>
                        <Route path="/chats" component={Chats} />
                        <Route path="/" component={Login} />
                    </Switch>
                </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
