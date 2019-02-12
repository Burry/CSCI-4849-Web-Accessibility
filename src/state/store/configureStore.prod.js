import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createRootReducer from '../modules';

const history = createBrowserHistory();

const configureStore = () =>
    createStore(
        createRootReducer(history),
        {}, // initialState
        applyMiddleware(routerMiddleware(history))
    );

export default () => {
    const store = configureStore();
    const persistor = persistStore(store);
    return { store, persistor, history };
};
