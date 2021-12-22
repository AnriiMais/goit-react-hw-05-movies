import {
  NavLink,
  useHistory,
  useLocation,
  useParams,
  Route,
  Switch,
} from 'react-router-dom';
import { useEffect, useState, lazy, Suspense } from 'react';
import { useRouteMatch } from 'react-router-dom';
import s from './MovieDetailsPage.module.scss';
import { getMovieDetailsById } from '../../services/ApiService';
const Cast = lazy(() => import('../../components/Cast'));
const Reviews = lazy(() => import('../../components/Reviews'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const match = useRouteMatch();
  const location = useLocation();
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const onGoBack = () => {
    history.push(location?.state?.from?.pathname ?? '/');
  };
  useEffect(() => {
    getMovieDetailsById(movieId)
      .catch(error => console.log('error :>> ', error))
      .then(data => setMovie(data));
  }, [movieId]);
  return (
    movie && (
      <>
        <div className={s.content}>
          <button className={s.btnGoBack} type="button" onClick={onGoBack}>
            Go back
          </button>
          <div className={s.wrapper}>
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
            />
            <div className={s.descr}>
              <h3 className="title">{movie.title}</h3>
              <p className="genres">
                <b>Genres: </b>
                {movie.genres.map(genre => genre.name).join(', ')}
              </p>
              <p className="date">
                <b>Date release: </b> {movie.release_date}
              </p>
              <p className="langueges">
                <b>Languages: </b>
                {movie.spoken_languages
                  .map(language => language.english_name)
                  .join(', ')}
              </p>
              <p className="productin">
                {' '}
                <b>Productions: </b>
                {movie.production_companies.map(item => item.name).join(', ')}
              </p>
              <p className="overview">
                <b>Overview: </b>
                {movie.overview}
              </p>
            </div>
          </div>
        </div>
        <div className="links">
          <p>Additional information</p>
          <ul>
            <li>
              <NavLink exact to={{ pathname: `${match.url}/cast` }}>
                Cast
              </NavLink>
            </li>
            <li>
              <NavLink exact to={{ pathname: `${match.url}/reviews` }}>
                Reviews
              </NavLink>
            </li>
          </ul>
        </div>
        <Suspense>
          <Switch>
            <Route path="/movies/:movieId/reviews">
              <Reviews />
            </Route>
            <Route path="/movies/:movieId/cast">
              <Cast />
            </Route>
          </Switch>
        </Suspense>
      </>
    )
  );
};
export default MovieDetailsPage;
