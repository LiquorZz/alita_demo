import { connect } from 'dva';
import React, { Component } from 'react';

import { FormPageModelState, ConnectProps } from '@/models/connect';
import { Popover, Button, List, InputItem, Picker, Toast } from 'antd-mobile';
import BasePage from '@/components/BasePage';
import styles from './index.less';
import { router } from 'umi';
interface PageProps extends ConnectProps {
  formPage: FormPageModelState;
}

interface PageState {
  selectedObj: any,
  operName: string,
  phoneNum: string,
  pageData: any;
}
const Item = List.Item;
@connect(({ formPage }) => ({ formPage }))
class Page extends Component<PageProps, PageState> {
  state: PageState = {
    selectedObj: [],
    operName: '',
    phoneNum: '',
    pageData: {},
  };
  nameInput = (e) => {
    let text = e.replace(/[^\u4E00-\u9FA5]{2,4}/g, '');
    let pageData = this.state.pageData;
    pageData.operName = text;
    this.setState({
      operName: text,
      pageData: pageData,
    })
  };
  selectedDist = (e) => {
    let pageData = this.state.pageData;
    pageData.address = e.join(',');
    this.setState({
      selectedObj: e,
      pageData: pageData,
    });
  };
  phoneNum = (e) => {
    let pageData = this.state.pageData;
    pageData.phoneNum = e.replace(/\s/g,'');
    this.setState({
      phoneNum: e,
      pageData: pageData,
    })
  };
  submit = () => {
    let pageData = this.state.pageData;
    if (!(pageData.operName && pageData.operName.length)) {
      Toast.fail('姓名未填写', Toast.SHORT);
      return;
    }
    if (!(pageData.phoneNum && pageData.phoneNum.length === 11)) {
      Toast.fail('请重新填写号码', Toast.SHORT);
      return;
    }
    if (!(pageData.address && pageData.address.length)) {
      Toast.fail('请选择地址', Toast.SHORT);
      return;
    }
    const { formPage: { commodityData } } = this.props;
    pageData.packageName = commodityData.package_name;
    pageData.packageId = commodityData.package_id;
    const { dispatch } = this.props;
    this.setState({
      pageData: pageData
    }, () => {
      dispatch({
        type: 'formPage/submit',
        payload: this.state.pageData
      });
    })
  }
  render() {
    const {
      formPage: { districtData, commodityData },
    } = this.props;
    return (
      <BasePage
        title='订单信息'
        canBack={true}
        onLeftClick={() => {
          router.goBack();
        }}
        rightContent={''}
      >
        <div className={styles.container}>
          <div className={styles.orderInfo}>
            <List>
              <InputItem disabled={true} value={commodityData.package_name}>商品名称</InputItem>
              <InputItem disabled={true} value={commodityData.package_id}>订单号</InputItem>
            </List>
          </div>
          <List>
            {/* <Item></Item> */}
            <InputItem
              placeholder="请输入姓名"
              onChange={this.nameInput}
              value={this.state.operName}
              maxLength={4}
              minLength={2}
            >姓名</InputItem>
            <InputItem
              placeholder="请输入手机号码"
              type='phone'
              onChange={this.phoneNum}
            >号码</InputItem>
            <Picker extra="请选择地址"
              data={districtData}
              title="Areas"
              onChange={e => this.selectedDist(e)}
              value={this.state.selectedObj}
              format={(labels) => {
                return labels.join(' ');
              }}
              onOk={val => { console.log(val) }}
            >
              <List.Item className={styles.distSelect} arrow="horizontal">选择地址</List.Item>
            </Picker>
          </List>
        </div>
        <div className={styles.footer}>
          <Button type="primary" onClick={() => this.submit()}>提交订单</Button>
        </div>
      </BasePage>
    );
  }
}

export default Page;
