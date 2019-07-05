import { loadState } from './LocalStorage';
import { createStore, applyMiddleware, compose } from 'redux';

import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

import appReducer from '../reducers/reducer';
// Redux Saga
import createSagaMiddleware from 'redux-saga';

export const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware)
);

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, appReducer)

const persistedState = loadState();

export function configureStore() {
  let store = createStore( persistedReducer, enhancer );
  let persistor = persistStore(store, {}, () =>{
    const state = store.getState();
    if (state.app.userInfo.accessToken != null) {
      store.dispatch({type: "USER_AUTHORIZE_FLOW"});
    }
  });
  return {store, persistor}
}
