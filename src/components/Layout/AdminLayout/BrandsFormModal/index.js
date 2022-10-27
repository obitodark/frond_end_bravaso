import { Typography, Modal, TextField, Box, Grid } from '@mui/material';
import { useContext } from 'react';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import BrandServices from '../../../../services/BrandsServices';
import { ButtonSecondary } from '../../../stylesComponentsButton';

const style = {
    borderRadius: '5px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4
};

const BrandsFormModal = ({ openModal, setOpenModal }) => {
    const { dataBrands, setDataBrands } = useContext(DataAdminContext);
    const handleInputChange = (e) => {
        setDataBrands({ ...dataBrands, name: e.target.value });
        console.log(e.target.value);
    };
    const handleUpdateBrands = async () => {
        dataBrands.update
            ? await BrandServices.updateBrands(dataBrands.id, { name: dataBrands.name })
            : await BrandServices.createBrands({ name: dataBrands.name });

        window.location.reload();
    };
    return (
        <div>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {dataBrands.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ my: 2 }}>
                        Actuliza el campo.
                    </Typography>
                    <TextField
                        fullWidth
                        name="name"
                        size="small"
                        id="filled-basic"
                        defaultValue={dataBrands.name}
                        label="Brands"
                        variant="filled"
                        onChange={handleInputChange}
                    />

                    <Grid container spacing={3} mt={1.5}>
                        <Grid item xs={6}>
                            <ButtonSecondary onClick={handleUpdateBrands}>{dataBrands.name_buttom}</ButtonSecondary>
                        </Grid>
                        <Grid item xs={6}>
                            <ButtonSecondary onClick={() => setOpenModal(false)}>Cerrar</ButtonSecondary>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    );
};
export default BrandsFormModal;
