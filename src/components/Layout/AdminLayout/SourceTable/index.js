import { DataGrid } from '@mui/x-data-grid';

import { ButtonSecondary } from '../../../stylesComponentsButton';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import { useContext, useCallback } from 'react';
import Swal from 'sweetalert2';

import { DataContext } from '../../../../Context/DataProvider';
import SourceProductServices from '../../../../services/SourceProductServices';

const SourceTable = ({ setOpen }) => {
    const { dataSource, setDataSource } = useContext(DataAdminContext);
    const { listSource, refreshSource, setRefreshSource } = useContext(DataContext);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 200 },
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
                        onClick={() => handleEditSource(params.id)}
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
            title: 'Seguro que desea elimina item?',
            text: 'esta accion no podra ser revertido!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteUser(id);
                Swal.fire('Se ha Borrado', 'origen eliminado', 'success');
                const refresh = !refreshSource;
                setRefreshSource(refresh);
            }
        });
    };

    const deleteUser = async (id) => {
        await SourceProductServices.deleteSourceProduct(id);
    };

    const handleEditSource = async (id) => {
        const datasource = await listSource.filter((source) => source.id === id);

        const data = {
            ...dataSource,
            name: datasource[0].name,
            id: datasource[0].id,
            action_Create: false,
            action_name: 'Actulizar',
            title: 'Actualizar origen del producto'
        };
        setDataSource(data);
        console.log('dataaaaaa', datasource[0].name);
        console.log('data source', data);

        // console.log('filtro po id usuarios', dataUser[0]);
        setOpen(true);
    };

    const rows = listSource;
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
export default SourceTable;
