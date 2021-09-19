import { call, put, select, takeLatest } from '@redux-saga/core/effects';
import { authApi } from 'api/auth-api';
import { RootState } from 'app/store';
import { authActions } from './auth-slice';
export const getAuth = (state: RootState) => state.auth;

function* getCurrentUser(): any {
  try {
    const response = yield call(authApi.checkAuth);
    yield put(authActions.setCurrentUser(response));
    yield put(authActions.setError(null));
  } catch (error) {
    yield put(authActions.setError('Co loi xay ra'));
    yield put(authActions.setCurrentUser(null));
    console.log('auth saga', error);
  }
  const authState = yield select(getAuth);
  console.log("auth state", authState)
}

export default function* authSaga() {
  yield takeLatest(authActions.checkAuth.type, getCurrentUser);
}
