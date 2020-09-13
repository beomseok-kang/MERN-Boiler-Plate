import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signInUser } from '../../../../api/user';
import { saveToken, setUserData } from '../../../../modules/user';
import ButtonPresenter from '../../../presenters/auth/ButtonPresenter';
import ErrorMessagePresenter from '../../../presenters/auth/ErrorMessagePresenter';
import FormPresenter from '../../../presenters/auth/FormPresenter';
import InputPresenter from '../../../presenters/auth/InputPresenter';
import InputWrapperPresenter, { currentStatus } from '../../../presenters/auth/InputWrapperPresenter';
import LinkPresenter from '../../../presenters/auth/LinkPresenter';
import LinksWrapperPresenter from '../../../presenters/auth/LinksWrapperPresenter';

function FormContainer() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const initialStatus: currentStatus = { status: null, message: null };
  const [emailStatus, setEmailStatus] = useState<currentStatus>(initialStatus);
  const [passwordStatus, setPasswordStatus] = useState<currentStatus>(initialStatus);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmitForm = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setEmailStatus(initialStatus);
    setPasswordStatus(initialStatus);
    try {
      const result = await signInUser({ email, password });
      if (result) {
        dispatch(saveToken(result.token));
        dispatch(setUserData(result.userData));
      }
      history.push({ pathname: '/' });
    } catch (err) {
      if (err.message === '421') {
        setEmailStatus({
          status: 'error',
          message: 'The email is incorrect.'
        });
      } else if (err.message === '420') {
        setPasswordStatus({
          status: 'error',
          message: 'The password is incorrect.'
        });
      } else {
        setErrorMessage('Unexpected error has occurred. Please try again.');
      }
      setPassword('');
      setIsLoading(false);
    }
  };
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <FormPresenter heading="Login" onSubmit={onSubmitForm}>
      {
        !isLoading
          ? <>
            <InputWrapperPresenter title="email" currentStatus={emailStatus}>
              <InputPresenter type="text" value={email} onChange={onChangeEmail}/>
            </InputWrapperPresenter>
            <InputWrapperPresenter title="password" currentStatus={passwordStatus}>
              <InputPresenter type="password" value={password} onChange={onChangePassword}/>
            </InputWrapperPresenter>
            {
              errorMessage
                ? <ErrorMessagePresenter>
                  {errorMessage}
                </ErrorMessagePresenter>
                : null
            }
            <ButtonPresenter type="submit">
              Submit
            </ButtonPresenter>
            <LinksWrapperPresenter>
              <LinkPresenter to="/auth/register">Register</LinkPresenter>
              |
              <LinkPresenter to="/auth/findpw">Forgot Password?</LinkPresenter>
            </LinksWrapperPresenter>
          </>
          : 'Loading... Please Wait.'
      }
    </FormPresenter>
  );
}

export default React.memo(FormContainer);