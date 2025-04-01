import React from 'react';
import Sidebar from './src/component/Sidebar';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <Sidebar />
    </Provider>
  );
};

export default App;
