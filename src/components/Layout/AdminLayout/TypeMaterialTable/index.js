import { DataGrid } from '@mui/x-data-grid';

import { ButtonSecondary } from '../../../stylesComponentsButton';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import { useContext, useCallback } from 'react';
import Swal from 'sweetalert2';

import { DataContext } from '../../../../Context/DataProvider';
import TypeMaterialServices from '../../../../services/typeMaterialServices';

const TypeMaterialTable = ({ setOpen }) => {
    const { dataTypeMaterial, setDataTypeMaterial } = useContext(DataAdminContext);
    const { listTypeMaterial, refreshSource, setRefreshSource } = useContext(DataContext);

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
                        onClick={() => handleDelete(params.id)}
                    >
                        delete
                    </ButtonSecondary>
                );
            }
        }
    ];

    const handleDelete = async (id) => {
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
                deleteTypeMaterial(id);
                Swal.fire('Se ha Borrado', 'tipo material eliminado', 'success');
                const refresh = !refreshSource;
                setRefreshSource(refresh);
            }
        });
    };

    const deleteTypeMaterial = async (id) => {
        await TypeMaterialServices.deleteTypeMaterial(id);
    };

    const handleEditSource = async (id) => {
        const datasource = await listTypeMaterial.filter((source) => source.id === id);

        const data = {
            ...dataTypeMaterial,
            name: datasource[0].name,
            id: datasource[0].id,
            action_Create: false,
            action_name: 'Actulizar',
            title: 'Actualizar Tipo Material del producto'
        };
        setDataTypeMaterial(data);
        console.log('dataaaaaa', datasource[0].name);
        console.log('data source', data);

        // console.log('filtro po id usuarios', dataUser);
        setOpen(true);
    };

    const rows = listTypeMaterial;
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
export default TypeMaterialTable;
