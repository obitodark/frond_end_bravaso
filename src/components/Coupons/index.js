import { Typography, Box, Grid, Card, CardContent, CardActions, Button } from '@mui/material';

import { Container } from 'react-bootstrap';
import logo from '../../Images/bravasologo.png';

const Coupons = () => {
    return (
        <Container maxwidth="xl">
            <Box sx={{ backgroundColor: 'white', height: '80vh' }} p={2}>
                <Grid container spacing={2} justifyContent="start">
                    <Grid item xs={12}>
                        <Typography variant="h6" color="initial">
                            Mis Copones
                        </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                        <Grid item>
                            <Typography variant="h6" color="initial" sx={{ fontWeight: 350 }}>
                                Cupones disponibles
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={10} sm={4} mx={2}>
                        <Card
                            elevation={8}
                            sx={{
                                minWidth: 275,
                                borderRadius: 5,
                                background: 'linear-gradient(309deg, rgba(228,96,133,1) 35%, rgba(122,122,224,1) 100%)'
                            }}
                        >
                            <CardContent>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography sx={{ fontSize: 28, fontWeight: 300 }} color="white">
                                            Coupons
                                        </Typography>
                                        {/* <Typography variant="h5" component="div"></Typography> */}
                                        <Typography variant="h4" sx={{ mb: 1.5, display: 'inline', fontWeight: 900 }} color="#F8D62C">
                                            20%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <img src={logo} width="60px" alt="" />
                                        <Typography variant="h6" color="white">
                                            Bravaso
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item container>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" color="white">
                                            CODE:
                                            <br />
                                            {'"PRIMARY_BUY"'}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="body2" sx={{ fontWeight: 900 }} color="black">
                                            20/10/2020 - 20/12/2020
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Coupons;
