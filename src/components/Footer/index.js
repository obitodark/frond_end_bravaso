import { Container, Box } from '@mui/material';
import { Grid, Link, Typography } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import SubscriptionsRoundedIcon from '@mui/icons-material/SubscriptionsRounded';
import WhatsappRoundedIcon from '@mui/icons-material/WhatsappRounded';

import logo from '../../Images/bravasologo.png';

const Footer = () => {
    const categories = ['Moda Hombre', 'Moda mujer', 'Computo', 'Tv y Audio', 'ElectroHogar', 'DecoHogar'];
    const pages = ['Home', 'Login', 'RegistroUsuarios', 'ListaProductos', 'DetalleProductos', 'ListaFavoritos', 'CarroCompra'];
    const Icons = [
        <WhatsappRoundedIcon sx={{ color: '#DEDEDE ' }} />,
        <SubscriptionsRoundedIcon sx={{ color: '#DEDEDE ' }} />,
        <FacebookIcon sx={{ color: '#DEDEDE ' }} />
    ];
    return (
        <footer>
            <Box px={{ xs: 3, sm: 10 }} py={{ xs: 5, sm: 10 }} mt={10} sx={{ background: '#33373E' }}>
                <Container maxWidth="lg">
                    <Grid container spacing={5} justifyContent="center" alignItems="center">
                        <Grid item container xs={12} sm={3} alignItems="center">
                            <Grid item>
                                <img src={logo} alt="" width="60px" />
                            </Grid>
                            <Grid item>
                                {' '}
                                <Typography variant="h5" sx={{ fontWeight: 300 }} color="#EEEEEE">
                                    Bravaso Shop
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1} color="#C7C7C7 " mb={2}>
                                <Typography variant="h5" color="white">
                                    Categorias
                                </Typography>
                            </Box>

                            {categories.map((category, index) => (
                                <Box key={index}>
                                    <Link href="/" color="#BFBFBF" sx={{ textDecoration: 'none' }}>
                                        {category}
                                    </Link>
                                </Box>
                            ))}
                        </Grid>

                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1} color="#BFBFBF" mb={2}>
                                <Typography variant="h5" color="white" p={1}>
                                    Pages
                                </Typography>
                            </Box>

                            {pages.map((page, index) => (
                                <Box key={index}>
                                    <Link href="/" color="#BFBFBF" sx={{ textDecoration: 'none' }}>
                                        {page}
                                    </Link>
                                </Box>
                            ))}
                        </Grid>
                        <Grid item container xs={12} sm={3}>
                            {Icons.map((icon, index) => (
                                <Grid item xs={3} key={index}>
                                    <Link href="/" color="#DEDEDE">
                                        {icon}
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }} color="#EEEEEE">
                        Proyecto de Ventas Bravazo &reg; {new Date().getFullYear()}
                    </Box>
                </Container>
            </Box>
        </footer>
    );
};

export default Footer;
