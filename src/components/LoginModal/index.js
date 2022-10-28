import { Modal, Box, Grid, Typography, TextField, Link, Alert } from '@mui/material';
import { ButtonPrimary, ButtonOtline } from '../stylesComponentsButton';
import logo from '../../Images/bravasologo.png';
import logo_google from '../../Images/logo_google.png';

import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../Context/AuthContext';

import Auth from '../../services/AuthServices';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ openModal, setOpenModal }) => {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        // border: '1px rgba(202, 198, 198,0.4) solid ',
        borderRadius: '7px',
        // boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3
    };
    // const [values, setValues] = useState({
    //     amount: '',
    //     password: '',
    //     weight: '',
    //     weightRange: '',
    //     showPassword: false
    // });

    const imputPassword = useRef();
    const imputUsername = useRef();
    const [userCredentials, setUserCredentials] = useState({
        username: '',
        password: ''
    });
    const { authentication, setAuthentication } = useContext(AuthContext);
    const history = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.currentTarget;
        // setAuthentication({
        //   username:'paolo',
        //   password:'asdasd'
        // })
        setUserCredentials({
            ...userCredentials,
            [name]: value
        });
        // console.log(' user :', userCredentials.username);
        // console.log(' pass :', userCredentials.password);
    };
    const handleClose = () => {
        setAuthentication({
            ...authentication,
            isAuthenticated: null
        });
        imputPassword.current.value = '';
        imputUsername.current.value = '';
        setOpenModal(false);
    };

    const createUser = async (e) => {
        e.preventDefault();

        const response = await Auth.SignIn(userCredentials);
        // console.log('name username', userCredentials.name);
        console.log(response);
        if (response.status === 200) {
            localStorage.setItem('username', userCredentials.username);

            localStorage.setItem('token', response.data.access_token);

            setAuthentication({
                ...authentication,
                isAuthenticated: true,
                successMessage: 'Usuario logeando correactamente'
            });

            handleClose();
            Auth.isAuth ? (window.location.href = '/Panel-Admin/list-user') : window.location.reload();
        } else {
            setAuthentication({
                ...authentication,
                isAuthenticated: false,
                isError: true,
                errorMessage: 'Crendeciales incorrectos'
            });
        }
    };
    // const handleChange = (prop) => (event) => {
    //     setValues({ ...values, [prop]: event.target.value });
    // };

    // const handleClickShowPassword = () => {
    //     setValues({
    //         ...values,
    //         showPassword: !values.showPassword
    //     });
    // };

    // const handleMouseDownPassword = (event) => {
    //     event.preventDefault();
    // };

    const handleRegister = () => {
        const status = false;
        setOpenModal(status);
        history('/Registration-user');
    };
    return (
        <Modal open={openModal} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
            <Box sx={{ ...style, width: { xs: '100%', sm: '500px' }, height: { xs: '100%', sm: '550px' }, position: 'relative' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h5" color="initial">
                            Iniciar Sesion
                        </Typography>
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                        <Grid item>
                            <img src={logo} width="80px" alt="" />
                            <Typography variant="body1" color="initial">
                                __Bravaso__
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            size="small"
                            fullWidth
                            id="outlined-basic"
                            label="Correo"
                            variant="outlined"
                            onChange={handleInputChange}
                            name="username"
                            value={userCredentials.username}
                            ref={imputUsername}
                        />
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <TextField
                            size="small"
                            fullWidth
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            name="password"
                            value={userCredentials.password}
                            ref={imputPassword}
                            onChange={handleInputChange}
                        />
                        {/* <FormControl size="small" fullWidth variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={values.password}
                                onChange={() => {
                                    handleInputChange();
                                }}
                                ref={imputPassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl> */}
                    </Grid>
                    <Grid item>
                        <Link href="/" color="#6a5de3">
                            Has olvidado tu contraseña ?
                        </Link>
                    </Grid>
                    <Grid item xs={12}>
                        {authentication.isAuthenticated === false ? <Alert severity="error">{authentication.errorMessage}</Alert> : ''}
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <ButtonPrimary size={'large'} width_full={'100'} onClick={createUser}>
                            Iniciar Sesion
                        </ButtonPrimary>
                    </Grid>

                    <Grid item xs={12} sm={9}>
                        <ButtonOtline width_full={'100'}>
                            {' '}
                            <img width="25px" src={logo_google} alt="" />
                            <Typography variant="body2" color="initial" display="inline" px={1}>
                                Iniciar sesion con google
                            </Typography>
                        </ButtonOtline>
                    </Grid>
                    <Grid item container xs={12} justifyContent="center">
                        <Grid item>
                            <Typography onClick={handleRegister} color="#6a5de3" sx={{ fontSize: '15px', cursor: 'pointer' }}>
                                Registrarse ?
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography
                    variant="body1"
                    color="initial"
                    sx={{ position: 'absolute', top: '10px', right: '15px', cursor: 'pointer' }}
                    onClick={handleClose}
                >
                    X
                </Typography>
            </Box>
        </Modal>
    );
};
export default LoginModal;
