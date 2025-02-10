// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import '@fontsource-variable/inter';
import './index.css';

import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Spinner } from './components/ui/spinner.tsx';
import { Layout } from './app/layout.tsx';

const NotFound = lazy(() =>
  import('./app/NotFound.tsx').then((module) => ({
    default: module.NotFound,
  }))
);

const Home = lazy(() =>
  import('./app/Home.tsx').then((module) => ({
    default: module.Home,
  }))
);

export function App() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="min-h-[350px] w-full flex flex-col gap-6 items-center px-4 py-24">
            <Spinner size="lg" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
