import { AppBar, Toolbar, Typography, Box, Button, Grid, IconButton, Drawer, Badge } from '@mui/material';

import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import { useState, useContext } from 'react';
import ListCategories from '../ListCategories';
import logo from '../../Images/bravasologo.png';
import LoginModal from '../LoginModal';
import { DataContext } from '../../Context/DataProvider';
import MenuList from '../MenuList';
import { useNavigate } from 'react-router-dom';

const NavBars = () => {
    const history = useNavigate();
    const { openBoxCategories, setOpenBoxCategories, openModalLogin, setOpenModalLogin, badgeShoppingCart, badgeFavorite } =
        useContext(DataContext);

    const [estado, setEstado] = useState(false);

    const Menu = () => {
        return (
            <Drawer anchor="right" open={openBoxCategories} onClose={() => setOpenBoxCategories(false)}>
                <Box mt={6} p={1} sx={{ width: '300px' }}>
                    <Typography variant="h6">Categories</Typography>

                    <ListCategories />
                </Box>
            </Drawer>
        );
    };

    const MenuLeft = () => {
        return (
            <Drawer anchor="left" open={estado} onClose={() => setEstado(false)}>
                <Box p={1} sx={{ width: '300px', height: '100%', background: '#EEEEEE' }}>
                    <MenuList />
                </Box>
            </Drawer>
        );
    };
    return (
        <Box>
            <LoginModal openModal={openModalLogin} setOpenModal={setOpenModalLogin} />
            <Menu />
            <MenuLeft />
            <AppBar sx={{ background: 'white', height: '70px' }}>
                <Toolbar>
                    <IconButton onClick={() => setEstado(true)}>
                        <MenuIcon sx={{ color: 'black' }} />
                    </IconButton>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Grid item>
                            <Typography conponent="div" variant="h6" sx={{ color: 'black', mx: 2, fontWeight: 300, cursor: 'pointer' }}>
                                <img src={logo} width="50px" alt="" onClick={() => history('/')} /> Bravaso
                            </Typography>
                        </Grid>
                        <Grid item>
                            <PersonOutlineOutlinedIcon
                                sx={{ color: '#6a5de3', cursor: 'pointer' }}
                                onClick={() => setOpenModalLogin(true)}
                            />
                            <Badge
                                badgeContent={badgeFavorite}
                                color="secondary"
                                // anchorOrigin={{
                                //     vertical: 'top',
                                //     horizontal: 'left'
                                // }}
                                sx={{ marginX: '10px' }}
                            >
                                <FavoriteBorderOutlinedIcon
                                    sx={{ color: '#6a5de3', cursor: 'pointer' }}
                                    onClick={() => history('/list-Favorites')}
                                />
                            </Badge>

                            <Badge badgeContent={badgeShoppingCart} color="secondary">
                                <ShoppingCartOutlinedIcon
                                    sx={{ color: '#6a5de3', cursor: 'pointer' }}
                                    onClick={() => history('/Shopping-Cart')}
                                />
                            </Badge>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
        </Box>
    );
};
export default NavBars;
