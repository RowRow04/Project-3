import { put, call, takeLatest } from "redux-saga/effects";
import { schoolActions } from "../store";
import { getSubjects, getTopics, getModules } from "../api/school-api";

function* setGradeRequest({ payload }) {
  const { fetchSubjectsSuccess, requestError } = schoolActions;
  const result = yield call(getSubjects, { gradeLevel: payload.id });

  if (result.name === "AxiosError") {
    yield put(requestError(result.response));
  } else {
    yield put(fetchSubjectsSuccess(result.data));
  }
}
function* fetchTopicsRequest({ payload }) {
  const { fetchTopicsSuccess, requestError } = schoolActions;

  const result = yield call(getTopics, payload);
  if (result.name === "AxiosError") {
    yield put(requestError(result.response));
  } else {
    yield put(fetchTopicsSuccess(result.data));
  }
}
function* fetchModulesRequest({ payload }) {
  const { fetchModulesSuccess, requestError } = schoolActions;

  const result = yield call(getModules, payload);
  if (result.name === "AxiosError") {
    yield put(requestError(result.response));
  } else {
    yield put(fetchModulesSuccess(result.data));
  }
}

export default function* schoolSaga() {
  yield takeLatest(`school/setGrade`, setGradeRequest);
  yield takeLatest(`school/fetchTopics`, fetchTopicsRequest);
  yield takeLatest(`school/fetchModules`, fetchModulesRequest);
}
