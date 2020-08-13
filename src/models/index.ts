import { query } from '@/services/api';
import * as IndexApi from '@/services/index';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
export interface IndexModelState {
  name: string;
  expendObj: ExpendObjType;
  classifyObj: ExpendObjType;
}
export interface ExpendObjType {
  firstQuarter?: Array<Object>;
  secondQuarter?: Array<Object>;
  thirdQuarter?: Array<Object>;
  fourthQuarter?: Array<Object>;
}
export interface IndexModelType {
  namespace: 'index';
  state: IndexModelState;
  effects: {
    query: Effect;
  };
  reducers: {
    save: Reducer<IndexModelState>;
  };
  subscriptions: { setup: Subscription };
}


const IndexModel: IndexModelType = {
  namespace: 'index',

  state: {
    name: '',
    expendObj: {},
    classifyObj: {},
  },

  effects: {
    *query(_, { call, put, select }) {
      const payload = {
        id: 1
      };
      const expendRes = yield call(IndexApi.qryExpend, payload);
      if (!expendRes) return;
      // console.log(expendRes);
      let expendData = expendRes.data;
      let expendObj = {
        firstQuarter: [],
        secondQuarter: [],
        thirdQuarter: [],
        fourthQuarter: [],
      };
      Object.keys(expendData).forEach((key, index) => {
        let list = [];
        expendData[key].map((val, index) => {
          list.push({
            flag: String(index),
            item: val.text,
            count: val.value,
          })
        });
        switch (index) {
          case 0:
            expendObj.firstQuarter = list;
            break;
          case 1:
            expendObj.secondQuarter = list;
            break;
          case 2:
            expendObj.thirdQuarter = list;
            break;
          case 3:
            expendObj.fourthQuarter = list;
            break;
          default:
            break;
        }
      });
      const classifyRes = yield call(IndexApi.qryClassify, payload);
      if (!classifyRes) return;
      const classifyData = classifyRes.data;
      let classifyObj = {
        firstQuarter: [],
        secondQuarter: [],
        thirdQuarter: [],
        fourthQuarter: [],
      };
      Object.keys(expendData).forEach((key, index) => {
        let list = [];
        classifyData[key].map((val, index) => {
          list.push({
            classifyName: val.classify_name,
            classifyAmount: val.classify_amount
          })
        })
        switch (index) {
          case 0:
            classifyObj.firstQuarter = list;
            break;
          case 1:
            classifyObj.secondQuarter = list;
            break;
          case 2:
            classifyObj.thirdQuarter = list;
            break;
          case 3:
            classifyObj.fourthQuarter = list;
            break;
          default:
            break;
        }
      })
      yield put({
        type: 'save',
        payload: {
          expendObj: expendObj,
          classifyObj: classifyObj,
        },
      })
    }
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/') {
          dispatch({
            type: 'query'
          })
        }
      });
    }
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
};

export default IndexModel;
