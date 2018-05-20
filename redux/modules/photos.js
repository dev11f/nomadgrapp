// Imports
import { API_URL } from "../../constants";
import { actionCreators as userActions } from "./user";
import uuidv1 from "uuid/v1";

// Actions

const SET_FEED = "SET_FEED";
const SET_SEARCH = "SET_SEARCH";

// Actions Creators

function setFeed(feed) {
  return {
    type: SET_FEED,
    feed
  };
}

function setSearch(search) {
  return {
    type: SET_SEARCH,
    search
  };
}

// API Actions

function getFeed() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${API_URL}/images/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          // 권한 없으면 유저 로그아웃
          dispatch(userActions.logOut());
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(setFeed(json)));
  };
}

function getSearch() {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${API_URL}/images/search/`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          // 권한 없으면 유저 로그아웃
          dispatch(userActions.logOut());
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(setSearch(json)));
  };
}

function searchByHashtag(hashtag) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    fetch(`${API_URL}/images/search/?hashtags=${hashtag}`, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
      .then(response => {
        if (response.status === 401) {
          // 권한 없으면 유저 로그아웃
          dispatch(userActions.logOut());
        } else {
          return response.json();
        }
      })
      .then(json => dispatch(setSearch(json)));
  };
}

// 좋아요, 좋아요 취소는 redux store에 영향을 미치지 않는다. 그냥 function의 결과를 return하는 것 뿐이니까
// 어떤 액션도 dispatch하지 않는다. 이 액션은 리듀서에 연결된 게 아님
// redux store를 사용하지 않는 이유는 이 컴포넌트를 많은 스크린에서 사용할 껀데
// 어떤 스크린은 우리가 사용하지 않기 떄문
// 다른 사람의 photo 정보를 내 redux store에 저장할 필요 없음.
// 리덕스 액션과 컴포넌트 사이의 커뮤니케이션만 잘하면 됨.
function likePhoto(photoId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${API_URL}/images/${photoId}/likes/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logOut());
      } else if (response.ok) {
        return true;
      } else {
        return false;
      }
    });
  };
}

function unlikePhoto(photoId) {
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${API_URL}/images/${photoId}/unlikes/`, {
      method: "DELETE",
      headers: {
        Authorization: `JWT ${token}`
      }
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logOut());
      } else if (response.ok) {
        return true;
      } else {
        return false;
      }
    });
  };
}

function uploadPhoto(file, caption, location, tags) {
  const tagsArray = tags.split(",");
  const data = new FormData();
  data.append("caption", caption);
  data.append("location", location);
  data.append("tags", JSON.stringify(tagsArray));
  data.append("file", {
    uri: file,
    type: "image/jpeg",
    name: `${uuidv1()}.jpg`
  });
  return (dispatch, getState) => {
    const {
      user: { token }
    } = getState();
    return fetch(`${API_URL}/images/`, {
      method: "POST",
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "multipart/form-data"
      },
      body: data
    }).then(response => {
      if (response.status === 401) {
        dispatch(userActions.logOut());
      } else if (response.ok) {
        dispatch(getFeed());
        dispatch(userActions.getOwnProfile());
        return true;
      } else {
        return false;
      }
    });
  };
}

// Initial State

const initialState = {};

// Reducer

//it’s just a function that takes state and action as arguments, and returns the next state of the app
// action과 state를 묶기 위해서 reducer를 씀.
function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_FEED:
      return applySetFeed(state, action);
    case SET_SEARCH:
      return applySetSearch(state, action);
    default:
      return state;
  }
}

// Reducer Actions

function applySetFeed(state, action) {
  const { feed } = action;
  return {
    ...state,
    feed
  };
}

function applySetSearch(state, action) {
  const { search } = action;
  return {
    ...state,
    search
  };
}

// Exports

const actionCreators = {
  getFeed,
  getSearch,
  likePhoto,
  unlikePhoto,
  searchByHashtag,
  uploadPhoto
};

export { actionCreators };

// Default Reducer Export

export default reducer;
