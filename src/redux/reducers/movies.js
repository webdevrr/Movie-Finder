import {
  SET_MOVIES,
  SET_MAX,
  CLEAR_MOVIES,
  SET_FETCHING
} from "../actionTypes";

const initialState = {
  movies: [],
  maxPages: null,
  isFetching: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MOVIES: {
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
        isFetching: false
      };
    }
    case CLEAR_MOVIES: {
      return {
        ...initialState
      };
    }

    case SET_MAX: {
      return {
        ...state,
        maxPages: action.payload
      };
    }
    case SET_FETCHING: {
      return {
        ...state,
        isFetching: true
      };
    }
    default:
      return state;
  }
}
