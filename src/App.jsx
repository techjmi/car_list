import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Signin from './page/Signin';
import Signup from './page/Signup';
import AddCar from './page/AddCar';
import CarDetails from './page/CarDetails';
import PrivateRoute from './components/PrivateRoute';
import EditCar from './page/EditCar';
import UserCars from './page/UserCars';
import Carform from './components/Carform';
// import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <div className=''>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Public routes */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/car-details/:id' element={<CarDetails />} />
         <Route element={<PrivateRoute />}>
         <Route path='/add-car' element={<Carform />} />
         <Route path='user-car'element={<UserCars />} />
         <Route path='/edit-car/:id' element={<EditCar />} />
         </Route>
         

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
