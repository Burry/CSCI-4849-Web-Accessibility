import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { createBrowserHistory } from 'history';
import createRootReducer from '../modules';

const history = createBrowserHistory();

const configureStore = () => {
    const rootReducer = createRootReducer(history);

    // Enhancers
    const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__; // eslint-disable-line no-underscore-dangle
    const composedEnhancers = compose(
        applyMiddleware(routerMiddleware(history), createLogger()),
        ...(typeof devToolsExtension === 'function'
            ? [devToolsExtension()]
            : [])
    );

    // Create Store
    const store = createStore(
        rootReducer,
        {}, // initialState
        composedEnhancers
    );

    // Enable Webpack hot module replacement for reducers
    if (module.hot)
        module.hot.accept('../modules', () => {
            store.replaceReducer(rootReducer);
        });

    return store;
};

export default () => {
    const store = configureStore();
    const persistor = persistStore(store);
    return { store, persistor, history };
};
