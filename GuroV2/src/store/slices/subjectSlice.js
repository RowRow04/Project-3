import { createSlice } from "@reduxjs/toolkit";

export const subjectSlice = createSlice({
  name: "subjects",
  initialState: {
    loadingSubjects: false,
    loadingTopics: false,
    loadingModules: false,
    loadingActivities: false,
    loadingLibrary: false,
    loadingLibraryLessons: false,
    loadingLibraryVideos: false,
    loadingLibraryLessonsPerGrade: false,
    loadingLibraryVideosPerGrade: false,
    subjects: [],
    topics: [],
    modules: [],
    levels: [],
    library: [],
    libraryLessons: [],
    libraryVideos: [],
    libraryLessonsPerGrade: [],
    libraryVideosPerGrade: [],
  },
  reducers: {
    callSubjects(state) {
      state = { ...state, loadingSubjects: true };
    },
    callSubjectsSuccess(state, { payload }) {
      state = { ...state, loadingSubjects: false, subjects: [...payload] };
      return state;
    },

    callSubjectsFailed(state) {
      state = { ...state, loadingSubjects: false, subjects: [] };
      return state;
    },

    callSubjectTopic(state) {
      state = { ...state, loadingTopics: true };
      return state;
    },

    callSubjectTopicSuccess(state, { payload }) {
      state = { ...state, loadingTopics: false, topics: [...payload] };
      return state;
    },

    callSubjectTopicsFailed(state, { payload }) {
      state = { ...state, loadingTopics: false, topics: [] };
      return state;
    },

    callSubjectModules(state) {
      state = { ...state, loadingModules: true };
      return state;
    },

    callSubjectModulesSuccess(state, { payload }) {
      state = {
        ...state,
        loadingModules: false,
        modules: payload.modules,
        levels: payload.levels,
      };
      return state;
    },

    callSubjectModuleFailed(state) {
      state = { ...state, loadingModules: false, modules: [] };
      return state;
    },

    callLevels(state) {
      state = { ...state, loadingModules: true };
      return state;
    },

    callLevelsSuccess(state, { payload }) {
      state = { ...state, levels: payload }; // Update levels state
      return state;
    },

    callLevelsFailed(state) {
      state = { ...state, levels: [] }; // Clear levels state on failure
      return state;
    },

    callsubjectEasyModules(state) {
      state = { ...state, loadingModules: true };
      return state;
    },

    callsubjectEasyModulesSuccess(state, { payload }) {
      state = {
        ...state,
        loadingModules: false,
        modules: [...payload.modules],
      };
      return state;
    },

    callsubjectEasyModulesFailed(state) {
      state = { ...state, loadingModules: false, modules: [] };
      return state;
    },
    callsubjectAverageModules(state) {
      state = { ...state, loadingModules: true };
      return state;
    },

    callsubjectAverageModulesSuccess(state, { payload }) {
      state = {
        ...state,
        loadingModules: false,
        modules: [...payload.modules],
      };
      return state;
    },

    callsubjectAverageModulesFailed(state) {
      state = { ...state, loadingModules: false, modules: [] };
      return state;
    },
    callsubjectDifficultModules(state) {
      state = { ...state, loadingModules: true };
      return state;
    },

    callsubjectDifficultModulesSuccess(state, { payload }) {
      state = {
        ...state,
        loadingModules: false,
        modules: [...payload.modules],
      };
      return state;
    },

    callsubjectDifficultModulesFailed(state) {
      state = { ...state, loadingModules: false, modules: [] };
      return state;
    },

    callSubjectActivities(state) {
      state = { ...state, loadingActivities: true };
      return state;
    },
    callSubjectActivitiesSuccess(state, { payload }) {
      state = { ...state, loadingActivities: false, modules: [...payload] };
      return state;
    },
    callSubjectActivitiesFailed(state) {
      state = { ...state, loadingActivities: false, modules: [] };
      return state;
    },
    callSubjectLibrary(state) {
      state = { ...state, loadingLibrary: true };
      return state;
    },
    callSubjectLibrarySuccess(state, { payload }) {
      state = { ...state, loadingLibrary: false, library: [...payload] };
      return state;
    },
    callSubjectLibraryFailed(state) {
      state = { ...state, loadingLibrary: false, library: [] };
      return state;
    },
    callLibraryLessons(state) {
      state = { ...state, loadingLibraryLessons: true };
      return state;
    },
    callLibraryLessonsSuccess(state, { payload }) {
      state = {
        ...state,
        loadingLibraryLessons: false,
        libraryLessonsPerGrade: [...payload],
      };
      return state;
    },
    callLibraryLessonsFailed(state) {
      state = { ...state, loadingLibrary: false, libraryLessonsPerGrade: [] };
      return state;
    },
    callLibraryVideos(state) {
      state = { ...state, loadingLibraryVideos: true };
      return state;
    },
    callLibraryVideosSuccess(state, { payload }) {
      state = {
        ...state,
        loadingLibraryVideos: false,
        libraryVideos: [...payload],
      };
      return state;
    },
    callLibraryVideosFailed(state) {
      state = { ...state, loadingLibraryVideos: false, libraryVideos: [] };
      return state;
    },

    callLibraryLessonsPerGrade(state) {
      state = { ...state, loadingLibraryLessonsPerGrade: true };
      return state;
    },
    callLibraryLessonsPerGradeSuccess(state, { payload }) {
      state = {
        ...state,
        loadingLibraryLessonsPerGrade: false,
        libraryLessonsPerGrade: [...payload],
      };
      return state;
    },
    callLibraryLessonsPerGradeFailed(state) {
      state = {
        ...state,
        loadingLibraryPerGrade: false,
        libraryLessonsPerGrade: [],
      };
      return state;
    },
    callLibraryVideosPerGrade(state) {
      state = { ...state, loadingLibraryVideosPerGrade: true };
      return state;
    },
    callLibraryVideosPerGradeSuccess(state, { payload }) {
      state = {
        ...state,
        loadingLibraryVideosPerGrade: false,
        libraryVideosPerGrade: [...payload],
      };
      return state;
    },
    callLibraryVideosPerGradeFailed(state) {
      state = {
        ...state,
        loadingLibraryVideosPerGrade: false,
        libraryVideos: [],
      };
      return state;
    },
  },
});

export const {
  callSubjects,
  callSubjectsSuccess,
  callSubjectsFailed,
  callSubjectTopic,
  callSubjectTopicSuccess,
  callSubjectTopicsFailed,
  callSubjectModules,
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
  callSubjectModulesSuccess,
  callSubjectModuleFailed,
  callSubjectActivities,
  callSubjectActivitiesSuccess,
  callSubjectActivitiesFailed,
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
} = subjectSlice.actions;
export default subjectSlice.reducer;
