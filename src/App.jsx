import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Shortner from './pages/Shortner'
import ShortnerTable from './pages/ShortenedTables'
import RedirectToOriginal from './pages/RedirectOriginal'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Info from './pages/Info'
import RequestPassword from './pages/RequestPassword'
import ResetPassword from './pages/ResetPassword'
import PreventSidebar from './components/PreventSidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { setNavbarToggle } from './redux/slices/urlSlice';
import { useSelector, useDispatch } from "react-redux";
import './App.css';

function App() {
  const dispatch = useDispatch();
  const [hideSidebar, setHideSidebar] = useState(true);
  const navbarState = useSelector((state) => state.urlShortner.navbar.navbarState);
  const handleSidebarToggle = (isOpen) => {
    dispatch(setNavbarToggle(isOpen));
  };
  return (
    <>
      <Router>
        <PreventSidebar hideSidebar={hideSidebar} navbarState={navbarState} setHideSidebar={setHideSidebar} handleSidebarToggle={handleSidebarToggle} />
        <div className="">
          <div>
            <Routes>
              <Route exact path="/" element={<Dashboard />} />
              <Route exact path="/shortner" element={<Shortner />} />
              <Route exact path="/generated-urls" element={<ShortnerTable />} />
              <Route path="/:slug" element={<RedirectToOriginal hideSidebar={hideSidebar} setHideSidebar={setHideSidebar} />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/signup" element={<Signup />} />
              <Route exact path="/request-password-reset" element={<RequestPassword />} />
              <Route exact path="/info" element={<Info />} />
              <Route exact path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
          </div>
        </div>
      </Router >
    </>
  );
}

export default App
