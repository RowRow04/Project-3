import { call, put, takeLatest } from "redux-saga/effects";

// ? api request
import {
  getModules,
  getEasyModules,
  getAverageModules,
  getDifficultModules,
  getSubjects,
  getTopics,
  getLibrary,
  getLibraryLessons,
  getLibraryVideos,
  getLibraryLessonsPerGrade,
  getLibraryVideosPerGrade,
} from "../api/school-api";

// ? slice
import {
  callSubjects,
  callSubjectsSuccess,
  callSubjectsFailed,
  callSubjectTopic,
  callSubjectTopicSuccess,
  callSubjectTopicsFailed,
  callSubjectModules,
  callSubjectModulesSuccess,
  callSubjectModuleFailed,
  callLevels,
  callLevelsSuccess,
  callLevelsFailed,
  callsubjectEasyModules,
  callsubjectEasyModulesSuccess,
  callsubjectEasyModulesFailed,
  callsubjectAverageModules,
  callsubjectAverageModulesSuccess,
  callsubjectAverageModulesFailed,
  callsubjectDifficultModules,
  callsubjectDifficultModulesSuccess,
  callsubjectDifficultModulesFailed,
  callSubjectLibrary,
  callSubjectLibrarySuccess,
  callSubjectLibraryFailed,
  callLibraryLessons,
  callLibraryLessonsSuccess,
  callLibraryLessonsFailed,
  callLibraryVideos,
  callLibraryVideosSuccess,
  callLibraryVideosFailed,
  callLibraryLessonsPerGrade,
  callLibraryLessonsPerGradeSuccess,
  callLibraryLessonsPerGradeFailed,
  callLibraryVideosPerGrade,
  callLibraryVideosPerGradeSuccess,
  callLibraryVideosPerGradeFailed,
} from "../slices/subjectSlice";

// ? get subjects
function* requestSubjects() {
  const pathname = window.location.pathname.split("/");
  const currentGrade = pathname[pathname.length - 1];
  try {
    const result = yield call(getSubjects, { gradeLevel: currentGrade });
    yield put(callSubjectsSuccess(result.data));
  } catch (error) {
    yield put(callSubjectsFailed());
  }
}

// ? get topics
function* requestTopics({ payload }) {
  try {
    const result = yield call(getTopics, payload);
    yield put(callSubjectTopicSuccess(result.data));
  } catch (error) {
    yield put(callSubjectTopicsFailed());
  }
}

function* requestModules({ payload }) {
  try {
    const result = yield call(getModules, payload);
    yield put(callSubjectModulesSuccess(result.data));
  } catch (error) {
    yield put(callSubjectModuleFailed());
  }
}

function* requestEasyModules({ payload }) {
  try {
    const result = yield call(getEasyModules, payload);
    yield put(callsubjectEasyModulesSuccess(result.data));
  } catch (error) {
    yield put(callsubjectEasyModulesFailed());
  }
}

function* requestAverageModules({ payload }) {
  try {
    const result = yield call(getAverageModules, payload);
    yield put(callsubjectAverageModulesSuccess(result.data));
  } catch (error) {
    yield put(callsubjectAverageModulesFailed());
  }
}

function* requestDifficultModules({ payload }) {
  try {
    const result = yield call(getDifficultModules, payload);
    yield put(callsubjectDifficultModulesSuccess(result.data));
  } catch (error) {
    yield put(callsubjectDifficultModulesFailed());
  }
}

function* requestLibrary({ payload }) {
  try {
    const result = yield call(getLibrary, payload);
    yield put(callSubjectLibrarySuccess(result.data));
  } catch (error) {
    yield put(callSubjectLibraryFailed());
  }
}

function* requestLibraryLessons({ payload }) {
  try {
    const result = yield call(getLibraryLessonsPerGrade, payload);
    yield put(callLibraryLessonsPerGradeSuccess(result.data));
  } catch (error) {
    yield put(callLibraryLessonsPerGradeFailed());
  }
}

function* requestLibraryVideos({ payload }) {
  try {
    const result = yield call(getLibraryVideosPerGrade, payload);
    yield put(callLibraryVideosPerGradeSuccess(result.data));
  } catch (error) {
    yield put(callLibraryVideosPerGradeFailed());
  }
}

export default function* subjectsSaga() {
  yield takeLatest(callSubjects.type, requestSubjects);
  yield takeLatest(callSubjectTopic.type, requestTopics);
  yield takeLatest(callSubjectModules.type, requestModules);
  yield takeLatest(callLevels.type, requestModules);
  yield takeLatest(callsubjectEasyModules.type, requestEasyModules);
  yield takeLatest(callsubjectAverageModules.type, requestAverageModules);
  yield takeLatest(callsubjectDifficultModules.type, requestDifficultModules);
  yield takeLatest(callSubjectLibrary.type, requestLibrary);
  yield takeLatest(callLibraryLessonsPerGrade.type, requestLibraryLessons);
  yield takeLatest(callLibraryVideosPerGrade.type, requestLibraryVideos);
}
