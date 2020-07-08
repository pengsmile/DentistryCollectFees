import React from 'react';
import { WingBlank, Button, InputItem, Card, List, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
// import qs from 'qs';
import './App.css'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let moneyKeyboardWrapProps;
if (isIPhone) {
  moneyKeyboardWrapProps = {
    // onTouchStart: e => e.preventDefault(),
  };
}
// const Item = List.Item;
// const Brief = Item.Brief;

console.log([1,2,3].findIndex(x => x == 4))

console.log('abc'.padStart(10)) 

async function testAsync() {
  return "hello async";
}
const result = testAsync();
console.log(result);

class App extends React.Component {
  
  constructor(props){
    super(props)
    this.state = {
        
    }
  }
  componentDidMount(){
    this.refs.myInput.focus()
    let {name, age, sex} = {name: '小煤球2', age: 2, sex: '公'};
    console.log(age);

    const promise1 = Promise.resolve(123);
    promise1.then(function(value) {
      console.log(value);
    });
  }
  /**
   * 点击确定 验证金额并进入下一步
   */
  onNextStep = () => {
    let form = this.props.form.getFieldsValue();
    if (typeof form.FACE_AMOUNT === 'string') {
      if (/^\d*(?:\.\d{0,2})?$/.test(form.FACE_AMOUNT) && Number(form.FACE_AMOUNT) != 0) {
        this.props.history.push('/payment/'+ form.FACE_AMOUNT +'');
      } else {
        Toast.fail('请输入正确的金额', 1);
      }
    } else {
        Toast.fail('请输入金额', 1);
    }
  }
  render(){
    const { getFieldProps } = this.props.form;
    return (
      <div className="container">
        
        <div className="content">
          <WingBlank>
          <h1 className="Title">收款</h1>
          <Card>
            <Card.Header
              className="cardTitle"
              title="全齿健平台"
            />
            <Card.Body className="cardBody">
            <p className="cardBodyTitle">收款金额</p>
            <InputItem
              {...getFieldProps('FACE_AMOUNT')}
              className="InputMoney"
              type='money'
              ref="myInput"
              defaultValue=""
              placeholder="收款金额"
              clear
              moneyKeyboardAlign="left"
              autoAdjustHeight={false}
              moneyKeyboardWrapProps={moneyKeyboardWrapProps}
              onVirtualKeyboardConfirm={this.onNextStep}
            > <span>￥</span> 
            </InputItem>
            </Card.Body>
          </Card>
          <List className="showMore">
            <List.Item
              arrow="horizontal"
              thumb="https://zos.alipayobjects.com/rmsportal/dNuvNrtqUztHCwM.png"
              multipleLine
              onClick={() => {this.props.history.push('/payhistory')}}
              extra="查看更多"
            >
              支付记录12
            </List.Item>
          </List>
          
          </WingBlank>
        </div>
      </div>
    )
  }  
}

// <Button className="NextStep" onClick={this.onNextStep}  >下一步</Button>
export default createForm()(App)
// <Card.Footer content="支付记录" extra={<div>更多</div>} />