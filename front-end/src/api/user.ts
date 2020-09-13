import axios from 'axios';
import key from '../config/key';
import { userData } from '../modules/user';

const userApiRoute = key.apiServerUrl + '/api/user';

export type registerParams = {
  nickName: string;
  email: string;
  password: string;
};

type RegisterResult = {
  code: number;
  registerSuccess: boolean;
  message: string;
};

// returns boolean: true if register successful, false if register unsuccessful.
export const registerUser = async (params: registerParams) => {
  const jsonRes = await axios.post(userApiRoute + '/register', params);
  const data: RegisterResult = jsonRes.data;
  if (data.registerSuccess) {
    return true;
  } else {
    console.error(`${data.code}: ${data.message}`);
    throw new Error(`${data.code}`);
  }
};

export type signInParams = {
  email: string;
  password: string;
};

export type SignInResult = {
  code: number;
  loginSuccess: boolean;
  message: string;
  user: User;
  token: string;
};

export type User = {
  role: number;
  _id: string;
  nickName: string;
  email: string;
  password: string;
  __v: number;
};

// returns userState itself (contains all the data).
export const signInUser = async (params: signInParams) => {
  const jsonRes = await axios.post(userApiRoute + '/login', params);
  const data: SignInResult = jsonRes.data;
  if (data.loginSuccess) {
    return {
      userData: {
        id: data.user._id,
        nickName: data.user.nickName,
        email: data.user.email
      },
      token: data.token
    };
  } else {
    console.error(`${data.code}: ${data.message}`);
    throw new Error(`${data.code}`);
  }
};

export type getUserDataResult = {
  code: number;
  tokenData: tokenData | null;
  message: string;
};
export type tokenData = {
  _id: string;
  nickName: string;
  email: string;
  iat: number;
  exp: number;
  iss: string;
};

// returns userData object (by parsing json response).
export const getUserDataFromApi = async (token: string): Promise<userData> => {
  const jsonRes = await axios.get(userApiRoute + '/data', {
    headers: { authorization: token }
  });
  const data: getUserDataResult = jsonRes.data;
  if (data.tokenData) {
    return {
      id: data.tokenData._id,
      nickName: data.tokenData.nickName,
      email: data.tokenData.email
    }
  } else {
    console.error(`${data.code}: ${data.message}`);
    throw new Error(`${data.code}`);
  }
};