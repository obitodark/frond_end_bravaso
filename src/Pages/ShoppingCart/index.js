import { Typography, Container, Grid, Divider, Backdrop, CircularProgress } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { ViewCardShoppingBuy, ViewDetailsPrice } from '../../components';
import { DataContext } from '../../Context/DataProvider';
import ShoppingCartServices from '../../services/ShoppingCartServices';

const ShoppingCart = () => {
    const { bandera } = useContext(DataContext);
    const [hide, setHide] = useState('block');
    const [listShoppingCart, setListShoppingCart] = useState([]);
    const [listCart, setListCart] = useState([]);
    const [open, setOpen] = useState(false);
    const statusHide = () => {
        setHide(window.innerWidth < 900 ? 'none' : 'block');
    };
    window.addEventListener('resize', statusHide);

    const getListShopping = async () => {
        setOpen(true);
        const list = await ShoppingCartServices.listShoppingCart();
        const order = list.data.sort(function (a, b) {
            return a.id - b.id;
        });
        await setListCart(order);
        // console.log('orden de carrito de compras', order);
        await setListShoppingCart(list);
        setOpen(false);
    };

    useEffect(() => {
        getListShopping();
    }, [bandera]);
    return (
        <Container>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container mt={10} spacing={2}>
                <Grid item sm={12}>
                    <Typography variant="h5" color="initial">
                        Carrito de compras
                    </Typography>
                    <Typography variant="body1" color="initial" fontWeight={300}>
                        Inicio/Carrito de compras
                    </Typography>
                    <Divider color="black" />
                </Grid>
                <Grid item container xs={12} md={9} spacing={2}>
                    <Grid item xs={12}>
                        <ViewCardShoppingBuy listShoppingCart={listCart} />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <ViewCardShoppingBuy />
                    </Grid>
                    <Grid item xs={12}>
                        <ViewCardShoppingBuy />
                    </Grid> */}
                </Grid>
                <Grid item container xs={12} md={3}>
                    <Grid
                        mt={2.2}
                        item
                        xs={12}
                        sx={{
                            position: {
                                xs: 'fixed',
                                bottom: 0,
                                left: 0,
                                minWidth: '100%',

                                md: 'relative'
                            },
                            boxShadow: { xs: '0px -1px 3px  #888888 ', md: '0px 0px 0px black' }
                        }}
                    >
                        <ViewDetailsPrice hideText={hide} listShoppingCart={listShoppingCart} />
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
export default ShoppingCart;
