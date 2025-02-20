import './App.css';
import Navbar from './components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import UserCard from './components/UserCard';
import ProfilePage from './components/ProfilePage';
import SkillsPage from './components/SkillsPage';
import Hero from './components/Hero';
import { Provider, useDispatch, useSelector } from 'react-redux';
import appstore from './utils/store';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  
  return (
    <Provider store={appstore}>
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-grow">
        
        <Outlet />
      </main>
    </div>

    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
    </Provider>

  );
}

export default App;
