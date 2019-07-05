// React
import React, { Component } from 'react';

// Redux
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'

// Containers
import RouterContainer from './RouterContainer';

const Root = (props: Object) => (

  <Provider store={props.store}>
    <PersistGate loading={null} persistor={props.persistor}>
      <RouterContainer />
    </PersistGate>
  </Provider>

);

export default Root;
