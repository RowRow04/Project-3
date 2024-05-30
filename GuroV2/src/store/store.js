import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Import your auth slice and saga
import authReducer from "./slices/auth-slice";
import hangmanReducer, { hangmanSlice } from "./slices/hangman-slice";
import jumbledReducer, { jumbledSlice } from "./slices/jumbled-slice";
import subjectReducer from "./slices/subjectSlice";
import subjectsSaga from "./sagas/subjectsSaga";
import mazeReducer, { mazeSlice } from "./slices/maze-slice";
import crosswordReducer, { crosswordSlice } from "./slices/crossword-slice";
import dragDropReducer, { dragDropSlice } from "./slices/dragdrop-slice";

const rootPersistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["hangman", "jumbled", "crossword", "maze", "dragdrop"],
};

const authPersistConfig = {
  key: "auth",
  version: 1,
  storage,
  blacklist: [],
};

const subjectPersistConfig = {
  key: "subjects",
  version: 1,
  storage,
  blacklist: [],
};

const rootReducer = combineReducers({
  // Add your reducers here
  auth: persistReducer(authPersistConfig, authReducer),
  subjects: persistReducer(subjectPersistConfig, subjectReducer),
  [hangmanSlice.name]: hangmanReducer,
  [jumbledSlice.name]: jumbledReducer,
  [crosswordSlice.name]: crosswordReducer,
  [mazeSlice.name]: mazeReducer,
  [dragDropSlice.name]: dragDropReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
});

// Run your sagas
sagaMiddleware.run(subjectsSaga);

export const persistor = persistStore(store);
export default store;
