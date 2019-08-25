import * as React from 'react';
import './styles/index.less';
import TodoDemo from './todo/todo-demo';
import TodoLocalStore from './use-local-store';
import { Tabs, Button } from 'antd';

class App extends React.Component {
  state = {
    key: 1,
  };

  handleClick = () => {
    this.setState({
      key: this.state.key++,
    });
  };

  render() {
    return (
      <div>
        <Tabs key={this.state.key}>
          <Tabs.TabPane tab="model object" key="1">
            <TodoLocalStore />
          </Tabs.TabPane>
          <Tabs.TabPane tab="model class" key="2">
            <TodoDemo />
          </Tabs.TabPane>
        </Tabs>
        <Button onClick={this.handleClick}>unmount(局部化)</Button>
      </div>
    );
  }
}

let ExportedApp = App;

if (module.hot) {
  const { hot } = require('react-hot-loader');
  ExportedApp = hot(module)(App);
}

export default ExportedApp;
