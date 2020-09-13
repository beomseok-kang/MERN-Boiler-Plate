import { call, put } from 'redux-saga/effects';

export const createUserSaga = (type: string, promiseCreator: any) => {
  const SUCCESS = `${type}_SUCCESS`;
  const ERROR = `${type}_ERROR`;

  return function* (action: any) {
    try {
      const result = yield call(promiseCreator, action.payload);
      yield put({
        type: SUCCESS,
        payload: result,
        error: null
      });
    } catch (err) {
      yield put({
        type: ERROR,
        error: err
      });
    }
  }
};
