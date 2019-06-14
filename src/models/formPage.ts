import { query } from '@/services/api';
import * as FormPageApi from '@/services/formPage';
import { Effect } from '@/models/connect';
import { Modal } from 'antd-mobile'
import { Reducer } from 'redux';
import { Subscription } from 'dva';
import { router } from 'umi';
export interface FormPageModelState {
  name: string;
  districtData?: any;
  orderName: string;
  orderNum: string;
  commodityData: CommodityDataTye;
}
export interface CommodityDataTye {
  package_id: string,
  package_name: string,
}
export interface FormPageModelType {
  namespace: 'formPage';
  state: FormPageModelState;
  effects: {
    query: Effect;
    submit: Effect;
  };
  reducers: {
    save: Reducer<FormPageModelState>;
  };
  subscriptions: { setup: Subscription };
}


const FormPageModel: FormPageModelType = {
  namespace: 'formPage',

  state: {
    name: '',
    districtData: [],
    orderName: '',
    orderNum: '',
    commodityData: {
      order_name: '',
      order_num: '',
    },
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      // const data = yield call(query, payload);
      // console.log(data)
      // yield put({
      //   type: 'save',
      //   payload: { name: data.text },
      // });
      let commodityPyload = {
        commodity_id: 1
      };
      const commodityDataRes = yield call(FormPageApi.qryCommodityData, commodityPyload);
      if (!commodityDataRes) return;
      const { data } = commodityDataRes;
      if (data) {

        let commodityData = data;
        yield put({
          type: 'save',
          payload: {
            commodityData: commodityData
          }
        })
      }
      const districtList = yield call(FormPageApi.qryDistrictList, payload);
      if (!districtList) return;
      let districtData = [];
      if (districtList && districtList.districts.length) {
        let firstLevel = districtList.districts[0].districts;
        firstLevel.map((val, firstIndex) => {
          let firstObj = {
            // value: val.adcode,
            value: val.name,
            label: val.name,
            children: [],
          }
          if (val.districts && val.districts.length) {
            let secondLevel = val.districts;
            secondLevel.map((val, secondIndex) => {
              let secondObj = {
                // value: val.adcode,
                value: val.name,
                label: val.name,
                children: [],
              };
              let thirdList = [];
              if (val.districts && val.districts.length) {
                let thirdLevel = val.districts;
                thirdLevel.map((val) => {
                  thirdList.push({
                    // value: val.adcode,
                    value: val.name,
                    label: val.name,
                    children: [],
                  })
                })
                secondObj.children = thirdList;
              }
              firstObj.children.push(secondObj);
            })
          }
          districtData.push(firstObj);
        })
      }
      yield put({
        type: 'save',
        payload: {
          districtData: districtData
        }
      })

    },
    *submit({ payload }, { call, put, select }) {
      const res = yield call(FormPageApi.submit, payload);
      if (!res) return;
      if (res.errcode === '0000') {
        Modal.alert(
          '提示',
          '提交成功！',
          [{ text: '确认', onPress: () => { router.goBack() } }])
      }
    }

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/formPage') {
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

export default FormPageModel;
