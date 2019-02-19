import React, { useState } from 'react';
import { string, func } from 'prop-types';
import { Helmet } from 'react-helmet';
import { HotKeys } from 'react-hotkeys';
import { Switch, Route, Redirect } from 'react-router-dom';
import { push } from 'connected-react-router';
import { connect } from 'react-redux';
import Navbar from '../Navbar';
import Keypad from '../Keypad';
import Contacts from '../Contacts';
import Contact from '../Contact';
import NewContact from '../NewContact';
import About from '../About';
import NotFound from '../NotFound';

const keyMap = {
    '/keypad': 'ctrl+k',
    '/contacts': 'ctrl+c',
    '/new-contact': 'ctrl+n',
    '/about': 'ctrl+a'
};

const keyHandlers = (pushRoute, setState) =>
    Object.keys(keyMap).reduce((acc, handler) => {
        acc[handler] = () => {
            pushRoute(handler);
            setState(handler);
        };
        return acc;
    }, {});

const App = ({ pathname, pushRoute }) => {
    /* eslint-disable no-unused-vars */
    const [_, setPath] = useState(pathname);
    return (
        <HotKeys
            keyMap={keyMap}
            handlers={keyHandlers(pushRoute, setPath)}
            focused
            tabIndex="-1"
        >
            <Helmet defaultTitle="Phone" />
            <Navbar />
            <div className="mt-4 mb-5 pb-5" role="main" aria-live="polite">
                <Switch>
                    <Route
                        path="/"
                        exact
                        render={props => <Redirect to="/keypad" {...props} />}
                    />
                    <Route
                        path="/keypad/:numberPath?"
                        exact
                        render={props => (
                            <Keypad pushRoute={pushRoute} {...props} />
                        )}
                    />
                    <Route path="/contacts" exact component={Contacts} />
                    <Route
                        path="/contacts/:contactURI"
                        exact
                        component={Contact}
                    />
                    <Route
                        path="/new-contact"
                        exact
                        render={props => (
                            <NewContact pushRoute={pushRoute} {...props} />
                        )}
                    />
                    <Route path="/about" exact component={About} />
                    <Route component={NotFound} />
                </Switch>
            </div>
        </HotKeys>
    );
};

App.propTypes = {
    pathname: string.isRequired,
    pushRoute: func.isRequired
};

const mapStateToProps = ({
    router: {
        location: { pathname }
    }
}) => ({ pathname });

const mapDispatchToProps = {
    pushRoute: push
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
