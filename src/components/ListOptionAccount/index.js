import { Avatar, Typography, ListItemIcon, Grid, ListItemText, ListItemButton, List, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
// import { useState } from 'react';

const ListOptionAccount = ({ setIndex, data }) => {
    const handleClose = () => {
        window.localStorage.removeItem('token');
        window.location.href = '/';
    };
    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} container bgcolor="white" py={3} borderRadius="10px">
                    <Grid container item xs={6} justifyContent="end">
                        <Grid item>
                            <Avatar
                                sx={{ height: '70px', width: '70px', border: '2px solid #8E5DF0 ' }}
                                src={
                                    data.imagesUser[0] !== undefined
                                        ? data.imagesUser[0].images.image
                                        : 'https://acl.global/wp-content/uploads/2021/08/icono-gris-de-perfil-usuario-simbolo-empleado-avatar-web-y-diseno-ilustracion-signo-aislado-en-fondo-blanco-191067342-thegem-person-160.jpg'
                                }
                            />
                        </Grid>
                    </Grid>

                    <Grid container item xs={4} mx={2} sx={{ justifyContent: 'center', alignContent: 'start' }}>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="initial" sx={{ fontWeight: 300 }}>
                                HOLA !
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" color="initial" sx={{ fontWeight: 400 }}>
                                {data.name}
                                {console.log('name', data.name)}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item bgcolor="white" mt={2.5} mb={2} xs={12} borderRadius="10px">
                    <List component="nav" aria-label="main mailbox folders">
                        <ListItemButton onClick={() => setIndex(0)}>
                            <ListItemIcon>
                                <AccountCircleOutlinedIcon sx={{ marginLeft: '20px', fontSize: '20px' }} />
                            </ListItemIcon>
                            <ListItemText primary="Mi Datos Personales" />
                        </ListItemButton>
                        <ListItemButton onClick={() => setIndex(1)}>
                            <ListItemIcon>
                                <DiscountOutlinedIcon sx={{ marginLeft: '20px', fontSize: '20px' }} />
                            </ListItemIcon>
                            <ListItemText primary="Cupones" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <CreditCardOutlinedIcon sx={{ marginLeft: '20px', fontSize: '18px' }} />
                            </ListItemIcon>
                            <ListItemText primary="Medios de Pagos" />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <LocalShippingOutlinedIcon sx={{ marginLeft: '20px', fontSize: '20px' }} />
                            </ListItemIcon>
                            <ListItemText primary="Mis Pedidos" />
                        </ListItemButton>
                        <ListItemButton onClick={handleClose}>
                            <ListItemIcon>
                                <CloseIcon sx={{ marginLeft: '20px', fontSize: '20px' }} />
                            </ListItemIcon>
                            <ListItemText primary="Cerrar Sesion" />
                        </ListItemButton>
                    </List>
                </Grid>
            </Grid>
        </Box>
    );
};
export default ListOptionAccount;
