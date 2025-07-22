import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import Login from './pages/Loginpage';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
    </Routes>
  )
}


export default App;
