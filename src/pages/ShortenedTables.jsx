import React, { useState, useEffect } from 'react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { AgGridReact } from 'ag-grid-react';
import { useSelector, useDispatch } from "react-redux";
import { setUrlData, setIsNewOneAdded } from '../redux/slices/urlSlice';
import { Container } from 'react-bootstrap';
import { useVerifyToken } from '../utils/verifyUser';
import axios from 'axios';
import Cookies from "js-cookie";
import '../styles/ShortnerTable.css'

const backendUrl = import.meta.env.VITE_BACKEND_URL

const ShortnerTable = () => {
    const dispatch = useDispatch();
    const initialState = [];
    const navbarState = useSelector((state) => state.urlShortner.navbar.isNavbarOpened);
    const isNewOneAdded = useSelector((state) => state.urlShortner.urlData.isNewOneAdded);
    const allData = useSelector((state) => state.urlShortner.urlData.data);
    const [rowData, setRowData] = useState(initialState);
    useVerifyToken();
    const [colDefs] = useState([
        { headerName: "ID", field: "id", flex: 1, sortable: true, filter: true },
        {
            headerName: "Shortened URLs",
            field: "Shortened Urls",
            flex: 3,
            sortable: true,
            filter: true,
            cellRenderer: (params) => {
                return <a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a>;
            },
        },
        {
            headerName: "Original URLs",
            field: "Original URLs",
            flex: 3,
            sortable: true,
            filter: true,
            cellRenderer: (params) => {
                return <a href={params.value} target="_blank" rel="noopener noreferrer">{params.value}</a>;
            },
        },
        { headerName: "Time Generated", field: "Time", flex: 2, sortable: true, filter: true },
    ]);

    const userToken = Cookies.get("token");

    useEffect(() => {
        const getUrls = async () => {
            try {
                const getAllUrls = await axios.get(`${backendUrl}/getAllUrls`);
                dispatch(setUrlData(getAllUrls.data.urls));
                dispatch(setIsNewOneAdded(false))
            } catch (error) {
                console.error("Error fetching URLs:", error);
            }
        };
        if (userToken && (allData?.length === 0 || isNewOneAdded === true)) {
            console.log("becomes true from shorten table")
            getUrls();
        }
    }, [allData, isNewOneAdded, userToken]);


    useEffect(() => {
        const allDatas = allData?.map((item, index) => ({
            id: index + 1,
            "Shortened Urls": item.shortUrl,
            "Original URLs": item.originalUrl,
            "Time": item.dateCreated,
        }));

        setRowData(allDatas);
    }, [allData]);

    return (
        <div>
            <div className={`${navbarState ? 'blur-content' : ''}`}>
                <div className="shortner-table-container">
                    <Container>
                        <h2 className="display-6 fw-6 poppins-regular lead">Generated URLs History</h2>
                        <p className="mb-4 lead poppins-regular">Here are the URLs you've generated:</p>
                        <hr className="mb-4" />
                    </Container>
                    <Container className="container-fluid mt-3">
                        <div className="text-center shadow-sm">
                            <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
                                <AgGridReact
                                    rowData={rowData}
                                    columnDefs={colDefs}
                                    pagination={true}
                                    paginationPageSize={5}
                                    rowHeight={50}
                                    headerHeight={50}
                                />
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default ShortnerTable;
