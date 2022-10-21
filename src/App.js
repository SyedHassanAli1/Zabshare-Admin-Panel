import './App.css'
import MainRoutes from './Routes/MainRoutes';
import SideDrawerRoutes from './Routes/SideDrawerRoutes';
import Login from './Screens/Login/Login'
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <MainRoutes>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='dashboard/*' element={<SideDrawerRoutes />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </MainRoutes>
    </div>
  );
}

export default App;
