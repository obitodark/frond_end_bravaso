import { ButtonSecondary } from '../../../stylesComponentsButton';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import { useContext, useCallback } from 'react';
import Swal from 'sweetalert2';

import { DataContext } from '../../../../Context/DataProvider';
import Products from '../../../../services/ProductsServices';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
const TableData = () => {
    const { listProduct, resfresh, setResfresh } = useContext(DataContext);
    const { setIdProduct, setProductData, setUtilsData } = useContext(DataAdminContext);
    const history = useNavigate();
    // *********************************************

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'imagen',
            headerName: 'Image',
            width: 80,
            editable: true,
            renderCell: (params) => <img width={60} src={params.value} /> // renderCell will render the component
        },
        { field: 'name', headerName: 'Name', width: 400 },
        { field: `namebrand`, headerName: 'brand', width: 150 },
        { field: `price`, headerName: 'price', width: 100 },
        { field: `stock`, headerName: 'stock', width: 50 },
        { field: `namecategoria`, headerName: 'categoria', width: 150 },
        { field: `namesubcategoria`, headerName: 'categoria', width: 100 },
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
                        onClick={() => handleEditProduct(params.id)}
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
                        onClick={() => handleDeleteProduct(params.id)}
                    >
                        delete
                    </ButtonSecondary>
                );
            }
        }
    ];

    const data = listProduct.map((data) => {
        data.namebrand = data.brand.name;
        data.namecategoria = data.category.name;
        data.namesubcategoria = data.subcategory.name;
        data.imagen = data.images[0].images.image;
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
    // *********************************************

    const handleDeleteProduct = async (id) => {
        Swal.fire({
            title: `Seguro que desea eliminar este Producto?`,
            text: 'esta accion no podra ser revertido!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id);
                Swal.fire('Se ha Borrado', 'usuario eliminado', 'success');
                setResfresh(!resfresh);
                // window.location.reload();
            }
        });
    };

    const deleteProduct = async (id) => {
        await Products.deleteProduct(id);
    };

    const typeAction = () => {
        setUtilsData({
            title: 'Actulizar Producto',
            name_buttom: 'actulizar',
            action: true
        });
    };

    const handleEditProduct = (id) => {
        typeAction();
        const dataProduct = listProduct.filter((listUser) => listUser.id === Number(id));

        setProductData({
            id: dataProduct[0].id,
            name: dataProduct[0].name,
            description: dataProduct[0].description,
            price: dataProduct[0].price,
            image: dataProduct[0].image,
            stock: dataProduct[0].stock,
            category_id: dataProduct[0].category.id,
            subcategory_id: dataProduct[0].subcategory.id,
            brand_id: dataProduct[0].brand.id,
            images: dataProduct[0].images,
            weight: dataProduct[0].weight,
            source_id: dataProduct[0].source_products.id,
            type_material_id: dataProduct[0].type_materials[0].id,
            status: dataProduct[0].status
        });

        setIdProduct(id);
        // console.log('filtro po id productos', dataProduct[0].category);

        history('/Panel-Admin/actions-product');
    };

    // const handleFilterUser = (e) => {
    //     const filtro = listProduct.filter((listUser) => listUser.name.toLowerCase().includes(e.target.value.toLowerCase()));
    //     console.log('filtro', filtro, e.target.value, typeof filtro, typeof listUsers);
    //     setFiltertProduct(filtro);
    // };
    // console.log('listas de prodcutos', listProduct[0].images[0].images.image);
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
