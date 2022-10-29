import { Typography, Grid, Alert, Link } from '@mui/material';
import Count from '../Count';
import { ButtonPrimary } from '../stylesComponentsButton';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';

import { DataAdminContext } from '../../Context/ContextAdmin/DataProviderAdmin';
import { useContext, useState } from 'react';
import DetailsProductModal from '../DetailsProductModal';

import { DataContext } from '../../Context/DataProvider';
import Auth from '../../services/AuthServices';
const DetailsData = ({ dataProduct }) => {
    const { statusDisplay } = useContext(DataAdminContext);
    const { setOpenModalLogin } = useContext(DataContext);

    const [openModal, setOpenModal] = useState(false);
    const [amount, setAmount] = useState(1);

    const handleOpenModal = () => {
        if (!Auth.isAuthUser()) {
            return setOpenModalLogin(true);
        } else {
            setOpenModal(true);
        }
    };
    return (
        <Grid container spacing={3} p={3}>
            <DetailsProductModal openModal={openModal} dataProduct={dataProduct} setOpenModal={setOpenModal} amount={amount} />
            <Grid item xs={12}>
                <Typography variant="h6" text="secondary" color="initial" sx={{ fontWeight: 380, color: '#545454' }}>
                    {dataProduct.brand !== undefined && dataProduct.brand.name}
                </Typography>

                <Typography variant="h5" color="initial" sx={{ fontWeight: 400, color: '#404040' }}>
                    {dataProduct.name}
                </Typography>
            </Grid>
            <Grid item container xs={12} justifyContent="space-around" alignItems="center">
                <Grid item container xs={12} sm={6} md={6} xl={6} spacing={2.5}>
                    {/* <Grid item xs={12}>
                        <Typography variant="body2" color="initial">
                            Valoracion :
                        </Typography>
                        <Rating name="simple-controlled" size="small" value={4} sx={{ color: 'red' }} />
                    </Grid> */}

                    <Grid item xs={12}>
                        <Typography variant="h6" color="initial">
                            Stock:
                        </Typography>
                        <Typography
                            variant="h6"
                            borderRadius="5px"
                            border="1px solid #999999"
                            align="center"
                            color="initial"
                            bgcolor="#EEEEEE"
                            width="50px"
                        >
                            {dataProduct.stock}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" color="initial" sx={{ color: '#404040' }}>
                            Tipo de Entrega
                        </Typography>
                        <Typography variant="body1" color="initial" my={1} sx={{ color: '#5A5A5A ' }}>
                            <LocalShippingOutlinedIcon sx={{ color: '#909090  ' }} /> Despacho a Domicilio
                        </Typography>
                        <Typography variant="body2" color="initial" my={1} sx={{ color: '#5A5A5A ' }}>
                            <Link sx={{ cursor: 'pointer', fontWeight: 600 }}> Ver dias disponibles</Link>
                        </Typography>
                        <Typography variant="body1" color="initial" sx={{ color: '#5A5A5A ' }}>
                            <StorefrontOutlinedIcon sx={{ color: '#909090  ' }} />
                            Retiro en Tienda
                        </Typography>
                        <Typography variant="body2" color="initial" my={1} sx={{ color: '#5A5A5A ' }}>
                            <Link sx={{ cursor: 'pointer', fontWeight: 600 }}> Ver tiendas disponibles</Link>
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={6} md={6} xl={6} spacing={3} sx={{ position: 'relative' }}>
                    <Grid item xs={12}>
                        {/* <Box
                            variant="h5"
                            color="initial"
                            sx={{ position: 'relative', textDecoration: 'line-through', color: '#939393', fontWeight: 500, margin: '5px' }}
                        >
                            {dataProduct.price}{' '}
                            <LabelDiscount top={'0px'} left={'60px'}>
                                -20%
                            </LabelDiscount>
                        </Box> */}
                        <Typography variant="h5" color="initial">
                            {'PEN ' + dataProduct.price}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Alert severity="error" sx={{ position: 'absolute', width: '200px', right: -70, top: 70, display: statusDisplay }}>
                            Has superado el stock
                        </Alert>
                        <Typography variant="body2" color="initial">
                            Max 10 unidades
                        </Typography>
                        <Count stock={dataProduct.stock} setAmount={setAmount} />
                    </Grid>

                    <Grid item xs={12}>
                        <ButtonPrimary size={'large'} width_full={'100'} onClick={handleOpenModal}>
                            Add To Car
                        </ButtonPrimary>
                    </Grid>
                    {/* <Grid item xs={12}>
                        <ButtonPrimary
                            size={'large'}
                            width_full={'70'}
                            onClick={() => addProduct({ product_id: dataProduct.id, quantity: amount })}
                        >
                            buy
                        </ButtonPrimary>
                    </Grid> */}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DetailsData;
