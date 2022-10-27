import { Typography, Container, Grid, Button } from '@mui/material';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewProductTable, ViewProductFormModal } from '../../components/Layout/index.js';
import { ButtonSecondary } from '../../components/stylesComponentsButton/index.js';
import { DataAdminContext } from '../../Context/ContextAdmin/DataProviderAdmin.js';
// import {  GridColDef, GridApi, GridCellValue } from '@mui/x-data-grid';

const AdminListProduct = () => {
    // const [openFormModal, setOpenFormModal] = useState(false);
    const { setUtilsData } = useContext(DataAdminContext);
    const history = useNavigate();

    const handleOpenModal = () => {
        setUtilsData({
            title: 'Crear Producto',
            name_buttom: 'Crear',
            action: false
        });
        history('/Panel-Admin/actions-product');
    };

    return (
        <div>
            <Container maxWidth="xl">
                {/* <ViewProductFormModal openFormModal={openFormModal} setOpenFormModal={setOpenFormModal} /> */}
                <Typography variant="h5" color="initial" my={1}>
                    Lista de Products
                </Typography>
                <Grid container>
                    <Grid item my={2}>
                        <ButtonSecondary back_color={'#3B8DDA '} back_color_hover={'#629ED7 '} text_size={'18px'} onClick={handleOpenModal}>
                            New Product
                        </ButtonSecondary>
                    </Grid>
                </Grid>
                <ViewProductTable />
                {/* <TableData />; */}
            </Container>
        </div>
    );
};
export default AdminListProduct;
