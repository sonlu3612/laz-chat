import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.css';
import AppRoutes from './routes';
import { verifyToken } from './redux/reducers/auth';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyToken());
  }, [dispatch]);

  return (
    <AppRoutes/>
  )
}


export default App;