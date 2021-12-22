import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import s from './components/Container/Container.module.scss';
import './App.css';
import AppBar from './components/AppBar';
import Container from './components/Container';
const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
  return (
    <Container className={s.container}>
      <AppBar />
      <Suspense fallback={<h2>Load...</h2>}>
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>
          <Route>
            <NotFoundPage />
          </Route>
        </Switch>
      </Suspense>
    </Container>
  );
}
