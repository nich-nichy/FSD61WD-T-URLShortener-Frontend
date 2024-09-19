import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import '../styles/Dashboard.css';
import '../styles/Sidebar.css';
import LastShortenedUrls from '../components/LastShortenedUrls';
import { useSelector } from "react-redux";
import { useVerifyToken } from '../utils/verifyUser';

const Dashboard = () => {
    const navbarState = useSelector((state) => state.urlShortner.navbar.isNavbarOpened);
    useVerifyToken();

    return (
        <div>
            <div className={`${navbarState ? 'blur-content' : ''}`}>
                <div className="dashboard-content">
                    <Container>
                        <h2 className="mb-4 display-6 fw-6 poppins-regular lead">Dashboard</h2>
                        <hr className="mb-4" />
                        <p className="display-6 lead poppins-regular">Welcome, <span className="fw-3">Guest</span></p>
                        <Row className="g-4 d-flex justify-content-between">
                            <Col md={4}>
                                <div className="card card-purple-blue text-white border-none" style={{ width: '100%', borderRadius: '15px' }}>
                                    <div className="card-body">
                                        <Card.Title className="poppins-light fs-5">URL Shortened Today</Card.Title>
                                        <Card.Text className="fw-2 fs-2 poppins-light text-center">0</Card.Text>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="card card-salmon-pink text-white" style={{ width: '100%', borderRadius: '15px' }}>
                                    <div className="card-body">
                                        <Card.Title className="poppins-light fs-5">URLs Shortened within a month</Card.Title>
                                        <Card.Text className="fw-2 fs-2 poppins-light text-center">0</Card.Text>
                                    </div>
                                </div>
                            </Col>
                            <Col md={4}>
                                <div className="card card-purple-pink text-white" style={{ width: '100%', borderRadius: '15px' }}>
                                    <div className="card-body">
                                        <Card.Title className="poppins-light fs-5">Total shortened URLs</Card.Title>
                                        <Card.Text className="fw-2 fs-2 poppins-light text-center">0</Card.Text>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                    <Container className="container-fluid mt-3">
                        <p className="mb-4 lead fs-3 fw-3 poppins-regular">Recent shortened URLs</p>
                        <div className="text-center shadow-sm">
                            <LastShortenedUrls />
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
