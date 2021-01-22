import React from 'react';
import {AppRegistry} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import App from './App';
import {name as appName} from './app.json';
import rootReducer, { rootSaga } from './modules/Index';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

const Main = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
};

AppRegistry.registerComponent(appName, () => Main);
