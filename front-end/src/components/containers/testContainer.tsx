import React from 'react';
import TestComponent from '../presenters/test';
import { getUserData, registerParams, registerUser, signInParams, signInUser } from '../../api/user';

function TestContainer() {

  const testRegister = async () => {
    const body: registerParams = {
      nickName: 'Beom Seok',
      email: 'test@test.com',
      password: 'testPW123'
    };
    const registered = await registerUser(body);
    console.log(registered);
  };
  const testSignIn = async () => {
    const body: signInParams = {
      email: 'bumsuk980119@gmail.com',
      password: 'kang5700'
    };
    const json = await signInUser(body);
    console.log(json);
  };
  const testGetUserData = async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZjViNTAxZjJlM2Q5NTUzMDgxYmQxZWUiLCJuaWNrTmFtZSI6ImVmZm9ydCIsImVtYWlsIjoiYnVtc3VrOTgwMTE5QGdtYWlsLmNvbSIsImlhdCI6MTU5OTg4NjA0MiwiZXhwIjoxNTk5OTcyNDQyLCJpc3MiOiJlZmZvcnQuZGV2In0.1q_XON7vWQYJP0zc-voEgLHTeVnDTyWTPO6BZ2f_kHo';
    const json = await getUserData(token);
    console.log(json);
  }

  return (
    <>
      <TestComponent onClick={testRegister}>
        Register test
      </TestComponent>
      <TestComponent onClick={testSignIn}>
        Sign In test
      </TestComponent>
      <TestComponent onClick={testGetUserData}>
        Get UserData test
      </TestComponent>
    </>
  );

}

export default TestContainer;