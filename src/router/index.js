import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {
    PageDetailsProduct,
    PageListProduct,
    PageShoppingCart,
    PageRegitrationUser,
    PageAdminListUser,
    PageMyAccount,
    PageAdminProduct,
    PageAdminListCategories,
    PageAdminListBrands,
    PageListProductFavorites,
    PageActionProduct,
    PageAdminSource,
    PageAdminTypeMaterial
} from '../Pages';
import MyLayout from '../MyLayout';

import LayoutAdmin from '../LayoutAdmin';
// import MenuLateral from '../components/Layout/AdminLayout/MenuLateral';
const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MyLayout />}>
                    <Route path="/Registration-user" element={<PageRegitrationUser />} />
                    <Route path="/list-Favorites" element={<PageListProductFavorites />} />
                    <Route path="/Details-Product" element={<PageDetailsProduct />} />
                    <Route path="/Shopping-Cart" element={<PageShoppingCart />} />
                    <Route path="/My-Account" element={<PageMyAccount />} />
                    <Route path="/" element={<PageListProduct />} />
                </Route>
                <Route path="/Panel-Admin" element={<LayoutAdmin />}>
                    <Route index path="list-user" element={<PageAdminListUser />} />
                    <Route index path="list-product" element={<PageAdminProduct />} />
                    <Route index path="list-categories" element={<PageAdminListCategories />} />
                    <Route index path="list-brands" element={<PageAdminListBrands />} />
                    <Route index path="actions-product" element={<PageActionProduct />} />
                    <Route index path="list-source" element={<PageAdminSource />} />
                    <Route index path="list-type-material" element={<PageAdminTypeMaterial />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};
export default Router;
