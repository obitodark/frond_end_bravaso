import { Container, Grid, Typography, TextField, Divider, FormControl, InputLabel, Input, Button } from '@mui/material';
import { ButtonPrimary, ButtonOtline } from '../stylesComponentsButton';
import logo_google from '../../Images/logo_google.png';
import { DataAdminContext } from '../../Context/ContextAdmin/DataProviderAdmin';
import { useContext } from 'react';
import User from '../../services/UserServices';
import { useState } from 'react';
import Swal from 'sweetalert2';

const RegistrationUser = () => {
    const { userData, setUserData } = useContext(DataAdminContext);
    const [getStatusUsername, setStatusUsername] = useState(200);
    const [getStatusEmail, setStatusEmail] = useState(200);
    const [getStatusDni, setStatusDni] = useState(200);
    const handleInputChange = (e) => {
        const { name, value } = e.currentTarget;

        setUserData({
            ...userData,
            [name]: value
        });
    };

    const handleCreateUsers = async (e) => {
        e.preventDefault();
        // console.log('dataos de registro', userData);
        // await User.createUser(userData);
        const username = await User.validateUsername(userData.username);
        const email = await User.validateEmail(userData.email);
        const dni = await User.validateDni(userData.dni);
        await setStatusEmail(email);
        await setStatusUsername(username);
        await setStatusDni(dni);
        if (username === 200 && email === 200 && dni === 200) {
            await User.createUser(userData);
            await Swal.fire({
                position: 'center',
                icon: 'success',

                title: 'Registro Exitoso',
                showConfirmButton: false,
                timer: 2000
            });
            window.location.reload();
        }
        // if (response.ok) {
        //     console.log('d noisponbel');
        // } else console.log('disponible');
        // setStatus(response);
        // console.log(response);
    };

    return (
        <Container>
            <Grid container justifyContent="center">
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    xl={5}
                    container
                    spacing={2}
                    // sx={{ border: '1px solid black', borderRadius: '15px' }}
                    p={2}
                    justifyContent="center"
                >
                    <Grid item xs={7} my={3}>
                        <Typography variant="h5" color="initial" align="left">
                            Registro de usuario
                        </Typography>
                    </Grid>

                    <form action="" onSubmit={handleCreateUsers}>
                        <Grid item container xs={12} spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    size={'small'}
                                    fullWidth
                                    id="outlined-basic"
                                    label="Nombres*"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    name="name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    size={'small'}
                                    fullWidth
                                    id="outlined-basic"
                                    label="Apellidos*"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    name="last_name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    size={'small'}
                                    fullWidth
                                    id="outlined-basic"
                                    label="Username"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    name="username"
                                    error={getStatusUsername === 200 ? false : true}
                                    helperText={getStatusUsername === 200 ? '' : 'El username ya existe.. , eliga otra'}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    size={'small'}
                                    fullWidth
                                    type="number"
                                    id="outlined-basic"
                                    label="Dni"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    name="dni"
                                    error={getStatusDni === 200 ? false : true}
                                    helperText={getStatusDni === 200 ? '' : 'El dni ya esta en uso.. , eliga otra'}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    size={'small'}
                                    fullWidth
                                    id="outlined-basic"
                                    label="Email"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    name="email"
                                    error={getStatusEmail === 200 ? false : true}
                                    helperText={getStatusEmail === 200 ? '' : 'El Email ya esta Registrado , eliga otra'}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    required
                                    size={'small'}
                                    fullWidth
                                    id="outlined-basic"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    name="password"
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <Typography variant="body2" color="initial">
                                    Comfirmacion de Password
                                </Typography>
                            </Grid> */}
                            {/* <Grid item xs={12}>
                                <TextField
                                    required
                                    size={'small'}
                                    fullWidth
                                    id="outlined-basic"
                                    type="password"
                                    label="Password"
                                    variant="outlined"
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <ButtonPrimary type="submit" size={'large'} width_full={'100'}>
                                    Completar Registro
                                </ButtonPrimary>
                            </Grid>
                        </Grid>
                    </form>

                    <Grid item xs={12} my={2}>
                        <Divider sx={{ backgroundColor: 'black' }} />
                        <Typography textAlign="center" variant="body1" color="initial" p={1}>
                            {' '}
                            Ingresa con
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ButtonOtline width_full={'100'}>
                            {' '}
                            <img width="25px" src={logo_google} alt="" />
                            <Typography variant="body2" color="initial" display="inline" px={1}>
                                Iniciar sesion con google
                            </Typography>
                        </ButtonOtline>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};
export default RegistrationUser;
