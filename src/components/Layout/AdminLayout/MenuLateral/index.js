import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { Avatar, ListItemText, ListItemIcon, ListItemButton, Grid } from '@mui/material';
import { useState } from 'react';
import SourceIcon from '@mui/icons-material/Source';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import Auth from '../../../../services/AuthServices';
import { useNavigate } from 'react-router-dom';
import logo from '../../../../Images/bravasologo.png';
import User from '../../../../services/UserServices';
import { useEffect } from 'react';
import './css.css';
const drawerWidth = 290;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginLeft: 0
    })
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
}));
const styleText = {
    color: '#999999',
    border: '5px solid #1E1E1E',
    background: '#1E1E1E',
    ':hover': {
        color: 'white',
        borderStyle: 'hiden solid hiden hiden',
        background: '#282828',

        borderRightColor: ' #0B75B1'
        // borderWidth: '0px 5px 0px 0px',
    }
};
const styleArrow = {
    color: 'white',
    backgroundColor: '#3761E9',
    borderRadius: ' 50%'
};

export default function MenuLateral({ children }) {
    const [dataUser, setDataUser] = useState({});
    const history = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const getDataUser = async () => {
        const jsonPayload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        const response = await User.getUserById(jsonPayload.sub);
        console.log('page_admin', response);
        setDataUser(response);
        // setHide(true);
    };
    useEffect(() => {
        getDataUser();
    }, []);
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open} sx={{ backgroundColor: 'white', border: 'none', boxShadow: 'none', height: '70px' }}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, ...(open && { display: 'none' }) }}
                    >
                        <MenuIcon sx={{ color: 'black' }} />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div" color="black">
                        Panel Admin
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box'
                    }
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                <DrawerHeader sx={{ background: '#1E1E1E', border: 'none' }}>
                    <Box
                        width="100%"
                        height={theme.spacing(20)}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Avatar sx={{ height: '55px', width: '55px' }} src={logo} />
                        <Grid mx={2}>
                            <Typography variant="h6" color={'white'}>
                                Bravaso
                            </Typography>
                        </Grid>
                    </Box>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon sx={styleArrow} /> : <ChevronRightIcon sx={{ styleArrow }} />}
                    </IconButton>
                </DrawerHeader>

                <Box sx={{ background: '#1E1E1E', height: '100%', color: '#999999' }}>
                    <Box
                        width="100%"
                        height={theme.spacing(20)}
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <Avatar
                            sx={{ height: '60px', width: '60px', border: '2px solid #3E99F5 ' }}
                            src={'https://www.estudioluzmadera.com/wp-content/uploads/2021/10/DSC06156-e1633676889674.png'}
                            // src={
                            //     dataUser.imagesUser !== undefined
                            //         ? dataUser.imagesUser[0].images.image
                            //         : 'https://www.drakonball.com/wp-content/uploads/2022/02/habilidades-de-saitama.jpg'
                            // }
                        />
                        <Grid mx={2}>
                            <Typography variant="body1" color={'white'}>
                                {dataUser.name}
                            </Typography>
                            <Typography variant="body2" color={'#999999'}>
                                Administrador
                            </Typography>
                        </Grid>
                    </Box>
                    {/* <Divider sx={{ background: '#324C66' }} /> */}

                    <Box flex={1}>
                        <List component="nav">
                            <ListItemButton onClick={() => history('/Panel-Admin/list-user')} sx={styleText}>
                                <ListItemIcon>
                                    <PermIdentityIcon sx={{ marginLeft: '20px', fontSize: '20px', color: '#999999' }} />
                                </ListItemIcon>
                                <ListItemText primary="usuarios" />
                            </ListItemButton>

                            <ListItemButton onClick={() => history('/Panel-Admin/list-product')} sx={styleText}>
                                <ListItemIcon>
                                    <Inventory2OutlinedIcon sx={{ marginLeft: '20px', fontSize: '18px', color: '#999999' }} />
                                </ListItemIcon>
                                <ListItemText primary="Productos" />
                            </ListItemButton>

                            <ListItemButton onClick={() => history('/Panel-Admin/list-categories')} sx={styleText}>
                                <ListItemIcon>
                                    <CategoryOutlinedIcon sx={{ marginLeft: '20px', fontSize: '20px', color: '#999999' }} />
                                </ListItemIcon>
                                <ListItemText primary="Categorias" />
                            </ListItemButton>

                            <ListItemButton onClick={() => history('/Panel-Admin/list-brands')} sx={styleText}>
                                <ListItemIcon>
                                    <BarChartOutlinedIcon sx={{ marginLeft: '20px', fontSize: '20px', color: '#999999' }} />
                                </ListItemIcon>
                                <ListItemText primary="Brands" />
                            </ListItemButton>
                            <ListItemButton onClick={() => history('/Panel-Admin/list-source')} sx={styleText}>
                                <ListItemIcon>
                                    <BarChartOutlinedIcon sx={{ marginLeft: '20px', fontSize: '20px', color: '#999999' }} />
                                </ListItemIcon>
                                <ListItemText primary="Origen" />
                            </ListItemButton>

                            <ListItemButton onClick={() => history('/Panel-Admin/list-type-material')} sx={styleText}>
                                <ListItemIcon>
                                    <SourceIcon sx={{ marginLeft: '20px', fontSize: '20px', color: '#999999' }} />
                                </ListItemIcon>
                                <ListItemText primary="Type Material" />
                            </ListItemButton>
                        </List>
                        <Box mt={25}>
                            <List>
                                <ListItemButton onClick={() => Auth.SignOut()}>
                                    <Typography
                                        sx={{
                                            background: '#3761E9',
                                            color: 'white',
                                            width: '85%',
                                            marginLeft: '7%',
                                            padding: '7px',
                                            borderRadius: '7px',
                                            ':hover': {
                                                background: '#0B75B1'
                                            }
                                        }}
                                        align="center"
                                        variant="body1"
                                        color="inherit"
                                    >
                                        Exit
                                    </Typography>
                                </ListItemButton>
                            </List>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
            <Main open={open}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}
