import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { setNavbarState } from '../redux/slices/urlSlice';
import { useVerifyToken } from '../utils/verifyUser';

const RedirectToOriginal = ({ setHideSidebar }) => {
    const { slug } = useParams();
    useEffect(() => {
        const fetchOriginalUrl = async () => {
            try {
                const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/${slug}`);
                const { data } = response;
                if (data.originalUrl) {
                    window.location.href = data.originalUrl;
                } else {
                    console.error('Original URL not found');
                }
            } catch (error) {
                console.error('Error fetching original URL:', error);
            }
        };
        fetchOriginalUrl();
    }, [slug]);

    useEffect(() => {
        if (slug) {
            setHideSidebar(true)
        } else {
            setHideSidebar(false)
        }
    }, [slug])

    return <>
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="text-center">
                <p>Here we go 🚀</p>
                <div>
                    <Spinner animation="grow" variant="warning" />
                    <Spinner animation="grow" variant="secondary" />
                    <Spinner animation="grow" variant="info" />
                    <Spinner animation="grow" variant="primary" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="success" />
                </div>
            </div>
        </div>
    </>
};

export default RedirectToOriginal;