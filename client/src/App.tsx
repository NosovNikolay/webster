import { Route, Routes } from 'react-router-dom';
import Studio from './pages/Studio/Studio';
import SignIn from '~/pages/Auth/SignIn';
import SignUp from '~/pages/Auth/SignUp';
import EmailConfirm from '~/pages/Auth/EmailConfirm';
import AuthLayout from './pages/Auth/AuthLayout';
import { useAppSelector } from './hooks/use-app-selector';
import { useEffect } from 'react';
import { useLazyGetCanvasesQuery } from './store/slices/canvas-slice';
import Loader from './components/Loader/Loader';
import { useDispatch } from 'react-redux';
import { setStage } from './store/slices/frame-slice';

function App() {
  const { isLoggedIn, stage } = useAppSelector((state) => ({ ...state.auth, ...state.frame }));
  const dispatch = useDispatch();
  const [getCanvases, { isLoading }] = useLazyGetCanvasesQuery();

  useEffect(() => {
    if (!isLoggedIn || stage.id) {
      return;
    }

    getCanvases()
      .unwrap()
      .then((data) => {
        if (!data.length) {
          return;
        }
        const firstStage = data[0];
        dispatch(setStage({ ...firstStage }));
      })
      .catch((err) => console.error(err));
  }, [isLoggedIn]);

  return isLoading ? (
    <Loader isFullScreen />
  ) : (
    <Routes>
      <Route path="/" element={<Studio />} />
      <Route element={<AuthLayout />}>
        <Route path="/auth/sign-in" element={<SignIn />} />
        <Route path="/auth/sign-up" element={<SignUp />} />
        <Route path="/auth/verify-email" element={<EmailConfirm />} />
      </Route>
    </Routes>
  );
}

export default App;
