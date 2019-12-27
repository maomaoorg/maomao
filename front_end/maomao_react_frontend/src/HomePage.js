import React from 'react';
import {Flex, Grid, WhiteSpace, WingBlank, Button, Toast } from 'antd-mobile';
import RegisterTab from './RegisterTab';
import LoginTab from './LoginTab';
import $ from 'jquery';
import OrdersTab from './components/OrdersTab';

const tabs = {
  main: 1,
  register: 2,
  login: 3,
  orders: 4,
}

class HomePage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      userinfo: null,
      currentTab: tabs.main,
    }
  }

  render(){
    const navRightElements = (() => {
      const result = []
      const comma = (<p className="margin-right-small" key="99">, </p>)
      if(this.props.context.userinfo != null){ //Logined
        const welcome = (<p key="1">歡迎, {this.props.context.userinfo.nick} </p>)
        const orderList = (<p key="2" className="link" onClick={() => {
          // this.setState({
          //   currentTab: tabs.orders
          // })
        }}>訂單一覽</p>)
        result.push(welcome, comma, orderList)
      }else{
        const loginLink = (<p className="link" key="1" onClick={() => {
          this.setState({
            currentTab: tabs.login
          })
        }}>登錄</p>)
        const registerLink = (<p className="link" key="2" onClick={() => {
          this.setState({
            currentTab: tabs.register
          })
        }}>注冊</p>)
        result.push(loginLink, comma, registerLink)
      }
      return result
    })()

    return (
      <div>
        <div className={this.state.currentTab == tabs.main ? "" : "invisible"}>
          <WingBlank>
  
            <Flex justify="end">
              {navRightElements}
            </Flex>
  
            <div className="sub-title fuck-padding">
              猫猫网，日本海淘就上猫猫网！
            </div>
    
            <WhiteSpace />
    
            <Grid data={[
              {icon: '/app_imgs/mercari.jpg', text: '煤炉商品搜索', cb: () => {this.props.navToMercariSearch()}},
              {icon: '/app_imgs/yahooauc.png', text: '雅虎商品查看', cb: () => {this.props.navToYahooItemShow()}},
              {icon: '/app_imgs/questionmark.jpg', text: '购买流程', cb: () => {window.open('/app_imgs/shop_step_fsm.jpg')}},
            ]} columnNum={3} renderItem={data => {
                  return (
                  <div className="merica-item-box" onClick={() => {data.cb()}} >
                    <div className="merica-item-box-img">
                      <img style={{width: '100%', height: '100%'}} src={data.icon}></img>
                    </div>
                    <div className="merica-item-box-price">
                      {data.text}
                    </div>
                  </div>
                  )
                }} />
    
            <WhiteSpace size="lg" />
    
            {(() => {
              if(this.props.viewCount == null){
    
              }else{
                return <div className="sub-title">今日縂訪問數: {this.props.viewCount}</div>
              }
            })()}
    
          </WingBlank>
        </div>

        <RegisterTab successCallback={() => {
          // this.getLoginInfo();
          this.props.getLoginInfo()
        }} navBack={() => {
          this.setState({currentTab: tabs.main});
        }} className={this.state.currentTab == tabs.register ? "" : "invisible"}></RegisterTab>

        <LoginTab successCallback={() => {
          this.props.getLoginInfo();
        }} navBack={() => {
          this.setState({currentTab: tabs.main});
        }} className={this.state.currentTab == tabs.login ? "" : "invisible"}></LoginTab>

        <OrdersTab navBack={() => {
          this.setState({currentTab: tabs.main});
        }} className={this.state.currentTab == tabs.orders ? "" : "invisible"}></OrdersTab>

      </div>
    )
  }
}

export default HomePage