import { takeEvery, put, call } from "redux-saga/effects";
import * as Types from "./todos.type";
import * as Action from "./todos.action";
import API from "./todos.api";

function* fetchSaga({ params }) {
  try {
    const res = yield call(API.fetch, params);
    if (res) {
      yield put(Action.fetchSuccess(res.data.data.items));
    }
  } catch (error) {
    yield put(Action.fetchFailure(error));
    console.log(error);
  }
}

function* addSaga({ params, callback, callback1 }) {
  try {
    const res = yield call(API.add, params);
    if (res) {
      yield put(Action.addSuccess(params));
      callback();
    }
  } catch (error) {
    yield put(Action.addError(error));
    console.log(error);
    callback1();
  }
}

function* updateSaga({ params, callback, callback1 }) {
  try {
    const res = yield call(API.update, params);
    if (res) {
      yield put(Action.updateSuccess());

      callback();
    }
  } catch (error) {
    yield put(Action.updateError(error));
    console.log(error);
    callback1();
  }
}
function* completedSaga({ params, callback, callback1 }) {
  try {
    const res = yield call(API.update, params);
    if (res) {
      yield put(Action.completedSuccess());
      yield put(Action.fetchRequest());
      callback();
    }
  } catch (error) {
    yield put(Action.completedError(error));
    console.log(error);
    callback1();
  }
}
function* deleteSaga({ params, data, callback, callback1 }) {
  try {
    const res = yield call(API.delete, params, data);
    if (res) {
      yield put(Action.deleteSuccess());
      yield put(Action.fetchRequest());
      callback();
    }
  } catch (error) {
    yield put(Action.deleteError(error));
    console.log(error);
    callback1();
  }
}

export function* todosSaga() {
  yield takeEvery(Types.FETCH_REQUEST, fetchSaga);
  yield takeEvery(Types.ADD_REQUEST, addSaga);
  yield takeEvery(Types.UPDATE_REQUEST, updateSaga);
  yield takeEvery(Types.DELETE_REQUEST, deleteSaga);
  yield takeEvery(Types.COMPLETED_REQUEST, completedSaga);
}
