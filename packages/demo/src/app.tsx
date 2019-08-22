import * as React from 'react';
import './styles/index.less';
import TodoDemo from './todo/todo-demo';
import TodoLocalStore from './use-local-store';
import { Tabs } from 'antd';

class App extends React.Component {
  render() {
    return (
      <Tabs>
        <Tabs.TabPane tab="model object" key="1">
          <TodoLocalStore />
        </Tabs.TabPane>
        <Tabs.TabPane tab="model class" key="2">
          <TodoDemo />
        </Tabs.TabPane>
      </Tabs>
    );
  }
}

let ExportedApp = App;

if (module.hot) {
  const { hot } = require('react-hot-loader');
  ExportedApp = hot(module)(App);
}

export default ExportedApp;
