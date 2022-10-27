import { Typography, Container, Grid } from '@mui/material';
import { useState, useContext } from 'react';
import { ViewCategoriesTable, ViewCategoriesFormModal } from '../../components/Layout';

import { ButtonSecondary } from '../../components/stylesComponentsButton';
import { DataAdminContext } from '../../Context/ContextAdmin/DataProviderAdmin';

const AdminListCategories = () => {
    const { setCategoriesDataUtils, CategoriesDataUtils } = useContext(DataAdminContext);
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => {
        setCategoriesDataUtils({
            ...CategoriesDataUtils,
            title: 'Create',
            name_buttom: 'Create',
            name: '',
            label: 'Categoria',
            update: false,
            categories: true
        });
        setOpenModal(true);
    };
    return (
        <Container maxWidth="xl">
            <ViewCategoriesFormModal openModal={openModal} setOpenModal={setOpenModal} />
            <Typography variant="h5" color="initial" my={1}>
                Lista de Categories
            </Typography>
            <Grid container>
                <Grid item my={2} xs={12}>
                    <ButtonSecondary onClick={handleOpenModal} back_color={'#3B8DDA '} back_color_hover={'#629ED7 '}>
                        New categories
                    </ButtonSecondary>
                </Grid>
                <Grid item xs={8}>
                    <ViewCategoriesTable setOpenModal={setOpenModal} />
                </Grid>
            </Grid>
        </Container>
    );
};
export default AdminListCategories;
