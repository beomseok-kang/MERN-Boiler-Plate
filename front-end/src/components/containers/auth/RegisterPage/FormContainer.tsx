import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registerUser } from '../../../../api/user';
import ButtonPresenter from '../../../presenters/auth/ButtonPresenter';
import ErrorMessagePresenter from '../../../presenters/auth/ErrorMessagePresenter';
import FormPresenter from '../../../presenters/auth/FormPresenter';
import InputPresenter from '../../../presenters/auth/InputPresenter';
import InputWrapperPresenter, { currentStatus } from '../../../presenters/auth/InputWrapperPresenter';
import LinkPresenter from '../../../presenters/auth/LinkPresenter';
import LinksWrapperPresenter from '../../../presenters/auth/LinksWrapperPresenter';

function FormContainer() {
  const [nickName, setNickName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkPassword, setCheckPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const initialStatus: currentStatus = {
    status: 'warning', message: 'The input is empty.'
  };
  const [nickNameStatus, setNickNameStatus] = useState<currentStatus>(initialStatus);
  const [emailStatus, setEmailStatus] = useState<currentStatus>(initialStatus);
  const [passwordStatus, setPasswordStatus] = useState<currentStatus>(initialStatus);
  const [checkPasswordStatus, setCheckPasswordStatus] = useState<currentStatus>(initialStatus);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const nickNameRegExp = /^(?=[a-zA-Z0-9._]{3,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
  const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const passwordRegExp = /^(?=.*[A-Z])(?=.*[!@#$&*]).{8,20}$/;

  const history = useHistory();

  const checkValidity = () => {
    if (
      emailStatus.status === 'fine'
      && nickNameStatus.status === 'fine'
      && (passwordStatus.status === 'fine' || passwordStatus.status === 'warning')
      && checkPasswordStatus.status === 'fine'
    ) {
      return true;
    }
    return false;
  }

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    if (checkValidity()) {
      try {
        const result = await registerUser({ nickName, email, password });
        if (result) {
          history.push({ pathname: '/auth/login' });
        }
      } catch (err) {
        if (err.message === '422') {
          setEmailStatus({
            status: 'error',
            message: 'The user already exists.'
          });
        } else {
          setErrorMessage('Unexpected error has occurred. Please try again.');
        }
        setPassword('');
        setCheckPassword('');
        setIsLoading(false);
      }
    } else {
      setErrorMessage('Please check if all the inputs are valid.');
      setPassword('');
      setCheckPassword('');
      setIsLoading(false);
    }
  };
  const onChangeNickName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const nickName = event.target.value;
    setNickName(nickName);
    if (nickName.length < 3 || nickName.length > 20) {
      setNickNameStatus({
        status: 'error',
        message: 'A nickname should have 3 - 20 characters.'
      });
    } else if (!nickNameRegExp.test(nickName)) {
      setNickNameStatus({
        status: 'warning',
        message: 'A nickname should only contain alphanumeric characters, dot and underscore.'
      });
    } else {
      setNickNameStatus({
        status: 'fine',
        message: 'Your nickname looks fine!'
      });
    }
  };
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setEmail(email);
    if (!emailRegExp.test(email)) {
      setEmailStatus({
        status: 'error',
        message: 'The email is invalid.'
      });
    } else {
      setEmailStatus({
        status: 'fine',
        message: 'The email is valid!'
      });
    }
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPassword(password);
    if (password.length < 8 || password.length > 20) {
      setPasswordStatus({
        status: 'error',
        message: 'A password should have 8 - 20 characters.'
      });
    } else if (!passwordRegExp.test(password)) {
      setPasswordStatus({
        status: 'warning',
        message: 'Your password is weak. A strong password should include at least 1 upper case letter and 1 special character.'
      });
    } else {
      setPasswordStatus({
        status: 'fine',
        message: 'Your password is strong!'
      });
    }
  };
  const onChangeCheckPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checkPassword = event.target.value;
    setCheckPassword(checkPassword);
    if (checkPassword !== password) {
      setCheckPasswordStatus({
        status: 'warning',
        message: 'It does not match with your password.'
      });
    } else {
      setCheckPasswordStatus({
        status: 'fine',
        message: 'It matches with your password!'
      });
    }
  };

  return (
    <FormPresenter heading="Register" onSubmit={onSubmitForm}>
      {
        !isLoading
          ? <>
            <InputWrapperPresenter title="nickname" currentStatus={nickNameStatus}>
              <InputPresenter type="text" value={nickName} onChange={onChangeNickName}/>
            </InputWrapperPresenter>
            <InputWrapperPresenter title="email" currentStatus={emailStatus}>
              <InputPresenter type="text" value={email} onChange={onChangeEmail}/>
            </InputWrapperPresenter>
            <InputWrapperPresenter title="password" currentStatus={passwordStatus}>
              <InputPresenter type="password" value={password} onChange={onChangePassword}/>
            </InputWrapperPresenter>
            <InputWrapperPresenter title="check password" currentStatus={checkPasswordStatus}>
              <InputPresenter type="password" value={checkPassword} onChange={onChangeCheckPassword}/>
            </InputWrapperPresenter>
            {
              errorMessage
                ? <ErrorMessagePresenter>
                  {errorMessage}
                </ErrorMessagePresenter>
                : null
            }
            <ButtonPresenter type="submit">Submit</ButtonPresenter>
            <LinksWrapperPresenter>
              <LinkPresenter to="/auth/login">Sign In</LinkPresenter>
              |
              <LinkPresenter to="/auth/findpw">Forgot Password?</LinkPresenter>
            </LinksWrapperPresenter>
          </>
          : 'Loading... Please Wait.'
      }
    </FormPresenter>
  );
}

export default FormContainer;