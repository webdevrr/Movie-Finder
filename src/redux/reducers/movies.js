import { SET_MOVIES, SET_QUERY, CLEAR_MOVIES } from "../actionTypes";

const initialState = {
  movies: [],
  maxPages: null,
  query: "",
  currentPage: 1
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_MOVIES: {
      return {
        ...state,
        movies: [...state.movies, ...action.payload]
      };
    }
    case CLEAR_MOVIES: {
      return {
        ...state,
        initialState
      };
    }
    case SET_QUERY: {
      return {
        ...state,
        query: action.payload
      };
    }
    default:
      return state;
  }
}
