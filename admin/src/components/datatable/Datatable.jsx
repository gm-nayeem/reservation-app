import './datatable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { userRequest } from '../../utils/request';
import useFetch from '../../hooks/useFetch';

const Datatable = ({ columns }) => {
    const location = useLocation();
    const path = location.pathname.split("/")[1];
    const [lists, setLists] = useState([]);

    const { data, loading, error } = useFetch(
        `/${path}`, 
        path==="users" && "userRequest"
    );


    // set data
    useEffect(() => {
        setLists(data);
    }, [data]);

    // handle delete
    const handleDelete = async (id) => {
        try {
            await userRequest.delete(`/${path}/${id}`);
            setLists(lists.filter((list) => list._id !== id));
        } catch (err) {
            console.log(err);
        }
    }

    // create action column
    const actionColumn = [
        {
            field: "action", headerName: "Action", width: 160, renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/${path}/${params.row._id}`} className='linkStyle'>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row._id)}
                        >
                            Delete
                        </div>
                    </div>
                )
            }
        }
    ]


    return (
        <>
            {
                loading ? (
                    "Loading please wait..."
                ) : error ? (
                    "Something went wrong!!"
                ) : (
                    <div className="datatable">
                        <div className="datatableTitle">
                            {path}
                            <Link to={`/${path}/new`} className='link linkStyle'>
                                <span> Add New</span>
                            </Link>

                        </div>
                        <DataGrid
                            rows={lists}
                            columns={columns.concat(actionColumn)}
                            pageSize={7}
                            rowsPerPageOptions={[5]}
                            checkboxSelection
                            getRowId={(row) => row._id}
                        />
                    </div>
                )
            }
        </>
    );
}

export default Datatable;