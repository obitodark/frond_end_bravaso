import { createContext, useState, useEffect, useContext } from 'react';

/*------------------------*/
import Brand from '../services/BrandsServices';
import Category from '../services/categoryServices';
import ProductsServices from '../services/ProductsServices';
import SourceProductServices from '../services/SourceProductServices';

import SubCategory from '../services/SubcategoryServices';
import TypeMaterialServices from '../services/typeMaterialServices';
import { DataAdminContext } from './ContextAdmin/DataProviderAdmin';

/*-----------------------------*/
export const DataContext = createContext();

const DataProvider = ({ children }) => {
    const { setProductsByPaginacion } = useContext(DataAdminContext);
    const [openModalLogin, setOpenModalLogin] = useState(false);
    const [idProduct, setIdProduct] = useState(0);
    /*------------------------------------------ */
    const [listProduct, setListProduct] = useState([]);
    const [filterProduct, setFiltertProduct] = useState([]);
    const [listBrands, setListBrands] = useState([]);
    const [filterBrands, setFilterBrands] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [listSubCategory, setListSubCategory] = useState([]);
    const [filterByProduct, setFilterByProduct] = useState([]);
    const [listSource, setListSource] = useState([]);
    const [bandera, setBandera] = useState(false);
    const [filterBySubCategory, setFilterBySubCategory] = useState([]);
    const [filterBySearch, setFilterBySearch] = useState([]);
    const [openBoxCategories, setOpenBoxCategories] = useState(false);
    const [resfresh, setResfresh] = useState(true);
    const [badgeShoppingCart, setBadgeShoppingCart] = useState(0);
    const [badgeFavorite, setBadgeFavorite] = useState(0);
    const [refreshCount, setRefreshCount] = useState(false);
    const [refreshBrands, setRefreshBrands] = useState(false);
    const [listTypeMaterial, setListTypeMaterial] = useState([]);
    const [refreshSource, setRefreshSource] = useState(true);
    // const [dataUser, setDataUser] = useState({});
    /*********************************** */
    const getListProduct = async () => {
        // setProductsByPaginacion({
        //     ...productsByPaginacion,
        //     id_category: 5,
        //     id_subcategory: 2
        // });
        const response = await ProductsServices.listProduct();
        const datas = await ProductsServices.filterProduct({
            id_category: 1,
            id_subcategory: 1,
            id_brands: 0,
            price: 0,
            search: ' ',
            page: 1,
            per_page: 3
        });

        // console.log('gagagagagag', datas);
        setFilterByProduct(datas);
        setListProduct(response);
        // setFiltertProduct(response);

        // setFilterBySearch(response);
    };
    const getListTypeMaterial = async () => {
        const response = await TypeMaterialServices.listTypeMaterial();
        setListTypeMaterial(response);
    };
    const getListSource = async () => {
        const response = await SourceProductServices.listSourceProduct();
        setListSource(response);
    };
    const getFilterProduct = async (data, page) => {
        const response = await ProductsServices.filterProduct(data, page);

        setProductsByPaginacion(data);
        // const dat = productData.images
        // .map((data) => {
        //     return data;
        // })
        // .filter((ima) => ima.images.status === true);
        // const filter = response.filter;
        // response.map((res, index) => {
        //     const dat = res.images
        //         .map((data) => {
        //             return data;
        //         })
        //         .filter((ima) => ima.images.status === true);
        //     console.log('data context', dat);
        // });
        await setFilterByProduct(response);
        // await setFilterBySubCategory(response);
    };
    const getListCategory = async () => {
        const response = await Category.listCategory();
        setListCategory(response);
        // console.log('categories', response);
    };
    const getSubCategory = async () => {
        const response = await SubCategory.listSubCategory();
        setListSubCategory(response);
    };
    const getListBrand = async () => {
        const response = await Brand.listBrand();
        setListBrands(response);
        setFilterBrands(response);
    };
    /*********************************** */

    useEffect(() => {
        getListProduct();
    }, [resfresh]);

    useEffect(() => {
        getListBrand();
    }, [refreshBrands]);

    useEffect(() => {
        getSubCategory();
    }, []);
    useEffect(() => {
        getListCategory();
    }, []);
    useEffect(() => {
        getListSource();
    }, [refreshSource]);
    useEffect(() => {
        getListTypeMaterial();
    }, [refreshSource]);

    return (
        <DataContext.Provider
            value={{
                setIdProduct,
                idProduct,

                openModalLogin,
                setOpenModalLogin,
                // asdasdasaasdasd
                listProduct,
                setListProduct,
                filterProduct,
                setFiltertProduct,
                listBrands,
                setListBrands,
                listCategory,
                setListCategory,
                listSubCategory,
                setListSubCategory,
                filterBrands,
                setFilterBrands,
                bandera,
                setBandera,
                filterByProduct,
                setFilterByProduct,
                filterBySubCategory,
                setFilterBySubCategory,
                filterBySearch,
                setFilterBySearch,
                getFilterProduct,
                openBoxCategories,
                setOpenBoxCategories,
                resfresh,
                setResfresh,
                badgeShoppingCart,
                setBadgeShoppingCart,
                badgeFavorite,
                setBadgeFavorite,
                refreshCount,
                setRefreshCount,
                refreshBrands,
                setRefreshBrands,
                listSource,
                setListSource,
                listTypeMaterial,
                refreshSource,
                setRefreshSource
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export default DataProvider;
