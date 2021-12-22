import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

const API_KEY = process.env.REACT_APP_API_KEY;

const setParams = (params = {}) =>
  (axios.defaults.params = { api_key: API_KEY, ...params });

const requestWithHandlingError = async endpoints => {
  return await axios.get(endpoints).then(res => {
    if (res.status >= 200 && res.status < 399) {
      return res.data;
    }
    return Promise.reject(new Error('Oops something went wrong...'));
  });
};
export const getTrendingMovies = () => {
  setParams();
  return requestWithHandlingError('trending/movie/week');
};
export const getMovieByQuery = query => {
  setParams({ language: 'en-US', page: 1, include_adult: false, query });
  return requestWithHandlingError('search/movie');
};
export const getMovieDetailsById = movieId => {
  setParams({ language: 'en-US' });
  return requestWithHandlingError(`movie/${movieId}`);
};

export const getMovieCast = movie_id => {
  setParams({ language: 'en-US' });
  return requestWithHandlingError(`movie/${movie_id}/credits`);
};
export const getMovieReviews = movie_id => {
  setParams({ language: 'en-US', page: 1 });
  return requestWithHandlingError(`movie/${movie_id}/reviews`);
};

// Trending:
// https://api.themoviedb.org/3/trending/movie/week?api_key=<<api_key>>
// Query one movie:
// https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&language=en-US&page=1&include_adult=false
// Movie details:
// https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>&language=en-US
// Movie Cast:
// https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key=<<api_key>>&language=en-US
// Movie reviews:
// https://api.themoviedb.org/3/movie/{movie_id}/reviews?api_key=<<api_key>>&language=en-US&page=1
