import uuid from "uuid";
import { SET_MOVIES, SET_MAX, CLEAR_MOVIES } from "./actionTypes";
import api from "../api";

export const setMovies = arr => {
  return {
    type: SET_MOVIES,
    payload: arr
  };
};
export const setMax = max => {
  return { type: SET_MAX, payload: max };
};
export const clearMovies = () => {
  return { type: CLEAR_MOVIES };
};

export const fetchMovies = (query, page) => {
  return async dispatch => {
    dispatch(clearMovies());

    let res = await api.get(
      `/3/search/multi?api_key=${process.env.REACT_APP_APIKEY}&query=${query}&page=${page}`
    );
    const responseData = res.data.results;
    const maxPages = res.data.total_pages;
    const addedUuid = responseData.map(v => ({ ...v, uuid: uuid() }));
    dispatch(setMovies(addedUuid));
    dispatch(setMax(maxPages));
  };
};
