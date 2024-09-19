import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Button, Container, Row, Col, Toast, ToastContainer, Spinner } from 'react-bootstrap';
import { nanoid } from 'nanoid';
import { setIsNewOneAdded } from '../redux/slices/urlSlice';
import { useVerifyToken } from '../utils/verifyUser';
import '../styles/Shortner.css';
import '../styles/Sidebar.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const Shortner = () => {
    const dispatch = useDispatch();
    const navbarState = useSelector((state) => state.urlShortner.navbar.isNavbarOpened);
    const [urlGenerated, setUrlGenerated] = useState('');
    const [loading, setLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [urlImg, setUrlImg] = useState('')
    useVerifyToken();
    const handleSubmit = async (values, { setSubmitting }) => {
        setLoading(true);
        const { data } = await axios.post(
            `${backendUrl}/shortenUrl`,
            { originalUrl: values.url, randomSlug: nanoid(8) }
        );
        const { url, message } = data;
        setUrlImg(url?.qrCode, "thecode ")
        Swal.fire({
            title: "Good Job!",
            text: message,
            icon: "success"
        });
        if (data) {
            dispatch(setIsNewOneAdded(true))
            setUrlGenerated(url.shortUrl);
            setLoading(false);
            setShowToast(true);
            setSubmitting(false);
        }
    };

    return (
        <div className={`${navbarState ? 'blur-content' : ''}`}>
            <div className="shortner-container">
                <Container fluid className="" style={{ width: '90%' }}>
                    <Row className="justify-content-center mb-4" style={{ alignItems: 'center' }}>
                        <Col>
                            <h1 className="mb-4 display-6 fw-6 poppins-regular lead">URL Shortener</h1>
                            <ToastContainer className="p-3" position="top-end">
                                <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide>
                                    <Toast.Header>
                                        <strong className="me-auto">Success</strong>
                                        <small>Just now</small>
                                    </Toast.Header>
                                    <Toast.Body>Your URL has been shortened successfully!</Toast.Body>
                                </Toast>
                            </ToastContainer >
                            <hr />
                            <Formik
                                initialValues={{ url: '' }}
                                validationSchema={Yup.object().shape({
                                    url: Yup.string().url('Invalid URL format').required('URL is required'),
                                })}
                                onSubmit={handleSubmit}
                            >
                                {({ isSubmitting }) => (
                                    <Form>
                                        <div className="mb-3 m-5 d-grid" style={{ justifyItems: 'center' }}>
                                            <p htmlFor="url" className="text-center fs-4 poppins-regular">Enter URL to shorten</p>
                                            <Field
                                                id="url"
                                                name="url"
                                                type="text"
                                                placeholder="https://example.com"
                                                className="form-control poppins-regular w-75"
                                            />
                                            <ErrorMessage name="url" component="div" className="text-danger mt-1 poppins-regular" />
                                        </div>
                                        <div className="text-center poppins-regular">
                                            <Button type="submit" variant="primary" disabled={isSubmitting || loading}>
                                                {loading ? 'Shortening...' : 'Shorten URL'}
                                            </Button >
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </Col>
                    </Row>
                    <Row className="justify-content-center mt-5">
                        <Col md={8} lg={6} className="text-center custom-spinner">
                            {loading ? (
                                <>
                                    <Spinner animation="grow" variant="warning" />
                                    <Spinner animation="grow" variant="secondary" />
                                    <Spinner animation="grow" variant="info" />
                                    <Spinner animation="grow" variant="primary" />
                                    <Spinner animation="grow" variant="danger" />
                                    <Spinner animation="grow" variant="success" />
                                </>
                            ) : urlGenerated ? (
                                <>
                                    <h5 className="poppins-regular mb-3">Your shortened URL</h5>
                                    <div className="mt-4">
                                        <div className='card p-3 d-block justify-items-center align-items-center'>
                                            <p className="poppins-regular pt-2 pb-0 mb-0" style={{ paddingBottom: '0px', marginBottom: '0px' }}>
                                                <a href={urlGenerated} target="_blank" rel="noopener noreferrer">
                                                    {urlGenerated}
                                                </a>
                                            </p>
                                            <div
                                                dangerouslySetInnerHTML={{ __html: urlImg }}
                                            />
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    {/* <p className="text-muted poppins-regular text-danger">No URL generated yet</p> */}
                                </>
                            )}
                        </Col>
                    </Row>
                </Container>

            </div>

        </div>
    );
};

export default Shortner;
