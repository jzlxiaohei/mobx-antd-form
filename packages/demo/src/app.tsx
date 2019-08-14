import * as React from 'react';
import './styles/index.less';
import TodoDemo from './todo/todo-demo';

class App extends React.Component {
  render() {
    return <TodoDemo />;
  }
}

let ExportedApp = App;

if (module.hot) {
  const { hot } = require('react-hot-loader');
  ExportedApp = hot(module)(App);
}

export default ExportedApp;
