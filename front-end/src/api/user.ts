import axios from 'axios';
import key from '../config/key';

const userApiRoute = key.apiServerUrl + '/api/user';

export type registerParams = {
  nickName: string;
  email: string;
  password: string;
};

// returns boolean: true if register successful, false if register unsuccessful.
export const registerUser = async (params: registerParams) => {
  await axios.post(userApiRoute + '/register', params)
    .then((data: any) => {
      if (data.code === 200) return true 
    })
    .catch((err: any) => {
      console.error(err);
      return false
    });
  return false
};

export type signInParams = {
  email: string;
  password: string;
}

// returns response object (by parsing json response).
export const signInUser = async (params: signInParams) => {
  const jsonRes: any = await axios.post(userApiRoute + '/login', params);
  return jsonRes;
};

// returns response object (by parsing json response).
export const getUserData = async (token: string) => {
  const jsonRes: any = await axios.get(userApiRoute + '/data', {
    headers: { authorization: token }
  });
  return jsonRes;
}