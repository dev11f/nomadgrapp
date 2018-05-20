// storage를 local device에 persist 함
// npm install redux-persist redux-thunk redux --save

import { combineReducers, applyMiddleware, createStore } from "redux";
import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import user from "./modules/user";
import photos from "./modules/photos";

const middlewares = [thunk];

const persistConfig = {
  key: "root", // 로그아웃하거나 할 때 지우고 싶을 수 있으니까 key 입력.
  storage
  // 블랙리스트할 수 있지만 아무 것도 안함.
};

const reducer = persistCombineReducers(persistConfig, {
  //모바일 디스크에 리듀서들을 저장할 것
  user,
  photos
});

const configureStore = () => {
  let store = createStore(reducer, applyMiddleware(...middlewares));
  let persistor = persistStore(store);
  return { store, persistor };
};

export default configureStore;
