import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { setNavbarState, setNavbarToggle } from '../redux/slices/urlSlice';

const url = import.meta.env.VITE_BACKEND_URL

export const useVerifyToken = () => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userToken = Cookies.get("token");

    useEffect(() => {
        const verifyCookie = async () => {
            if (!userToken) {
                console.log("No token found!");
                dispatch(setNavbarState(false));
                navigate("/login");
                return;
            }
            try {
                const { data } = await axios.post(
                    `${url}/`,
                    { token: userToken },
                    { withCredentials: true }
                );
                dispatch(setNavbarState(true));
                dispatch(setNavbarToggle(false));
                if (data.status) {
                    setUsername(data.user);
                } else {
                    console.log("User not verified");
                    Cookies.remove("token");
                    navigate("/login");
                    dispatch(setNavbarState(false));
                }
            } catch (error) {
                console.error("Error verifying user", error);
                navigate("/login");
                dispatch(setNavbarState(false));
            }
        };

        verifyCookie();
    }, [userToken, navigate, dispatch, url]);

    return username;
};
