import { useEffect, useState } from 'react';
import { Link, useLocation,} from 'react-router-dom';
import { getTrendingMovies } from '../../services/ApiService';
import s from './HomePage.module.scss';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .catch(error => setError(error))
      .then(({ results }) => setMovies(results))
      .finally(setLoading(false));
  }, []);

  return (
    <div className={s.content}>
      <h1 className={s.title}>Trending today</h1>
      {loading && <h2>We are working...</h2>}
      {error && <p>Oops something went wrong... :(</p>}
      {movies && (
        <ul className={s.movieList}>
          {movies.map(({ id, title, poster_path, vote_average }) => (
            <div className={s.wrapper} key={id}>
              <li className={s.item}>
                <Link
                  className={s.link}
                  to={{ pathname: `/movies/${id}`, state: { from: location } }}
                >
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
                    alt={title}
                  />
                  <h3 className={s.titleItem}>{title}</h3>
                  <p className={s.rate}>Rating: {vote_average}</p>
                </Link>
              </li>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};
export default HomePage;
