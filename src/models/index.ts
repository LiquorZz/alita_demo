import { query } from '@/services/api';
import * as IndexApi from '@/services/index';
import { Effect } from '@/models/connect';
import { Reducer } from 'redux';
import { Subscription } from 'dva';
export interface IndexModelState {
  name: string;
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
    name: ''
  },

  effects: {
    *query({ payload }, { call, put, select }) {
      payload = {
        id: 1
      };
      const data = yield call(IndexApi.qryExpend, payload);
      console.log(data)
      if (!data) return;
      yield put({
        type: 'save',
        payload: { expend: data },
      });

    },

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
