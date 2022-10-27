import { Grid, Container, Typography } from '@mui/material';
import { useState, useContext } from 'react';
import { useEffect } from 'react';
import CartProducts from '../../components/CartProducts';
// import Products from '../../components/Products';

import { DataContext } from '../../Context/DataProvider';
import FavoriteProductServices from '../../services/ProductFavoriteServices';

const styleText = {
    fontSize: { xs: '11px', sm: '14px' },
    whiteSpace: { xs: 'nowrap', sm: 'normal' },
    textOverflow: { xs: 'ellipsis', sm: 'clip' },
    overflow: { xs: 'hidden', sm: 'visible' }
};
const ListProductFavorite = () => {
    const [productFavorite, setProductFavorite] = useState([]);
    const { bandera } = useContext(DataContext);
    // useEffect(() => {
    //     list = FavoriteProductServices.ListProductFavorite();
    //     console.log('favoite', list);
    // }, []);
    // console.log('list', FavoriteProductServices.ListProductFavorite());

    const getlist = async () => {
        const response = await FavoriteProductServices.listProductFavites();
        setProductFavorite(response);
        console.log('list', response);
    };

    const addElement = (data) => {
        data.favo = 1;
    };
    useEffect(() => {
        getlist();
    }, [bandera]);

    return (
        <Container maxWidth="xl">
            <Grid container mt={20} spacing={2}>
                <Grid item xs={12} my={3}>
                    <Typography variant="h5" color="initial">
                        Lista de Productos Favoritos
                    </Typography>
                    <Typography variant="body1" color="initial" fontWeight={350}>
                        Inicio/Favorites ({productFavorite !== undefined ? productFavorite.length : 0})
                    </Typography>
                </Grid>
                <Grid item container xs={12} sm={12} md={9.5} xl={9.5} spacing={1.5}>
                    <Grid
                        item
                        container
                        // columns={{ xs: 12, sm: 20 }}

                        spacing={{ xs: 0.5, sm: 1.5 }}
                        sx={{ height: '100%' }}
                        justifyContent="start"
                    >
                        {productFavorite !== undefined ? (
                            productFavorite.map((data, index) => (
                                <Grid item key={index} xs={6} sm={4} md={3} xl={2.4}>
                                    {addElement(data.product)}
                                    <CartProducts data={data.product} styleText={styleText} />
                                </Grid>
                            ))
                        ) : (
                            <Typography variant="h5" color="initial" fontWeight={300} align="center" mb={10}>
                                No tiene productos favoritos
                            </Typography>
                        )}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
export default ListProductFavorite;
