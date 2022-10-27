import { Typography, Modal, Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { useState, useContext, useEffect } from 'react';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import { DataContext } from '../../../../Context/DataProvider';
import TypeMaterialServices from '../../../../services/typeMaterialServices';

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
const TypeMaterialModal = ({ modalTypeMaterial, setModalTypeMaterial }) => {
    const { refreshSource, setRefreshSource } = useContext(DataContext);
    const { dataTypeMaterial, setDataTypeMaterial } = useContext(DataAdminContext);

    const handleClose = () => setModalTypeMaterial(false);

    const handleInputChange = (e) => {
        const { name, value } = e.currentTarget;

        setDataTypeMaterial({
            ...dataTypeMaterial,
            [name]: value
        });
    };
    const Update = async (id = 1) => {
        const refresh = !refreshSource;
        dataTypeMaterial.action_Create
            ? await TypeMaterialServices.createTypeMaterial({ name: dataTypeMaterial.name })
            : await TypeMaterialServices.updateTypeMaterial(id);
        setRefreshSource(refresh);
        handleClose();
    };

    return (
        <div>
            <Modal
                open={modalTypeMaterial}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style, width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: '250px' }, position: 'relative' }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" color="initial">
                                {dataTypeMaterial.title}
                            </Typography>
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
                                // defaultValue={userData.name}
                                // value={userCredentials.username}
                                // ref={imputUsername}
                            />
                        </Grid>

                        <Grid item xs={12} sm={9}>
                            <ButtonPrimary size={'small'} width_full={'100'} onClick={Update}>
                                {dataTypeMaterial.action_name}
                            </ButtonPrimary>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default TypeMaterialModal;
