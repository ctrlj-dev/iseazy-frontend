import { Loading } from '@components/ui/Loading';
import ROUTES from '@lib/constants/routes';
import { FC, lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Home = lazy(() => import('./pages/Home'));
const Game = lazy(() => import('./pages/Game'));

const App: FC = () => {
  return (
    <BrowserRouter>
      <main>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.GAME} element={<Game />} />
          </Routes>
        </Suspense>
      </main>
    </BrowserRouter>
  );
};

export default App;
