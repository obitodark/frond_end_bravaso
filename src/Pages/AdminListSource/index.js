import { useState, useContext } from 'react';
import { ViewSourceTable, ViewSourceModal } from '../../components/Layout/index.js';
import { Container, Typography, Modal, Box, Grid, TextField, Button } from '@mui/material';
import { DataAdminContext } from '../../Context/ContextAdmin/DataProviderAdmin.js';
import SourceProductServices from '../../services/SourceProductServices.js';
import { ButtonPrimary, ButtonSecondary } from '../../components/stylesComponentsButton/index.js';
import { DataContext } from '../../Context/DataProvider.js';

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
export const ModalSource = ({ open, setOpen }) => {
    const { refreshSource, setRefreshSource } = useContext(DataContext);
    const { dataSource, setDataSource } = useContext(DataAdminContext);
    const handleClose = () => setOpen(false);
    const handleInputChange = (e) => {
        const { name, value } = e.currentTarget;

        setDataSource({
            ...dataSource,
            [name]: value
        });
    };
    const Update = async (id) => {
        const refresh = !refreshSource;
        dataSource.action_Create
            ? await SourceProductServices.createSourceProduct({ name: dataSource.name })
            : await SourceProductServices.updateSourceProduct(dataSource.id, { name: dataSource.name });
        setRefreshSource(refresh);
        handleClose();
    };
    return (
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
                            defaultValue={dataSource.name}
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
    );
};

const AdminPanel = () => {
    const { dataSource, setDataSource } = useContext(DataAdminContext);
    const [openFormModal, setOpenFormModal] = useState(false);
    const handleCreateSource = () => {
        const data = {
            ...dataSource,
            name: '',
            id: '',
            action_Create: true,
            action_name: 'Crear',
            title: 'Crear origen del producto'
        };
        setDataSource(data);
        setOpenFormModal(true);
    };
    return (
        <div>
            <Container maxWidth="xl">
                <ModalSource open={openFormModal} setOpen={setOpenFormModal} />

                <Typography variant="h5" color="initial" my={1}>
                    Lista de Origen de producto
                </Typography>
                <Grid container>
                    <Grid item my={2}>
                        <ButtonSecondary
                            back_color={'#3B8DDA '}
                            back_color_hover={'#629ED7 '}
                            text_size={'18px'}
                            onClick={handleCreateSource}
                        >
                            New Source
                        </ButtonSecondary>
                    </Grid>
                </Grid>

                <ViewSourceTable setOpen={setOpenFormModal} />
            </Container>
        </div>
    );
};
export default AdminPanel;
