import Auth from './AuthServices';
import Services from './BaseServices';
const path = 'favorite';
const isAuthenticated = Auth.isAuthUser();

const listProductFavites = async () => {
    if (!isAuthenticated) return;
    return await Services.getList(path);
};

const CreateFavorite = async (id) => {
    if (!isAuthenticated) return;
    return await Services.createItem(path, { product_id: id });
};

const deleteFavorite = async (id) => {
    if (!isAuthenticated) return;
    return await Services.deleteItem(path, id);
};

const FavoriteProductServices = {
    listProductFavites,
    CreateFavorite,
    deleteFavorite
};
export default FavoriteProductServices;
