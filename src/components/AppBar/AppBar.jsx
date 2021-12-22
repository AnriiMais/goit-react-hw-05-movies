import s from './AppBar.module.scss';
import Navigation from '../Navigation';

export default function AppBar() {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
}
