// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Enroll from './Components/Enroll/Enroll';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Profile from './Components/Profile/Profile';

function App() {

  return (
    <>
    <Router>
    <div className="App">
    <Routes>
    <Route exact path='/' element={<Home/>} />
    <Route exact path='/enroll' element={<Enroll/>} />
    <Route exact path='/profile' element={<Profile/>} />
    <Route exact path='/register' element={<Register/>} />
    <Route exact path='/login' element={<Login/>} />
    </Routes>
      </div>
    </Router>
    </>
  );
}

export default App;