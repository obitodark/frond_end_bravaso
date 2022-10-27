import { Backdrop, CircularProgress, Typography, Grid } from '@mui/material';
import { useState, useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import MenuLateral from '../components/Layout/AdminLayout/MenuLateral';
import { DataAdminContext } from '../Context/ContextAdmin/DataProviderAdmin';
import Auth from '../services/AuthServices';

const LayoutAdmin = () => {
    const isAuthenticated = Auth.isAuth();
    const { loading } = useContext(DataAdminContext);
    if (!isAuthenticated) return <Navigate to="/" />;
    return (
        <div>
            <Backdrop
                sx={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(3px)',
                    color: '#1D8AD6',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={loading.status}
                // onClick={() => setOpne(false)}
            >
                <Grid container justifyContent="center" alignContent={'center'} flexDirection={'column'}>
                    <Grid container item justifyContent={'center'}>
                        <CircularProgress color="inherit" />
                    </Grid>
                    <Grid item container justifyContent={'center'}>
                        <Typography variant="h6" color="#1D8AD6">
                            {loading.text}
                        </Typography>
                    </Grid>
                </Grid>
            </Backdrop>
            <MenuLateral>
                <Outlet />
            </MenuLateral>
        </div>
    );
};
export default LayoutAdmin;
