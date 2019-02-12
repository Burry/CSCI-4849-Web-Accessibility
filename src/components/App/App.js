import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route, Redirect } from 'react-router-dom';
import Navbar from '../Navbar';
import Keypad from '../Keypad';
import Contacts from '../Contacts';
import Contact from '../Contact';
import NewContact from '../NewContact';
import About from '../About';
import NotFound from '../NotFound';

const App = () => (
    <>
        <Helmet defaultTitle="Phone" />
        <Navbar />
        <div className="mt-4 mb-5 pb-5" role="main">
            <Switch>
                <Route
                    path="/"
                    exact
                    render={props => <Redirect to="/keypad" {...props} />}
                />
                <Route path="/keypad/:numberPath?" exact component={Keypad} />
                <Route path="/contacts" exact component={Contacts} />
                <Route path="/contacts/:contactURI" exact component={Contact} />
                <Route path="/new-contact" exact component={NewContact} />
                <Route path="/about" exact component={About} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </>
);

export default App;
