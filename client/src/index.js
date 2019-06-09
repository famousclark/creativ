// React
import React from 'react';
import ReactDOM from 'react-dom';

// Containers
import Root from './containers/Root';

// Redux
import {Provider} from 'react-redux';
import {configureStore, sagaMiddleware} from './store/Configure';

// Sagas
import rootSaga from './middleware/Saga';

const store = configureStore();

sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <Root store={store}/>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
