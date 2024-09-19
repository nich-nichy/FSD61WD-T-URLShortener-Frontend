import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const noSidebarRoutes = ['/login', '/signup', '/request-password-reset', '/info', '/reset-password', ':slug'];

const PreventSidebar = ({ hideSidebar, setHideSidebar, handleSidebarToggle }) => {
    const location = useLocation();

    useEffect(() => {
        const shouldHideSidebar = noSidebarRoutes.some(route => location.pathname.includes(route));
        setHideSidebar(shouldHideSidebar);
    }, [location.pathname]);

    return (
        <>
            {!hideSidebar ? <Sidebar onToggle={handleSidebarToggle} /> : null}
        </>
    );
};

export default PreventSidebar;
