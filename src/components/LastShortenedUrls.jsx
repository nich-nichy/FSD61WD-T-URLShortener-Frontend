import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AgGridReact } from 'ag-grid-react';
import { setLastGeneratedData, setIsNewOneAdded } from '../redux/slices/urlSlice';
import axios from 'axios';
import Cookies from "js-cookie";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL

const LastShortenedUrls = () => {
    const dispatch = useDispatch();
    const lastUrlData = useSelector((state) => state.urlShortner.urlData.lastGeneratedData);
    const isNewOneAdded = useSelector((state) => state.urlShortner.urlData.isNewOneAdded);
    const userToken = Cookies.get("token");
    const [rowData, setRowData] = useState([]);
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

    useEffect(() => {
        const getUrls = async () => {
            const getAllUrls = await axios.get(
                `${backendUrl}/getLastGeneratedUrls`);
            dispatch(setLastGeneratedData(getAllUrls.data.urls));
            dispatch(setIsNewOneAdded(false))
        }
        if (userToken && (lastUrlData?.length === 0 || isNewOneAdded === true)) {
            console.log("becomes true")
            getUrls();
        }
    }, [lastUrlData, isNewOneAdded, userToken]);

    useEffect(() => {
        const allDatas = lastUrlData?.map((item, index) => {
            return {
                id: index + 1,
                "Shortened Urls": item.shortUrl,
                "Original URLs": item.originalUrl,
                "Time": item.dateCreated,
            };
        });
        setRowData(allDatas);
    }, [lastUrlData])

    return (
        <div className="ag-theme-quartz" style={{ height: 230, width: '100%' }}>
            <AgGridReact
                rowData={rowData}
                columnDefs={colDefs}
                pagination={true}
                paginationPageSize={5}
                rowHeight={50}
                headerHeight={50}
            />
        </div>
    );
};

export default LastShortenedUrls;
