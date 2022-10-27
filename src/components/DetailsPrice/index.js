import { Card, CardContent, Typography, Grid, CardActions, Box, Button } from '@mui/material';
import OrderServices from '../../services/OrderServices';
import { ButtonPrimary } from '../stylesComponentsButton';

const DetailsPrice = ({ hideText, listShoppingCart }) => {
    const text = {
        display: hideText
    };
    const getCantProduct = () => {
        let cant = 0;
        listShoppingCart.data.map((data) => (cant += data.quantity));
        return cant;
    };
    const handleToPay = async () => {
        const response = await OrderServices.createOrdern();
        window.open(response.checkout_url, '_blank');
    };
    return (
        <Box>
            {listShoppingCart.prices !== undefined && (
                <Card>
                    <CardContent sx={text}>
                        <Typography gutterBottom variant="h5" component="div">
                            Resumen
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Orden de pedido
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Cantidad:{getCantProduct()}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Subtotal: {listShoppingCart.prices.subtotal.toFixed(2)}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Igv: {listShoppingCart.prices.igv}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Grid container p={1} justifyContent="Center">
                            <Grid item>
                                <Typography color="text.secondary" sx={{ fontSize: '18px', fontWeight: 'bold' }} p={0.5}>
                                    Total: PEN {listShoppingCart.prices.total}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <ButtonPrimary size={'large'} width_full={'100'} onClick={handleToPay}>
                                    Pagar
                                </ButtonPrimary>
                            </Grid>
                        </Grid>
                    </CardActions>
                </Card>
            )}
        </Box>
    );
};
export default DetailsPrice;
