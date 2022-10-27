import { Typography, Container } from '@mui/material';
import { useState } from 'react';
import { ViewUserTable, ViewUserFormModal } from '../../components/Layout/index.js';

const AdminPanel = () => {
    const [openFormModal, setOpenFormModal] = useState(false);

    return (
        <div>
            <Container maxWidth="xl">
                <ViewUserFormModal openFormModal={openFormModal} setOpenFormModal={setOpenFormModal} />
                <Typography variant="h5" color="initial" my={1}>
                    Lista de Usuarios
                </Typography>

                <ViewUserTable setOpenFormModal={setOpenFormModal} />
            </Container>
        </div>
    );
};
export default AdminPanel;
