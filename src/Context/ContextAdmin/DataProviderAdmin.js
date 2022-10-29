import { createContext, useState } from 'react';
import Swal from 'sweetalert2';
export const DataAdminContext = createContext();

const DataProviderAdmin = ({ children }) => {
    const [idUser, setIdUser] = useState('');
    const [idProduct, setIdProduct] = useState('');
    const [openModalSource, setOpenModalSource] = useState(false);
    const [loading, setLoading] = useState({
        status: false,
        text: 'Creando Producto ...'
    });
    const [dataWarning, setDataWarning] = useState({
        warning: 'Has superado el limite de stock'
    });
    const [statusDisplay, setStatusDisplay] = useState('none');
    const [dataTypeMaterial, setDataTypeMaterial] = useState({
        name: '',
        id: 0,
        action_Create: true,
        action_name: 'Crear',
        title: 'Crear tipo material del producto'
    });
    const [dataSource, setDataSource] = useState({
        name: '',
        id: 0,
        action_Create: true,
        action_name: 'Crear',
        title: 'Crear origen del producto'
    });
    const [productsByPaginacion, setProductsByPaginacion] = useState({
        id_category: 1,
        id_subcategory: 1,
        id_brands: 0,
        price: 0,
        search: ' '
    });
    const [dataBrands, setDataBrands] = useState({
        id: null,
        title: '',
        name: '',
        update: true,
        name_button: 'Actulizar',
        description: ''
    });
    const [CategoriesDataUtils, setCategoriesDataUtils] = useState({
        id: null,
        name: '',
        title: 'Update',
        description: '',
        label: 'Categoria',
        update: true,
        categories: true,
        name_buttom: 'Actulizar',
        id_category: null
    });

    const [userData, setUserData] = useState({
        name: '',
        last_name: '',
        username: '',
        dni: '',
        email: '',
        rol_id: 0,
        status: true
    });

    const [productData, setProductData] = useState({
        name: '',
        description: '',
        price: 0,
        // image: null,
        stock: 0,
        category_id: 0,
        subcategory_id: 0,
        brand_id: 0,
        source_id: 0,
        weight: '',
        type_material_id: '',
        status: true
    });
    const [utilsData, setUtilsData] = useState({
        title: '',
        name_buttom: '',
        action: true
    });

    const handleDelete = (funtion) => {
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
                funtion();
                Swal.fire('Se ha Borrado', 'usuario eliminado', 'success');
                window.location.reload();
            }
        });
    };
    return (
        <DataAdminContext.Provider
            value={{
                userData,
                setUserData,
                idUser,
                setIdUser,
                utilsData,
                setUtilsData,
                productData,
                setProductData,
                idProduct,
                setIdProduct,
                CategoriesDataUtils,
                setCategoriesDataUtils,
                handleDelete,
                dataBrands,
                setDataBrands,
                statusDisplay,
                setStatusDisplay,
                productsByPaginacion,
                setProductsByPaginacion,
                loading,
                setLoading,
                openModalSource,
                setOpenModalSource,
                dataSource,
                setDataSource,
                dataTypeMaterial,
                setDataTypeMaterial
            }}
        >
            {children}
        </DataAdminContext.Provider>
    );
};
export default DataProviderAdmin;
