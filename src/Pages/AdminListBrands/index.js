import { Container, Typography, Grid } from '@mui/material';
import { useState, useContext } from 'react';
import { ViewBrandsTable, ViewBrandFormModal } from '../../components/Layout';
import { ButtonSecondary } from '../../components/stylesComponentsButton';
import { DataAdminContext } from '../../Context/ContextAdmin/DataProviderAdmin';

const AdminListBrands = () => {
    const [openModal, setOpenModal] = useState(false);
    const { setDataBrands, dataBrands } = useContext(DataAdminContext);
    const handleOpenModal = () => {
        setDataBrands({
            ...dataBrands,
            name: '',
            update: false,
            name_buttom: 'Crear',
            title: 'Create Brands'
        });
        setOpenModal(true);
    };
    return (
        <Container maxWidth="xl">
            <ViewBrandFormModal openModal={openModal} setOpenModal={setOpenModal} />
            <Grid container>
                <Grid item xs={12}>
                    <Typography variant="h5" color="initial">
                        Lista de Marcas
                    </Typography>
                </Grid>
                <Grid item xs={12} my={2}>
                    <ButtonSecondary onClick={handleOpenModal} back_color={'#3B8DDA '} back_color_hover={'#629ED7 '}>
                        New brands
                    </ButtonSecondary>
                </Grid>
                <Grid item xs={7}>
                    <ViewBrandsTable setOpenModal={setOpenModal} />
                </Grid>
            </Grid>
        </Container>
    );
};

export default AdminListBrands;
