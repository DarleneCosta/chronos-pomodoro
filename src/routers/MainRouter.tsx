import { Route, Routes, BrowserRouter } from 'react-router';
import { NotFound } from '../pages/NotFound';
import { AboutPomodoro } from '../pages/AboutPomodoro';
import { Home } from '../pages/Home';
import { Settings } from '../pages/Settings';
import { History } from '../pages/History';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export const MainRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about-pomodoro' element={<AboutPomodoro />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/history' element={<History />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
