import { Typography, Modal, Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { useState, useContext, useEffect } from 'react';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import User from '../../../../services/UserServices';
import { ButtonPrimary } from '../../../stylesComponentsButton';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: '7px',
    boxShadow: 24,
    p: 4
};
const UserFormModal = ({ openFormModal, setOpenFormModal }) => {
    const { setUserData, userData, idUser } = useContext(DataAdminContext);
    const [typeUser, setTypeUser] = useState('');
    // const [userObject, setUserObject] = useState({});
    const handleClose = () => setOpenFormModal(false);
    const handleChange = (event) => {
        setTypeUser(event.target.value);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setUserData({
            ...userData,
            [name]: value
        });
    };
    const Update = async () => {
        await User.updateUser(idUser, userData);
        window.location.reload();
    };

    return (
        <div>
            <Modal
                open={openFormModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: { xs: '100%', sm: '500px' }, height: { xs: '100%', sm: '550px' }, position: 'relative' }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" color="initial">
                                Update User
                            </Typography>
                        </Grid>
                        <Grid item container xs={12} justifyContent="center">
                            <Grid item>
                                <Typography variant="body1" color="initial">
                                    Actualiza los campos
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                size="small"
                                fullWidth
                                id="outlined-basic"
                                label="Name"
                                variant="outlined"
                                onChange={handleInputChange}
                                name="name"
                                defaultValue={userData.name}
                                // value={userCredentials.username}
                                // ref={imputUsername}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                size="small"
                                fullWidth
                                id="outlined-basic"
                                label="Last-Name"
                                variant="outlined"
                                onChange={handleInputChange}
                                name="last_name"
                                defaultValue={userData.last_name}

                                // value="asd"
                                // ref={imputUsername}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                size="small"
                                fullWidth
                                id="outlined-basic"
                                label="Username"
                                variant="outlined"
                                onChange={handleInputChange}
                                name="username"
                                defaultValue={userData.username}

                                // value={userCredentials.username}
                                // ref={imputUsername}
                            />
                        </Grid>

                        <Grid item xs={12} sm={9}>
                            <TextField
                                size="small"
                                fullWidth
                                id="outlined-basic"
                                label="Dni"
                                variant="outlined"
                                onChange={handleInputChange}
                                name="dni"
                                defaultValue={userData.dni}

                                // value={userCredentials.username}
                                // ref={imputUsername}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <TextField
                                size="small"
                                fullWidth
                                id="outlined-basic"
                                label="Email"
                                variant="outlined"
                                onChange={handleInputChange}
                                name="email"
                                defaultValue={userData.email}

                                // value={userCredentials.username}
                                // ref={imputUsername}
                            />
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Type-User</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    defaultValue={userData.rol_id}
                                    label="Ordenar por"
                                    onChange={handleInputChange}
                                    name="rol_id"
                                >
                                    <MenuItem value={1}>User</MenuItem>
                                    <MenuItem value={2}>Admin</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={9}>
                            <ButtonPrimary size={'large'} width_full={'100'} onClick={Update}>
                                Actulizar
                            </ButtonPrimary>
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
        </div>
    );
};

export default UserFormModal;
