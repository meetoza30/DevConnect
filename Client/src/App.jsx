import './App.css';
import Navbar from './components/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import UserCard from './components/UserCard';
import ProfilePage from './components/ProfilePage';
import SkillsPage from './components/SkillsPage';
import Hero from './components/Hero';
import { Provider, useDispatch, useSelector } from 'react-redux';
import appstore from './utils/store';

function App() {

  
  return (
    <Provider store={appstore}>
    <div className="flex flex-col">
      <Navbar />
      <main className="flex-grow">
        
        <Outlet />
      </main>
    </div>
    </Provider>

  );
}

export default App;
