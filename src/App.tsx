import { Button } from 'antd-mobile';
import * as React from 'react';
import { connect } from 'react-redux';
import './assets/style/App.css';
import logo from './assets/images/logo.svg';
// import logo from './component/Logo/job.png';
import { addGun, addGunAsync, removeGun } from './store/reducer/index.redux';

export interface Iprops {
  num?: any,
  addGun?: any,
  removeGun?: any,
  addGunAsync?: any
}

// 组建需要的属性
const mapStateToProps = (state: any) => {
  return { num: state.counter }
}

// 组建需要的方法
const actionsCreators = {
  addGun,
  addGunAsync,
  removeGun
}

@(connect(mapStateToProps, actionsCreators) as any)
class App extends React.Component<Iprops, {}> {
  constructor(props: any) {
    super(props);
  }
  public removeGun = () => {
    this.props.removeGun();
  }
  public addGun = () => {
    this.props.addGun();
  }
  public addAsyncGun = () => {
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
        <p style={{fontSize: 20}}>机关枪总数是{num}把</p>
        <Button type="primary" onClick={this.addGun}>加一把机关枪</Button>
        <br />
        <Button type="primary" onClick={this.removeGun}>减一把机关枪</Button>
        <br />
        <Button type="primary" onClick={this.addAsyncGun}>过两天给武器</Button>
      </div>
    );
  }
}



export default App;
