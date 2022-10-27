import { Grid, Container, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { ViewUserData, ViewListOptionsAccount, ViewCoupons } from '../../components';
import Auth from '../../services/AuthServices';
import User from '../../services/UserServices';

const MyAccount = () => {
    // const [viewComponent, setViewComponent] = useState([<ViewUserData />, <ViewCoupons />]);
    const [index, setIndex] = useState(0);
    const [hide, setHide] = useState(false);
    const [dataUser, setDataUser] = useState({});

    const getDataUser = async () => {
        const isAuthenticated = Auth.isAuthUser();
        if (!isAuthenticated) return (window.location.href = '/');
        const jsonPayload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        const response = await User.getUserById(jsonPayload.sub);
        // console.log('page_myacount', response);
        setDataUser(response);
        setHide(true);
    };

    useEffect(() => {
        getDataUser();
    }, []);
    return (
        <div>
            <Container>
                <Grid container spacing={1} mt={12}>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="initial">
                            {' '}
                            Mi Cuenta
                        </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {hide ? <ViewListOptionsAccount setIndex={setIndex} data={dataUser} /> : ''}
                    </Grid>
                    <Grid item xs={12} sm={8}>
                        {/* {viewComponent[index]} */}

                        {hide ? <ViewUserData data={dataUser ? dataUser : null} /> : ''}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default MyAccount;
