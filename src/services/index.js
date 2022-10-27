const api_Store = 'https://bravaso.000webhostapp.com/data.json';

const listProducts = async () => {
    try {
        const response = await fetch(api_Store);
        const data = await response.json();
        return data.Article;
    } catch (error) {
        console.log(error);
    }
};

const ListCategories = async () => {
    try {
        const response = await fetch(api_Store);
        const data = await response.json();
        return data.categories;
    } catch (error) {
        console.log(error);
    }
};

const ListSubcategories = async () => {
    try {
        // const array = [];
        const response = await fetch(api_Store);
        const data = await response.json();
        // data.subcategories.map((ga) => {
        //     return array.push(ga.sub);
        // });
        return data.subcategories;
    } catch (error) {
        console.log(error);
    }
};

const getFiltroProduct = async (subcategories, idcategoria) => {
    try {
        const response = await fetch(api_Store);
        const data = await response.json();

        const array = data.Article.filter(
            (data) => data.nameSubSubcategories === subcategories && Number(data.categoryId) === Number(idcategoria)
        );
        return array;
    } catch (error) {}
};

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
// const getBrandProduct= async ()=>{

//     try {
//  const response = await fetch(api_Storeductos);
//   const data=await response.json();

//  const  array= (data.map(data=>{return data.brand})).filter( onlyUnique );

//   return array

//     } catch (error) {
//         console.log()

//     }
// }

const getBrand = async (name, idcategoria) => {
    try {
        const respose = await fetch(api_Store);
        const data = await respose.json();
        if (name === undefined) {
            const arrays = data.Article.map((data) => {
                return data.brand;
            });
            return arrays.filter(onlyUnique);
        }
        const arrays = data.Article.filter((data) => data.nameSubSubcategories === name && Number(data.categoryId) === Number(idcategoria));
        const brand = arrays.map((array) => {
            return array.brand;
        });

        return brand.filter(onlyUnique);
    } catch (error) {
        return error;
    }
};

const getProductForBrand = async (brand, idcategoria, namesubcategoria) => {
    try {
        const response = await fetch(api_Store);
        const data = await response.json();

        if (idcategoria === undefined || namesubcategoria === '') {
            const arrays = data.Article.filter((array) => array.brand === brand);
            console.log('datos undefine');
            return arrays;
        }
        const arrays = data.Article.filter((array) => array.brand === brand && Number(array.categoryId) === Number(idcategoria));
        const all = data.Article.filter(
            (array) => Number(array.categoryId) === Number(idcategoria) && array.nameSubSubcategories === namesubcategoria
        );
        return brand === 'Marca-All' ? all : arrays;
    } catch (error) {
        return error;
    }
};

const getOrderPrice = async (value, nombresubcategoria, idcategoria) => {
    try {
        let order = null;
        const response = await fetch(api_Store);
        const data = await response.json();

        const array = data.Article.filter(
            (data) => data.nameSubSubcategories === nombresubcategoria && Number(data.subcategoriesId) === Number(idcategoria)
        );

        if (value === 'menor') {
            order = array.sort(function (a, b) {
                return (
                    (a.discount === 0 ? a.price_off : createDescont(a.price_off, a.discount)) -
                    (b.discount === 0 ? b.price_off : createDescont(b.price_off, b.discount))
                );
            });
        }

        if (value === 'mayor') {
            order = array.sort(function (a, b) {
                return (
                    (b.discount === 0 ? b.price_off : createDescont(b.price_off, b.discount)) -
                    (a.discount === 0 ? a.price_off : createDescont(a.price_off, a.discount))
                );
            });
        }

        if (value === 'destacado') {
            order = array.sort(function (a, b) {
                return b.stars - a.stars;
            });
        }
        if (value === 'ordenar') {
            return array;
        }

        return order;
    } catch (error) {
        console.log(error);
    }
};

function createDescont(price, discount) {
    return (price - price * (discount / 100)).toFixed(2);
}

async function getSearchProduct(name) {
    try {
        const reponse = await fetch(api_Store);
        const data = await reponse.json();
        const search = data.Article.filter(
            (filtro) => filtro.name.toLowerCase().includes(name.toLowerCase()) || filtro.brand.toLowerCase().includes(name.toLowerCase())
        );
        return search;
    } catch (error) {
        return error;
    }
}

const StoreApi = {
    listProducts,
    ListCategories,
    ListSubcategories,
    getFiltroProduct,
    getOrderPrice,
    getBrand,
    getProductForBrand,
    getSearchProduct
};
export default StoreApi;
