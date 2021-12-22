import { useState, useEffect } from 'react';
import { Link, useLocation, useRouteMatch } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import s from './MoviesPage.module.scss';
import { ReactComponent as NoImage } from '../../images/no-image.svg';
import { getMovieByQuery } from '../../services/ApiService';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movieList, setMovieList] = useState(null);
  const { url } = useRouteMatch();
  const location = useLocation();
  useEffect(() => {
    const localCache = JSON.parse(localStorage.getItem('movieList'));
    setMovieList(localCache);
  }, []);
  useEffect(() => {
    localStorage.setItem('movieList', JSON.stringify(movieList));
    console.log('useEffect setStorage', 'movieList');
  }, [movieList]);
  const handleInput = e => {
    const { value } = e.target;
    setQuery(value);
  };

  const submitQueryForm = e => {
    e.preventDefault();
    if (query.trim() === '') {
      toast.warn('Please enter text', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    const queryNormalized = query.toLowerCase();
    getMovieByQuery(queryNormalized)
      .catch(error => console.log('error :>> ', error))
      .then(({ results }) => setMovieList(results));
  };
  return (
    <>
      <form className={s.SearchForm} onSubmit={submitQueryForm}>
        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          name="query"
          value={query}
          // autoFocus
          placeholder="Search your movie"
          onChange={handleInput}
        />
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>
      </form>
      {movieList && (
        <ul className={s.movieList}>
          {movieList.map(({ id, title, poster_path, vote_average }) => (
            <div className={s.wrapper} key={id}>
              <li className={s.item}>
                <Link
                  className={s.link}
                  to={{ pathname: `${url}/${id}`, state: { from: location } }}
                >
                  {poster_path ? (
                    <img
                      className={s.image}
                      src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                      alt={title}
                    />
                  ) : (
                    <NoImage className={s.image} />
                  )}
                  <h3 className={s.titleItem}>{title}</h3>
                  <p className={s.rate}>Rating: {vote_average}</p>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      )}
      <ToastContainer />
    </>
  );
};
export default MoviesPage;
