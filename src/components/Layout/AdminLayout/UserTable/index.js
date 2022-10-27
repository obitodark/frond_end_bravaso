import { DataGrid } from '@mui/x-data-grid';

import { ButtonSecondary } from '../../../stylesComponentsButton';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import { useContext, useCallback } from 'react';
import Swal from 'sweetalert2';
import User from '../../../../services/UserServices';
// import SearchIcon from '@mui/icons-material/Search';
import { useState, useEffect } from 'react';
import { Avatar } from '@mui/material';
const TableData = ({ setOpenFormModal }) => {
    const { setIdUser, setUserData } = useContext(DataAdminContext);
    // const [filterUsers, setFiltertUsers] = useState([]);
    // const getNameInitial = (name) => {
    //     const names = name.split('');
    //     return names[0];
    // };

    const [listUsers, setListUsers] = useState([]);

    const getListUser = async () => {
        const response = await User.listUser();
        setListUsers(response);
        // setFiltertUsers(response);
    };

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'avatar',
            headerName: 'Avatar',
            width: 80,
            editable: true,
            renderCell: (params) => <Avatar sx={{ height: '67px', width: '67px' }} src={params.value} />

            // <img sx={{ borderRadius: '50%' }} width={60} src={params.value} />
        },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: `last_name`, headerName: 'last_name', width: 150 },
        { field: `username`, headerName: 'Username', width: 100 },
        { field: `dni`, headerName: 'Dni', width: 100 },
        { field: `email`, headerName: 'Email', width: 150 },
        { field: `type`, headerName: 'Type-User', width: 100 },
        {
            field: 'clck',
            headerName: 'action',
            width: 150,
            renderCell: (params) => {
                // you will find row info in params
                // console.log(params.id);
                return (
                    <ButtonSecondary
                        back_color={'#3B8DDA '}
                        back_color_hover={'#6A96E9'}
                        text_size={'15px'}
                        onClick={() => handleEditUser(params.id)}
                    >
                        edit
                    </ButtonSecondary>
                );
            }
        },
        {
            field: '',
            headerName: 'action',
            width: 150,
            renderCell: (params) => {
                // you will find row info in params
                return (
                    <ButtonSecondary
                        back_color={'#F1294B '}
                        back_color_hover={'#E96A6A'}
                        text_size={'15px'}
                        onClick={() => handleDeleteUser(params.id)}
                    >
                        delete
                    </ButtonSecondary>
                );
            }
        }
    ];

    const handleDeleteUser = async (id) => {
        Swal.fire({
            title: 'Seguro que desea eliminar este usuario?',
            text: 'esta accion no podra ser revertido!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id);
                Swal.fire('Se ha Borrado', 'usuario eliminado', 'success');
                window.location.reload();
            }
        });
    };

    const deleteUser = async (id) => {
        await User.deleteUser(id);
    };

    const handleEditUser = (id) => {
        const dataUser = listUsers.filter((listUser) => listUser.id === Number(id));

        setUserData({
            name: dataUser[0].name,
            last_name: dataUser[0].last_name,
            username: dataUser[0].username,
            dni: dataUser[0].dni,
            email: dataUser[0].email,
            status: dataUser[0].status
        });

        setIdUser(id);
        console.log('filtro po id usuarios', dataUser[0]);
        setOpenFormModal(true);
    };

    const data = listUsers.map((data) => {
        data.avatar =
            data.imagesUser[0] !== undefined
                ? data.imagesUser[0].images.image
                : 'https://alfabetajuega.com/hero/2019/08/one-punch-man-saitama-2.jpg?width=1200';
        data.type = data.role.name;
        // listProduct[0].images[0].images.image
        return data;
    });
    const rows = data;
    const getRowSpacing = useCallback((params) => {
        return {
            top: params.isFirstVisible ? 0 : 5,
            bottom: params.isLastVisible ? 0 : 5
        };
    }, []);

    // const handleFilterUser = (e) => {
    //     const filtro = listUsers.filter((listUser) => listUser.name.includes(e.target.value));
    //     console.log('filtro', filtro, e.target.value, typeof filtro, typeof listUsers);
    //     setFiltertUsers(filtro);
    // };
    useEffect(() => {
        getListUser();
    }, []);

    return (
        <div style={{ height: 600, width: '100%', background: 'white', borderRadius: '5px', padding: '10px' }}>
            {/* {console.log('lista', data)} */}
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={6}
                rowHeight={70}
                getRowSpacing={getRowSpacing}
                getRowClassName={(params) => (params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd')}
            />
        </div>
    );
};
export default TableData;
