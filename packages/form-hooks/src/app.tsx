import * as React from 'react';
import './styles/index.less';
import { Tabs, Button, Input } from 'antd';
import { TestInput } from './test-input';

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
            <TestInput />
          </Tabs.TabPane>
          <Tabs.TabPane tab="model class" key="2">
            2
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
