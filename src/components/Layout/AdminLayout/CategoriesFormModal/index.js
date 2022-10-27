import { Modal, Box, Typography, TextField, Grid, FormControl, InputLabel, MenuItem } from '@mui/material';
import { useContext } from 'react';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import Category from '../../../../services/categoryServices';
import SubCategory from '../../../../services/SubcategoryServices';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ButtonSecondary } from '../../../stylesComponentsButton';
import { DataContext } from '../../../../Context/DataProvider';

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

const CategoriesFormModal = ({ openModal, setOpenModal }) => {
    const { listCategory } = useContext(DataContext);
    const { CategoriesDataUtils, setCategoriesDataUtils } = useContext(DataAdminContext);
    const handleUpdateCtagories = async () => {
        CategoriesDataUtils.categories
            ? CategoriesDataUtils.update
                ? await Category.updateCategory(CategoriesDataUtils.id, { name: CategoriesDataUtils.name })
                : await Category.createCategory({ name: CategoriesDataUtils.name })
            : CategoriesDataUtils.update
            ? await SubCategory.updateSubCategory(CategoriesDataUtils.id, {
                  name: CategoriesDataUtils.name,
                  id_category: CategoriesDataUtils.id_category
              })
            : await SubCategory.createSubCategory({ name: CategoriesDataUtils.name, id_category: CategoriesDataUtils.id_category });

        window.location.reload();
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCategoriesDataUtils({ ...CategoriesDataUtils, [name]: value });
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
                        {CategoriesDataUtils.title}
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ my: 2 }}>
                        Actuliza el campo.
                    </Typography>
                    <TextField
                        fullWidth
                        name="name"
                        size="small"
                        id="filled-basic"
                        defaultValue={CategoriesDataUtils.name}
                        label={CategoriesDataUtils.label}
                        variant="filled"
                        onChange={handleInputChange}
                    />
                    {CategoriesDataUtils.categories || !CategoriesDataUtils.update ? (
                        ''
                    ) : (
                        <Box mt={2}>
                            <FormControl fullWidth variant="filled">
                                <InputLabel id="demo-simple-select-filled-label">Categories</InputLabel>
                                <Select
                                    labelId="demo-simple-select-filled-label"
                                    id="demo-simple-select-filled"
                                    defaultValue={CategoriesDataUtils.id_category}
                                    label="Brand"
                                    size="small"
                                    name="id_category"
                                    onChange={handleInputChange}
                                >
                                    {listCategory.map((listCategory, index) => (
                                        <MenuItem key={index} value={listCategory.id}>
                                            {listCategory.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Box>
                    )}
                    <Grid container spacing={3} mt={1.5}>
                        <Grid item xs={6}>
                            <ButtonSecondary onClick={handleUpdateCtagories}>{CategoriesDataUtils.name_buttom}</ButtonSecondary>
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

export default CategoriesFormModal;
