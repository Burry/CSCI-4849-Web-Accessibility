import React from 'react';
import { hydrate, render } from 'react-dom';
import './styles/index.scss';
import App from './components/App';
import ReduxProvider from './components/ReduxProvider';
import configureStore from './state/store';
import * as serviceWorker from './serviceWorker';

const { store, persistor, history } = configureStore();
const ConnectedRoot = () => (
    <ReduxProvider store={store} persistor={persistor} history={history}>
        <App />
    </ReduxProvider>
);
const rootElement = document.getElementById('root');

rootElement.hasChildNodes()
    ? hydrate(<ConnectedRoot />, rootElement)
    : render(<ConnectedRoot />, rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
