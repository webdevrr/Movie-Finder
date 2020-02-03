import { SET_MOVIES, SET_MAX, CLEAR_MOVIES } from "../actionTypes";

const initialState = {
  movies: [],
  maxPages: null
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
        ...initialState
      };
    }

    case SET_MAX: {
      return {
        ...state,
        maxPages: action.payload
      };
    }
    default:
      return state;
  }
}
