import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews } from '../../services/ApiService';

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();
  useEffect(() => {
    getMovieReviews(movieId)
      .catch(error => console.log(error))
      .then(({ results }) => setReviews(results));
  }, [movieId]);

  return reviews.length !== 0 ? (
    <ul>
      {reviews.map(({ author, author_details, content, id }) => (
        <li key={id}>
          <img src={author_details?.avatar_path?.slice(1)} alt="" />
          <span>{author}</span>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  ) : (
    <p>We don't have any reviews for this movie</p>
  );
}
