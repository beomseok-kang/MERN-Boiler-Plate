import { takeEvery } from 'redux-saga/effects';
import { createUserSaga } from '../lib/createAsyncSaga';
import { getUserDataFromApi } from '../api/user';
import { createReducer } from 'typesafe-actions';

// actions

const SAVE_TOKEN = 'user/SAVE_TOKEN';
const DELETE_TOKEN = 'user/DELETE_TOKEN';

const SET_USERDATA = 'user/SET_USERDATA';

const GET_USERDATA = 'user/GET_USERDATA';
const GET_USERDATA_SUCCESS = 'user/GET_USERDATA_SUCCESS';
const GET_USERDATA_ERROR = 'user/GET_USERDATA_ERROR';

export const saveToken = (token: string) => ({
  type: SAVE_TOKEN,
  payload: token,
  error: null
});

export const setUserData = (userData: userData) => ({
  type: SET_USERDATA,
  payload: userData,
  error: null
})

export const deleteToken = () => ({
  type: DELETE_TOKEN,
  payload: null,
  error: null
});

export const getUserData = (token: string) => ({
  type: GET_USERDATA,
  payload: token,
  error: undefined
});

// state

export type userData = {
  id: string | null;
  nickName: string | null;
  email: string | null;
}

export type userState = {
  userData: userData;
  token: string | null;
};

const initialState: userState = {
  userData: {
    id: null,
    nickName: null,
    email: null
  },
  token: null
};

// saga

const getUserDataSaga = createUserSaga(GET_USERDATA, getUserDataFromApi)

export function* userSaga() {
  yield takeEvery(GET_USERDATA, getUserDataSaga);
}

// reducer

const user = createReducer<userState>(initialState, {
  [SAVE_TOKEN]: (state, action: any) => ({ ...state, token: action.payload }),
  [DELETE_TOKEN]: () => initialState,

  [SET_USERDATA]: (state, action: any) => ({ ...state, userData: action.payload }),

  [GET_USERDATA]: state => state,
  [GET_USERDATA_SUCCESS]: (state, action: any) => ({ ...state, userData: action.payload }),
  [GET_USERDATA_ERROR]: state => ({ ...initialState, token: state.token })
});

export default user;