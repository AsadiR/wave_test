import React, { Component } from 'react';
import rootReducer from "./reducers";
import { Provider } from 'react-redux';
import { createStore } from 'redux';

import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

import UserList from './components/UserList';


const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2,
    blacklist: ["opened_dialog", "errors"],
};

const pReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(pReducer);
export const persistor = persistStore(store);


export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <PersistGate persistor={persistor}>
                    <UserList users={{}}/>
                </PersistGate>
            </Provider>
        );
    }
}
