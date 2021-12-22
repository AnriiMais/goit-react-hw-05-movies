import { NavLink } from 'react-router-dom';
import s from './Navigation.module.scss';

function Navigation() {
  return (
    <nav className={s.navBar}>
      <NavLink exact to="/" className={s.link} activeClassName={s.active}>
        Home
      </NavLink>
      <NavLink exact to="/movies" className={s.link} activeClassName={s.active}>
        Movies
      </NavLink>
    </nav>
  );
}
export default Navigation;
