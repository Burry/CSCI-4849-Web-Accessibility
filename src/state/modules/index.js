import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import contacts from './contacts';

const contactsPersistConfig = {
    key: 'contacts',
    storage,
    stateReconciler: autoMergeLevel2
};

const createRootReducer = history =>
    combineReducers({
        router: connectRouter(history),
        contacts: persistReducer(contactsPersistConfig, contacts),
    });

export default createRootReducer;
