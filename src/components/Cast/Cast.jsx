import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import s from './Cast.module.scss';
import { ReactComponent as DefaultImg } from '../../images/no-photo.svg';
import { getMovieCast } from '../../services/ApiService';

export default function Cast() {
  const [cast, setCast] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    getMovieCast(movieId)
      .catch(error => console.log('error :>> ', error))
      .then(({ cast }) => setCast(cast));
  }, [movieId]);
  return (
    cast && (
      <ul className={s.castList}>
        {cast.map(({ profile_path, name, id }) => (
          <li className={s.item} key={id}>
            <div className={s.castWrapper}>
              {profile_path ? (
                <img
                  className={s.castImg}
                  src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                  alt={`${name}`}
                />
              ) : (
                <DefaultImg />
              )}
              <span className={s.name}>{name}</span>
            </div>
          </li>
        ))}
      </ul>
    )
  );
}
