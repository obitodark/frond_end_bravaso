import { Modal, Box, Grid, Typography, TextField, Link, Alert, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import ShoppingCartServices from '../../services/ShoppingCartServices';
import { ButtonPrimary } from '../stylesComponentsButton';
import { DataContext } from '../../Context/DataProvider';
import { useContext } from 'react';
import Auth from '../../services/AuthServices';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '1px rgba(202, 198, 198,0.4) solid ',
    borderRadius: '7px',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3
};
const DetailsProductModal = ({ openModal, setOpenModal, dataProduct, amount }) => {
    const history = useNavigate();
    const { refreshCount, setRefreshCount } = useContext(DataContext);
    const handleClose = async () => {
        setRefreshCount(!refreshCount);
        await ShoppingCartServices.updateShoppingCart({ product_id: dataProduct.id, quantity: amount });
        // const data = response.data.total;
        // setBadgeShoppingCart(data);
        setOpenModal(false);
    };

    // const getCantProduct = async () => {
    //     let cant = 0;
    //     await ShoppingCartServices.updateShoppingCart({ product_id: dataProduct.id, quantity: amount });
    //     const listShoppingCart = await ShoppingCartServices.listShoppingCart();
    //     listShoppingCart.data.map((data) => (cant += data.quantity));
    //     return setBadgeShoppingCart(cant);
    // };
    const handleNavigateShopping = async () => {
        await ShoppingCartServices.updateShoppingCart({ product_id: dataProduct.id, quantity: amount });
        setRefreshCount(!refreshCount);
        // await ShoppingCartServices.updateShoppingCart({ product_id: dataProduct.id, quantity: amount });
        history('/Shopping-Cart');
    };
    return (
        <Modal
            open={openModal}
            // onClose={() => setOpenModal(false)}
            aria-labelledby="parent-modal-title"
            aria-describedby="parent-modal-description"
        >
            <Box sx={{ ...style, width: { xs: '100%', sm: '650px' }, height: { xs: '100%', sm: '330px' }, position: 'relative' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h6" fontWeight={300} color="">
                            Resumen
                        </Typography>
                        <Divider color="black" />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body1" fontWeight={300} color="">
                            Se agrego al carrito de compras
                        </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                        <Grid item xs={4}>
                            <img
                                width={150}
                                height={200}
                                src={dataProduct.images !== undefined ? dataProduct.images[0].images.image : ''}
                                alt=""
                            />
                        </Grid>
                        <Grid item xs={12} sm={8} my={1}>
                            <Typography variant="body1" color="initial">
                                {dataProduct.name}
                            </Typography>
                            <Typography variant="body1" color="initial" textTransform={'uppercase'}>
                                {dataProduct.brand !== undefined && dataProduct.brand.name}
                            </Typography>
                            <Typography variant="body1" color="initial">
                                {'Cantidad  :' + amount}
                            </Typography>
                            <Typography variant="body1" color="initial">
                                {'Price: PEN ' + dataProduct.price}
                            </Typography>
                            <Divider color="black" />
                            <Grid container item xs={12} spacing={2} mt={3}>
                                <Grid item>
                                    <ButtonPrimary
                                        size={'large'}
                                        fontSize="12px"
                                        font_size={'15px'}
                                        // width_full={'100'}
                                        onClick={handleNavigateShopping}
                                    >
                                        Ir al Carrito
                                    </ButtonPrimary>
                                </Grid>
                                <Grid item>
                                    <ButtonPrimary
                                        size={'large'}
                                        font_size={'15px'}
                                        // width_full={'100'}
                                        onClick={handleClose}
                                    >
                                        Segir comprando
                                    </ButtonPrimary>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={4}></Grid>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default DetailsProductModal;
