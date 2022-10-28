import { Card, Box, CardContent, Typography, IconButton, CardMedia, Alert, Grid, Button } from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
// import { DataContext } from '../../Context/DataProvider';
import { useContext } from 'react';

import Count from '../Count';

import ShoppingCartServices from '../../services/ShoppingCartServices';
import { DataAdminContext } from '../../Context/ContextAdmin/DataProviderAdmin';
import { DataContext } from '../../Context/DataProvider';
import { useNavigate } from 'react-router-dom';

const CardShoppingBuy = ({ listShoppingCart }) => {
    const history = useNavigate();
    const { setIdProduct, bandera, setBandera, setBadgeShoppingCart } = useContext(DataContext);
    const { statusDisplay } = useContext(DataAdminContext);
    const styleText = {
        fontSize: { xs: '14px', md: '18px' },
        whiteSpace: 'nowrap',
        textOverflow: 'ellipsis',
        overflow: 'hidden'
    };

    const EmptyCart = () => {
        return (
            <Grid>
                <Typography variant="h5" color="initial" my={2} fontWeight={300}>
                    {' '}
                    No tienes Produtos en el carro
                </Typography>
                <Button onClick={() => history('/')} variant="contained">
                    {' '}
                    Ir Comprar
                </Button>
            </Grid>
        );
    };

    const handleNavigateDetails = (id) => {
        setIdProduct(id);
        history('/Details-Product');
    };

    const getCantProduct = async () => {
        let cant = 0;
        const listShoppingCart = await ShoppingCartServices.listShoppingCart();
        listShoppingCart.data.map((data) => (cant += data.quantity));
        return setBadgeShoppingCart(cant);
    };
    const deleteProductCart = async (id) => {
        await ShoppingCartServices.deleteShoppingCart(id);
        getCantProduct();
        setBandera(!bandera);
    };

    return (
        <div>
            {/* {console.log('shopping', listShoppingCart.data)} */}
            {listShoppingCart.length > 0 ? (
                listShoppingCart.map((list, index) => (
                    <Card key={index} sx={{ display: 'flex', position: 'relative', margin: '20px 0px', border: 'none', boxShadow: 'none' }}>
                        <CardMedia
                            component="img"
                            sx={{ width: { xs: 80, sm: 151 }, height: { xs: 80, sm: 151 }, cursor: 'pointer' }}
                            image={list.product.images !== undefined && list.product.images[0].images.image}
                            alt="Live from space album cover"
                            onClick={() => handleNavigateDetails(list.product.id)}
                        />
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            <CardContent sx={{ flex: '1 0 auto' }}>
                                <Typography component="div" sx={styleText}>
                                    {list.product.name}
                                </Typography>
                                <Typography color="text.secondary" component="div" sx={{ fontSize: { xs: '14px', md: '17px' } }}>
                                    {list.product.brand.name}
                                </Typography>
                                {/* <Typography color="text.secondary" component="div" sx={{ fontSize: { xs: '14px', md: '17px' } }}>
                                    size_30
                                </Typography> */}
                                <Typography color="text.secondary" component="div" sx={{ fontSize: { xs: '14px', md: '17px' } }}>
                                    {'PEN ' + list.product.price}
                                </Typography>
                                {/* <Typography color="text.secondary" component="div" sx={{ fontSize: { xs: '14px', md: '17px' } }}>
                                    {'PEN ' + list.quantity}
                                </Typography> */}
                            </CardContent>
                        </Box>
                        <Alert severity="error" sx={{ position: 'absolute', width: '200px', right: 5, top: 30, display: statusDisplay }}>
                            Has superado el stock
                        </Alert>
                        <Typography color="text.secondary" sx={{ position: 'absolute', top: 5, right: 5 }}>
                            <ClearIcon sx={{ fontSize: '18px', cursor: 'pointer' }} onClick={() => deleteProductCart(list.product.id)} />
                        </Typography>
                        <Box variant="body1" color="text.secondary" sx={{ position: 'absolute', top: '60%', right: 5 }}>
                            <Count
                                stock={list.product.stock}
                                cant={list.quantity}
                                id={list.product.id}
                                sx={{ position: 'absolute', top: '60%', right: 5 }}
                            />
                        </Box>
                    </Card>
                ))
            ) : (
                <EmptyCart />
            )}
        </div>
    );
};

export default CardShoppingBuy;
