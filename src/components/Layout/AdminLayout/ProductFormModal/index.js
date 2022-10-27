import { Typography, Modal, Box, Grid, TextField, MenuItem, InputLabel, FormControl, IconButton, Button, Container } from '@mui/material';

import { useContext } from 'react';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';

import Products from '../../../../services/ProductsServices';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ButtonPrimary } from '../../../stylesComponentsButton';
import { DataContext } from '../../../../Context/DataProvider';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { useState } from 'react';
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
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    }
};
const ProductFormModal = ({ openFormModal, setOpenFormModal }) => {
    const { setProductData, productData, idProduct, utilsData } = useContext(DataAdminContext);
    const { listBrands, listCategory, listSubCategory } = useContext(DataContext);
    const [state, setState] = useState({
        va0: null,
        va1: null,
        va2: null,
        va3: null,
        v4: null,
        va5: null
    });
    // const [userObject, setUserObject] = useState({});
    const handleClose = () => setOpenFormModal(false);
    // const handleChange = (event) => {
    //     // setTypeUser(event.target.value);
    // };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setProductData({
            ...productData,
            [name]: value
        });
        // console.log('producto de objeto');
    };

    const Update = async () => {
        console.log('producto de objeto', productData);

        utilsData.action ? await Products.updateProduct(idProduct, productData) : await Products.createProduct(productData);

        window.location.reload();
    };
    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        setProductData({ ...productData, image: file });
    };
    const onChange = (evt, va) => {
        const ima = { ...state, [va]: URL.createObjectURL(evt.target.files[0]) };
        setState(ima);
        console.log('vava', ima);
    };
    return (
        <div>
            {/* <Modal
                open={openFormModal}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            > */}
            <Box
                sx={{
                    ...style,
                    width: { xs: '100%', sm: '50%' },
                    height: { xs: '100%', sm: '80%' },
                    position: 'relative',
                    background: '#EEEEEE'
                }}
            >
                <Grid>
                    <Typography variant="h6" color="initial">
                        {utilsData.title}
                    </Typography>
                </Grid>
                <Container maxWidth="xl">
                    <Grid container spacing={2} justifyContent="center" mt={3} sx={{ border: '1px solid black' }}>
                        <Grid container item xs={12} lg={6}>
                            <Grid
                                item
                                container
                                spacing={{ xs: 0.5, sm: 1.5 }}
                                sx={{ height: '100%' }}
                                justifyContent="start"
                                alignContent="start"
                            >
                                {['va0', 'va1', 'va2', 'va3', 'va4', 'va5'].map((num, index) => (
                                    <Grid item key={index} p={0}>
                                        <Button
                                            fullWidth
                                            fullHeight
                                            color="primary"
                                            component="label"
                                            sx={{
                                                background: '#262B32',
                                                width: '100px',
                                                height: '100px',
                                                overflow: 'hidden',
                                                borderRadius: '5px'
                                            }}
                                        >
                                            {/* <AddPhotoAlternateIcon /> */}
                                            <input type="file" accept="image/*" hidden onChange={(evt) => onChange(evt, num)} />
                                            <img width={'100%'} src={state[num]} sx={{ transform: 'scale(2)' }} alt="" />
                                            {console.log('dassadad', state[num])}
                                        </Button>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid container item xs={12} lg={6} spacing={2}>
                            <Grid item xs={12} sm={11}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="outlined-basic"
                                    label="Name"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    name="name"
                                    defaultValue={utilsData.action ? productData.name : ''}
                                    // value={userCredentials.username}
                                    // ref={imputUsername}
                                />
                            </Grid>

                            <Grid item xs={12} sm={11}>
                                <TextField
                                    fullWidth
                                    id="outlined-multiline-static"
                                    label="description"
                                    name="description"
                                    multiline
                                    rows={4}
                                    defaultValue={utilsData.action ? productData.description : ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12} sm={11}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Brand</InputLabel>
                                    <Select
                                        MenuProps={MenuProps}
                                        inputProps={{ 'aria-label': 'Without label' }}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={utilsData.action ? productData.brand_id : null}
                                        label="Brand"
                                        size="small"
                                        name="brand_id"
                                        onChange={handleInputChange}
                                    >
                                        {listBrands.map((listBrand, index) => (
                                            <MenuItem key={index} value={listBrand.id}>
                                                {listBrand.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={11}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="outlined-basic"
                                    label="Price"
                                    name="price"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    defaultValue={utilsData.action ? productData.price : ''}

                                    // value={userCredentials.username}
                                    // ref={imputUsername}
                                />
                            </Grid>

                            <Grid item xs={12} sm={11}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="outlined-basic"
                                    label="Stock"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    name="stock"
                                    defaultValue={utilsData.action ? productData.stock : 0}

                                    // value={userCredentials.username}
                                    // ref={imputUsername}
                                />
                            </Grid>
                            <Grid item xs={12} sm={11}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">category</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={utilsData.action ? productData.category_id : null}
                                        label="Brand"
                                        size="small"
                                        name="category_id"
                                        onChange={handleInputChange}
                                    >
                                        {listCategory.map((listCategory, index) => (
                                            <MenuItem key={index} value={listCategory.id}>
                                                {listCategory.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={11}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Subcategory</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        // value={productData.subcategory_id}
                                        label="Brand"
                                        name="subcategory_id"
                                        size="small"
                                        defaultValue={utilsData.action ? productData.subcategory_id : 0}
                                        onChange={handleInputChange}
                                        disabled={
                                            listSubCategory.filter((category) => category.id_category === productData.category_id).length >
                                            0
                                                ? false
                                                : true
                                        }
                                    >
                                        {listSubCategory
                                            .filter((category) => category.id_category === productData.category_id)
                                            .map((listSubcategory, index) => (
                                                <MenuItem key={index} value={listSubcategory.id}>
                                                    {listSubcategory.name}
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={11}>
                                <div className="form-group">
                                    <label htmlFor="productoImagen">Product image</label>
                                    <input type="file" name="image" id="productoImagen" onChange={handleFileChange} />
                                </div>
                            </Grid>
                            {/* <Grid item xs={12} sm={9}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-simple-select-label">Type-User</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    // value={typeUser}
                                    label="Ordenar por"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'admin'}>Admin</MenuItem>
                                    <MenuItem value={'user'}>User</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid> */}

                            <Grid item xs={12} sm={11}>
                                <ButtonPrimary size={'large'} width_full={'100'} onClick={Update}>
                                    {utilsData.name_buttom}
                                </ButtonPrimary>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Typography
                        variant="body1"
                        color="initial"
                        sx={{ position: 'absolute', top: '10px', right: '15px', cursor: 'pointer', fontWeight: 900 }}
                        onClick={handleClose}
                    >
                        X
                    </Typography>
                </Container>
            </Box>
            {/* </Modal> */}
        </div>
    );
};

export default ProductFormModal;
