import { Typography, Modal, Box, Grid, TextField, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { useState, useContext, useEffect } from 'react';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import { DataContext } from '../../../../Context/DataProvider';
import SourceProductServices from '../../../../services/SourceProductServices';
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
const SouceModal = ({ open, setOpen }) => {
    const { refreshSource, setRefreshSource } = useContext(DataContext);
    const { dataSource, setDataSource } = useContext(DataAdminContext);
    // const [typeUser, setTypeUser] = useState('');
    // const [userObject, setUserObject] = useState({});
    const handleClose = () => setOpen(false);
    // const handleChange = (event) => {
    //     setTypeUser(event.target.value);
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.currentTarget;

        setDataSource({
            ...dataSource,
            [name]: value
        });
    };
    const Update = async (id = 1) => {
        const refresh = !refreshSource;
        dataSource.action_Create
            ? await SourceProductServices.createSourceProduct({ name: dataSource.name })
            : await SourceProductServices.updateSourceProduct(id);
        setRefreshSource(refresh);
        handleClose();
    };

    return (
        <div>
            <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={{ ...style, width: { xs: '100%', sm: '400px' }, height: { xs: '100%', sm: '250px' }, position: 'relative' }}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12}>
                            <Typography variant="h6" color="initial">
                                {dataSource.title}
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
                                {dataSource.action_name}
                            </ButtonPrimary>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};

export default SouceModal;
