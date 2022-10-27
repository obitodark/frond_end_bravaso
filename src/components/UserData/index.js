import { Typography, Box, Grid, TextField, Button, Backdrop, CircularProgress } from '@mui/material';

import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';

import ImagesServices from '../../services/imagesServices';
import ImagesUserServices from '../../services/ImagesUser';
import User from '../../services/UserServices';

import { ButtonPrimary } from '../stylesComponentsButton';

const UserData = ({ data }) => {
    // const { setUserData, userData, idUser } = useContext(DataAdminContext);
    const [userData, setUserData] = useState({});
    const [images, setImages] = useState({
        id: '',
        image: '',
        file: '',
        idRelationship: ''
    });
    const [loading, setLoading] = useState(false);

    const getImages = () => {
        console.log('imagen', data.imagesUser);
        const object = { id: data.id, image: data.imagesUser[0].images.image, idRelationship: data.imagesUser[0].id };
        setImages(object);
        // console.log('dataasdsa', object);
    };

    const handleFileChange = (e) => {
        const datas = { ...images, id: 0, image: URL.createObjectURL(e.target.files[0]), file: e.target.files[0] };
        setImages(datas);
        console.log('data imageenuser', data.imagesUser);
    };
    const handleInputChange = (e) => {
        const { name, value } = e.currentTarget;
        setUserData({
            ...userData,
            [name]: value
        });
    };
    const Update = async () => {
        setLoading(true);
        if (data.imagesUser.length === 0) {
            const idUser = `${data.id}_user`;
            await ImagesServices.createImages(images.file, idUser);
        } else {
            const idUser = `${data.id}_none`;
            const response = await ImagesServices.createImages(images.file, idUser);
            await ImagesServices.deleteImages(data.id);
            const id = response.data.id;
            const datauser = {
                image_id: id,
                user_id: data.id
            };
            await ImagesUserServices.updateImagesUser(images.idRelationship, datauser);
        }
        await User.updateUser(data.id, userData);

        setLoading(false);

        // console.log('udate_user', userData);
        window.location.reload();
    };
    useEffect(() => {
        if (data.imagesUser[0] && data.imagesUser[0].images) {
            getImages();
        }
    }, []);

    return (
        <Container maxwidth="xl">
            <Backdrop
                sx={{
                    background: 'rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(3px)',
                    color: '#1D8AD6',
                    zIndex: (theme) => theme.zIndex.drawer + 1
                }}
                open={loading}
            >
                <CircularProgress sx={{ color: '#8E5DF0' }} />
                <Typography variant="h6" color="initial" mx={2} fontWeight={400}>
                    Actualizando Usuario...
                </Typography>
            </Backdrop>
            <Box sx={{ backgroundColor: 'white', height: '80vh' }} p={2} borderRadius="10px">
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12}>
                        <Typography variant="h5" color="initial">
                            Datos Personales
                        </Typography>
                    </Grid>
                    <Grid
                        item
                        container
                        xs={12}
                        spacing={2}
                        display="flex"
                        justifyContent="center"
                        alignContent="center"
                        // sx={{ border: '1px solid black' }}
                    >
                        <Grid container item xs={6} justifyContent="end">
                            <Grid>
                                {/* <Typography variant="body1" color="initial">
                                    Imagen de Perfil
                                </Typography> */}
                                <Button
                                    color="primary"
                                    component="label"
                                    sx={{
                                        background: '#E0E3E6',
                                        width: '120px',
                                        height: '120px',
                                        overflow: 'hidden',
                                        borderRadius: '5px'
                                    }}
                                >
                                    {' '}
                                    {console.log('image d eusuarios', images)}
                                    <img
                                        width={'100%'}
                                        src={
                                            images.image !== ''
                                                ? images.image
                                                : 'https://img.freepik.com/vector-gratis/ilustracion-icono-galeria_53876-27002.jpg?w=826&t=st=1666408154~exp=1666408754~hmac=4b1d97cdb17dc1f923881fa9b3ee56df8c12593956b2fac4dc03e301da363463'
                                        }
                                        alt=""
                                    />
                                </Button>
                            </Grid>
                        </Grid>
                        <Grid item xs={6} container justifyContent="start" alignContent="center">
                            <Grid item>
                                <Button color="primary" component="label">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        hidden
                                        onChange={handleFileChange}
                                        // onChange={(evt) =>
                                        //     onChange(evt, num, state[index][num].id, index, state[index][num].idRelationship)
                                        // }
                                    />
                                    Editar
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                    <Grid item container xs={12} justifyContent="center" alignItems="center">
                        <Grid item>
                            <Typography variant="body1" color="initial">
                                Datos guardados
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            size="small"
                            fullWidth
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            onChange={handleInputChange}
                            name="name"
                            defaultValue={data.name}

                            // value="asd"
                            // ref={imputUsername}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            size="small"
                            fullWidth
                            id="outlined-basic"
                            label="Last-Name"
                            variant="outlined"
                            onChange={handleInputChange}
                            name="last_name"
                            defaultValue={data.last_name}

                            // value="asd"
                            // ref={imputUsername}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            size="small"
                            fullWidth
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            onChange={handleInputChange}
                            name="username"
                            defaultValue={data.username}

                            // value={userCredentials.username}
                            // ref={imputUsername}
                        />
                    </Grid>

                    <Grid item xs={12} sm={7}>
                        <TextField
                            size="small"
                            fullWidth
                            id="outlined-basic"
                            label="Dni"
                            variant="outlined"
                            onChange={handleInputChange}
                            name="dni"
                            defaultValue={data.dni}

                            // value={userCredentials.username}
                            // ref={imputUsername}
                        />
                    </Grid>
                    <Grid item xs={12} sm={7}>
                        <TextField
                            size="small"
                            fullWidth
                            id="outlined-basic"
                            label="Email"
                            variant="outlined"
                            onChange={handleInputChange}
                            name="email"
                            defaultValue={data.email}

                            // value={userCredentials.username}
                            // ref={imputUsername}
                        />
                    </Grid>
                    {/* <Grid item xs={12} sm={7}>
                        <TextField
                            size="small"
                            fullWidth
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            onChange={handleInputChange}
                            name="Password"
                            type="password"
                            defaultValue={userData.email}

                            // value={userCredentials.username}
                            // ref={imputUsername}
                        />
                    </Grid> */}

                    <Grid item xs={5} sm={7} justifyContent="end">
                        <ButtonPrimary size={'large'} width_full={'100'} onClick={Update}>
                            Guardar
                        </ButtonPrimary>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default UserData;
