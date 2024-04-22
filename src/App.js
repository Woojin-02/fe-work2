import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import ExchangeCalculator from './ExchangeCalculator';

function App() {
  return (
    <Provider store={store}>
      <ExchangeCalculator />
    </Provider>
  );
}

export default App;
