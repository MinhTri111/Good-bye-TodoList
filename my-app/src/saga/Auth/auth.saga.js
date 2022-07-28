import { takeEvery, put, call } from "redux-saga/effects";
import * as Types from "./auth.type";
import * as Action from "./auth.action";
import API from "./auth.api";

function* registerSaga({ params, callback, callback1 }) {
  try {
    const res = yield call(API.register, params);
    if (res) {
      yield put(Action.registerSuccess());
      callback();
    }
  } catch (error) {
    yield put(Action.registerFailure(error.response.data.data.message));
    callback1(error.response.data.data.message);
  }
}

function* loginSaga({ params, callback, callback1 }) {
  try {
    const res = yield call(API.login, params);
    if (res) {
      localStorage.setItem("token", JSON.stringify(res.data.data.token));
      const me = yield call(API.getMe);
      yield put(
        Action.loginSuccess({
          id: me.data.data._id,
        })
      );
      callback();
    }
  } catch (error) {
    yield put(Action.loginFailure(error.response.data.data.message));
    callback1(error.response.data.data.message);
  }
}

function* logoutSaga({ params }) {
  try {
    localStorage.removeItem("token");
    yield put(Action.logoutSuccess());
  } catch (error) {
    console.log(error);
    yield put(Action.logoutFailure(error));
  }
}
function* setUserSaga() {
  try {
    const me = yield call(API.getMe);
    yield put(Action.setUserSuccess(me.data.data._id));
  } catch (error) {
    console.log(error);
    yield put(Action.setUserFailure(error));
  }
}

export function* authSaga() {
  yield takeEvery(Types.REGISTER_REQUEST, registerSaga);
  yield takeEvery(Types.SET_USER_REQUEST, setUserSaga);
  yield takeEvery(Types.LOGIN_REQUEST, loginSaga);
  yield takeEvery(Types.LOGOUT_REQUEST, logoutSaga);
}
