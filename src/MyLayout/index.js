import { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { ViewNavBars, ViewFooter } from '../components';
import { DataContext } from '../Context/DataProvider';
import Auth from '../services/AuthServices';
import FavoriteProductServices from '../services/ProductFavoriteServices';
import ShoppingCartServices from '../services/ShoppingCartServices';

const MyLayout = () => {
    const { setBadgeShoppingCart, setBadgeFavorite, refreshCount } = useContext(DataContext);
    const getCantProduct = async () => {
        if (Auth.isAuthUser()) {
            let cant = 0;
            const listShoppingCart = await ShoppingCartServices.listShoppingCart();
            const lisFavorites = await FavoriteProductServices.listProductFavites();

            listShoppingCart.data.map((data) => (cant += data.quantity));
            setBadgeFavorite(lisFavorites.length);
            console.log('total favorite', lisFavorites.length);
            setBadgeShoppingCart(cant);
        }
    };

    useEffect(() => {
        getCantProduct();
    }, [refreshCount]);
    return (
        <div>
            <ViewNavBars />
            <Outlet />
            <ViewFooter />
        </div>
    );
};
export default MyLayout;
