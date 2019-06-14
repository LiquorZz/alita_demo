import { connect } from 'dva';
import React, { Component } from 'react';

import { Popover, Button } from 'antd-mobile';
import {
  Chart,
  Geom,
  Axis,
  Coord,
  Label,
  Legend,
} from "bizcharts";
import { IndexModelState, ConnectProps, } from '@/models/connect';
import { ExpendObjType } from '@/models/index';
import BasePage from '@/components/BasePage';
import styles from './index.less';
import quarterSelect from '@/assets/downSelect.png';
import { router } from 'umi';

interface PageProps extends ConnectProps {
  index: IndexModelState;
  expendObj: ExpendObjType;
}

interface PageState {
  popVisible?: boolean;
  quarter?: String;
  selectedIndex?: String;
  expendObj?: ExpendObjType;
  expendData?: Array<Object>;
  classifyObj?: ExpendObjType;
  classifyData?: any;
}
const PItem = Popover.Item;
const data = [
  {
    item: "支出1",
    count: 40
  },
  {
    item: "支出2",
    count: 21
  },
  {
    item: "支出3",
    count: 17
  },
];
@connect(({ index }) => ({ index }))
class Page extends Component<PageProps, PageState> {
  state: PageState = {
    popVisible: false,
    quarter: '第一季度',
    selectedIndex: '',
    expendObj: {},
    expendData: [],
    classifyObj: {},
    classifyData: [],
  };
  componentDidMount() {


  }
  componentWillReceiveProps(props) {
    const { index: { expendObj, classifyObj } } = props;
    this.setState({
      expendObj: expendObj,
      expendData: [...expendObj.firstQuarter],
      classifyObj: classifyObj,
      classifyData: [...classifyObj.firstQuarter],
    });
  }
  onSelect = (opt) => {
    console.log(opt.key);
    let expendData = [];
    let classifyData = [];
    switch (opt.key) {
      case '1':
        expendData = this.state.expendObj.firstQuarter;
        classifyData = this.state.classifyObj.firstQuarter;
        break;
      case '2':
        expendData = this.state.expendObj.secondQuarter;
        classifyData = this.state.classifyObj.secondQuarter;
        break;
      case '3':
        expendData = this.state.expendObj.thirdQuarter;
        classifyData = this.state.classifyObj.thirdQuarter;
        break;
      case '4':
        expendData = this.state.expendObj.fourthQuarter;
        classifyData = this.state.classifyObj.fourthQuarter;
        break;
      default:
        break;
    }
    this.setState({
      popVisible: false,
      quarter: opt.props.children,
      selectedIndex: opt.key,
      expendData: [...expendData],
      classifyData: [...classifyData],
    });
  };
  handleVisibleChange = (popVisible) => {
    // this.setState({
    //   popVisible,
    // });
  };
  nextPage = () => {
    console.log('下一页')
    router.push({
      pathname: './formPage',
      query: {

      }
    })
  }
  render() {
    const {
    } = this.props;
    return (
      <BasePage
        title='支出页面'
        canBack={false}
        leftContent={' '}
        onLeftClick={() => {
          // router.goBack();
        }}
        rightContent=''
      >
        <div className={styles.container}>
          <div className={styles.echartModule}>
            <div className={styles.echartTitle}>
              <span>专项开支</span>
              <Popover
                visible={this.state.popVisible}
                mask
                overlay={[
                  (<PItem key="1">第一季度</PItem>),
                  (<PItem key="2">第二季度</PItem>),
                  (<PItem key="3">第三季度</PItem>),
                  (<PItem key="4">第四季度</PItem>),
                ]}
                // onVisibleChange={this.handleVisibleChange}
                onSelect={this.onSelect}
              >
                <div className={styles.quarterSelect}>
                  <span>{this.state.quarter || ''}</span>
                  <img src={quarterSelect}></img>
                </div>
              </Popover>
            </div>
            <Chart
              height={320}
              data={this.state.expendData}
              forceFit
            >
              <Coord type="theta" radius={1} />
              <Axis name="percent" />
              <Legend
                position="right"
                offsetX={-100}
                itemFormatter={(val) => {
                  return val;
                }}
              />
              <Geom
                type="intervalStack"
                position="count"
                color="item"
                style={{
                  lineWidth: 1,
                  stroke: "#fff"
                }}
              >
                <Label
                  content="count"
                  formatter={(val, item) => {
                    return item.point.item + ": " + val;
                  }}
                />
              </Geom>
            </Chart>
            <div className={styles.echartsFooter}>
              {this.state.classifyData && this.state.classifyData.map((val, index) => (
                <div key={index} className={styles.classifyItem}>
                  <span>分类一</span>
                  <span>{val.classifyAmount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.footer}>
          <Button type="primary" onClick={() => this.nextPage()}>下一页</Button>
        </div>
      </BasePage>
    );
  }
}

export default Page;
