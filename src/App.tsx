import * as React from 'react';
import { Button } from 'antd-mobile';
import { addGun, removeGun, addGunAsync } from './redux.index';
import { connect } from 'react-redux';


import logo from './logo.svg';
import './App.css';


export interface Iprops {
  num?: any,
  addGun?: any,
  removeGun?: any,
  addGunAsync?: any
}

class App extends React.Component<Iprops, {}> {
  constructor(props: any) {
    super(props);
    // this.removeGun = this.removeGun.bind(this);
    // this.addGun = this.addGun.bind(this);
  }
  public removeGun = () => {
    // this.props.store.dispatch(removeGun())
    this.props.removeGun();
  }
  public addGun = () => {
    // this.props.store.dispatch(addGun());
    this.props.addGun();
  }
  public addAsyncGun = () => {
    // this.props.store.dispatch(addGun());
    this.props.addGunAsync();
  }

  public render() {
    console.log(this.props);
    const num = this.props.num;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <p>机关枪总数是{num}把</p>
        <Button type="primary" onClick={this.addGun}>加一把机关枪</Button>
        <br />
        <Button type="primary" onClick={this.removeGun}>减一把机关枪</Button>
        <br />
        <Button type="primary" onClick={this.addAsyncGun}>过两天给武器</Button>
      </div>
    );
  }
}

const mapStateToProps = (state: any) => {
  return { num: state }
}

const actionsCreators = {
  addGun,
  addGunAsync,
  removeGun
}

export default connect(mapStateToProps, actionsCreators)(App);
