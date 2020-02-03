import uuid from "uuid";
import { SET_MOVIES, SET_QUERY, CLEAR_MOVIES } from "./actionTypes";
import api from "../api";

export const setMovies = arr => {
  return {
    type: SET_MOVIES,
    payload: arr
  };
};
export const setQuery = q => {
  return { type: SET_QUERY, payload: q };
};
export const clearMovies = () => {
  return { type: CLEAR_MOVIES };
};
export const fetchMovies = query => {
  function filterPoster(mov) {
    if (mov.poster_path) {
      return mov;
    }
  }
  return async dispatch => {
    dispatch(setQuery(query));
    let res = await api.get(
      `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${query}`
    );
    const max = res.data.total_pages;
    let current = res.data.page;
    for (current; current <= max; current++) {
      let res2 = await api.get(
        `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${query}&page=${current}`
      );
      const responseData = res2.data.results;
      const afterFilter = responseData.filter(filterPoster);
      const addedUuid = afterFilter.map(v => ({ ...v, uuid: uuid() }));
      dispatch(setMovies(addedUuid));
    }
  };
};
