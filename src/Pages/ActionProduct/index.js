import { useState, useContext } from 'react';

import { DataContext } from '../../Context/DataProvider';
import { Typography, Box, Grid, TextField, MenuItem, InputLabel, FormControl, Button, Container } from '@mui/material';
import ProductsServices from '../../services/ProductsServices';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ButtonPrimary, ButtonSecondary } from '../../components/stylesComponentsButton';
import { useNavigate } from 'react-router-dom';
import ImagesServices from '../../services/imagesServices';
import { useEffect } from 'react';
import ImagesProductServices from '../../services/ImagesProductServices';
import { DataAdminContext } from '../../Context/ContextAdmin/DataProviderAdmin';
import Swal from 'sweetalert2';
import { ViewSourceModal, ViewTypeMaterialModal } from '../../components/Layout';

// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
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

const ActionProduct = () => {
    const history = useNavigate();
    const { setProductData, productData, idProduct, utilsData, setLoading, openModalSource, setOpenModalSource } =
        useContext(DataAdminContext);
    const { listBrands, listCategory, listSubCategory, listSource, listTypeMaterial } = useContext(DataContext);
    const [modalTypeMaterial, setModalTypeMaterial] = useState(false);
    // const [listImages, setListImages] = useState([]);
    const [state, setState] = useState([
        { imagen0: '' },
        { imagen1: '' },
        { imagen2: '' },
        { imagen3: '' },
        { imagen4: '' },
        { imagen5: '' }
    ]);
    // const [images, setImages] = useState({});

    const getImages = () => {
        // const dat = productData.images
        //     .map((data) => {
        //         return data;
        //     })
        //     .filter((ima) => ima.images.status === true);
        // console.log('datadatadata', dat);
        // let listimages = dat.map((data, index) => {
        let listimages = productData.images.map((data, index) => {
            let keys = `imagen${index}`;

            let datas = { [keys]: { url: data.images.image, id: data.images.id, idRelationship: data.id, file: '' } };
            return datas;
        });
        if (listimages.length < 6) {
            const vueltas = 6 - listimages.length;
            let list = [...listimages];
            for (let i = 0; i < vueltas; i++) {
                let index = `imagen${listimages.length + i}`;

                list.push({ [index]: '' });
            }
            listimages = list;
        }
        setState(listimages);
        console.log('state', listimages);
    };
    // const handleClose = () => setOpenFormModal(false);
    // const handleChange = (event) => {
    //     // setTypeUser(event.target.value);
    // };
    const handleClose = () => {
        // setListImages([]);
        history('/Panel-Admin/list-product');
    };
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setProductData({
            ...productData,
            [name]: value
        });
        // console.log('producto de objeto');
    };

    const Update = async () => {
        // try {
        if (utilsData.action) {
            const data = {
                status: true,
                text: 'Actualizando producto...'
            };
            setLoading(data);
            const response = await ProductsServices.updateProduct(idProduct, productData);
            const id = `${response.data.id}_prod`;
            await Promise.all(
                await state.map(async (item, index) => {
                    let key = `imagen${index}`;
                    console.log(item[key]);

                    if (item[key].file === '' || item[key] === '') return;
                    if (item[key].id !== 0) {
                        const response = await ImagesServices.createImages(item[key].file, 'none');
                        const id = response.data.id;
                        const data = {
                            image_id: id,
                            product_id: productData.id
                        };
                        await ImagesServices.deleteImages(item[key].id);
                        await ImagesProductServices.updateImagesProduct(item[key].idRelationship, data);
                    } else {
                        await ImagesServices.createImages(item[key].file, id);
                    }
                })
            );
        } else {
            // console.log('producto de objeto', productData.id);
            let data = {
                status: true,
                text: 'Creando Producto...'
            };
            setLoading(data);
            const response = await ProductsServices.createProduct(productData);

            const id = `${response.data.id}_prod`;
            console.log('id', id, 'response', response);
            await Promise.all(
                state.map(async (item, index) => {
                    let key = `imagen${index}`;
                    console.log(item[key]);

                    if (item[key] === '') return;
                    await ImagesServices.createImages(item[key].file, id);
                })
            );
        }

        history('/Panel-Admin/list-product');
        let data = {
            status: false,
            text: ''
        };
        setLoading(data);
        window.location.reload();
        // espera un promes hasta se resuleva => https://midu.dev/como-usar-async-await-con-array-prototype-map/
    };

    const handleDeleteImages = async (idrelation, idimages) => {
        // await ImagesProductServices.deleteImagesProduct(id)
        Swal.fire({
            title: `Seguro que desea eliminar este Producto?`,
            text: 'esta accion no podra ser revertido!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await ImagesProductServices.deleteImagesProduct(idrelation);
                await ImagesServices.deleteImages(idimages);
                Swal.fire('Se ha Borrado', 'usuario eliminado', 'success');
                // setResfresh(!resfresh);
                // window.location.reload();
            }
        });
    };
    const onChange = (evt, va, id = 0, index, idRelationship = 0) => {
        const data = [...state];
        data[index] = {
            [va]: { url: URL.createObjectURL(evt.target.files[0]), file: evt.target.files[0], id: id, idRelationship: idRelationship }
        };

        setState(data);
        // setImages(file);
        console.log('vava', data);
        // console.log('images_url', URL.createObjectURL(evt.target.files[0]));
    };
    useEffect(() => {
        if (utilsData.action) {
            getImages();
        }
    }, []);
    return (
        <div>
            <Box
                sx={{
                    position: 'relative',
                    background: '#EEEEEE'
                }}
            >
                <ViewSourceModal open={openModalSource} setOpen={setOpenModalSource} />
                <ViewTypeMaterialModal modalTypeMaterial={modalTypeMaterial} setModalTypeMaterial={setModalTypeMaterial} />
                <Grid>
                    <Typography variant="h6" color="initial">
                        {utilsData.title}
                    </Typography>
                </Grid>
                <Container maxWidth="xl">
                    <Grid container spacing={3} justifyContent="center" mt={3}>
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
                                        defaultValue={utilsData.action ? productData.brand_id : 0}
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
                                    defaultValue={utilsData.action ? productData.stock : 1}

                                    // value={userCredentials.username}
                                    // ref={imputUsername}
                                />
                            </Grid>
                            <Grid item xs={12} sm={11}>
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">category</InputLabel>
                                    <Select
                                        MenuProps={MenuProps}
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue={utilsData.action ? productData.category_id : 0}
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
                                        MenuProps={MenuProps}
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
                            {/* <Grid item xs={12} sm={11}>
                                <div className="form-group">
                                    <label htmlFor="productoImagen">Product image</label>
                                    <input type="file" name="image" id="productoImagen" onChange={handleFileChange} />
                                </div>
                            </Grid> */}
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
                        </Grid>
                        <Grid container item xs={12} lg={6} spacing={2} justifyContent="start" alignContent="start">
                            <Grid item container xs={12} sm={11}>
                                <Grid item xs={10}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Origen</InputLabel>
                                        <Select
                                            MenuProps={MenuProps}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={utilsData.action ? productData.source_id ?? 0 : 0}
                                            label="Origen"
                                            size="small"
                                            name="source_id"
                                            onChange={handleInputChange}
                                        >
                                            {listSource.map((source, index) => (
                                                <MenuItem key={index} value={source.id}>
                                                    {source.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} mx={1}>
                                    <Button variant="contained" onClick={() => setOpenModalSource(true)}>
                                        +
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs={12} sm={11}>
                                <TextField
                                    size="small"
                                    fullWidth
                                    id="outlined-basic"
                                    label="Peso"
                                    variant="outlined"
                                    onChange={handleInputChange}
                                    name="weight"
                                    defaultValue={utilsData.action ? productData.weight : 0}

                                    // value={userCredentials.username}
                                    // ref={imputUsername}
                                />
                            </Grid>
                            <Grid container item xs={12} sm={11}>
                                <Grid item xs={10}>
                                    <FormControl fullWidth>
                                        {/* {console.log('gaaaaaaaaaaaaaa', productData)} */}
                                        <InputLabel id="demo-simple-select-label">Tipo Material</InputLabel>
                                        <Select
                                            MenuProps={MenuProps}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            defaultValue={utilsData.action ? productData.type_material_id : 0}
                                            label="Origen"
                                            size="small"
                                            name="type_material_id"
                                            onChange={handleInputChange}
                                        >
                                            {listTypeMaterial.map((type, index) => (
                                                <MenuItem key={index} value={type.id}>
                                                    {type.name}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={1} mx={1}>
                                    <Button variant="contained" onClick={() => setModalTypeMaterial(true)}>
                                        +
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid
                                item
                                container
                                spacing={{ xs: 0.5, sm: 1.5 }}
                                // sx={{ height: '100%' }}
                                // justifyContent="start"
                                // alignContent="start"
                            >
                                {['imagen0', 'imagen1', 'imagen2', 'imagen3', 'imagen4', 'imagen5'].map((num, index) => (
                                    <Grid item key={index} p={0} my={3} sx={{ position: 'relative' }}>
                                        <Button
                                            color="primary"
                                            component="label"
                                            sx={{
                                                background: '#E5E5E5',
                                                width: '100px',
                                                height: '100px',
                                                overflow: 'hidden',
                                                borderRadius: '10px'
                                            }}
                                        >
                                            {/* <AddPhotoAlternateIcon /> */}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                hidden
                                                onChange={(evt) =>
                                                    onChange(evt, num, state[index][num].id, index, state[index][num].idRelationship)
                                                }
                                            />
                                            {/* {console.log('images-box', state)} */}
                                            {/* {utilsData.action && listImages[index] !== undefined ? (
                                                <img width={'100%'} src={listImages[index].image} alt="" />
                                            ) : ( */}
                                            {/* {console.log('dassadad', state[num] !== undefined && state[index][num].url)}
                                            {console.log('data', state[num])} */}
                                            <img
                                                width={'100%'}
                                                src={
                                                    state[index] !== undefined
                                                        ? state[index][num].url
                                                        : 'https://cdn.pixabay.com/photo/2017/01/25/17/35/picture-2008484_960_720.png'
                                                }
                                                alt=""
                                            />
                                            {/* )} */}
                                        </Button>
                                        {state[index][num].url !== undefined && utilsData.action && (
                                            <Grid
                                                cols={2}
                                                sx={{
                                                    position: 'absolute',
                                                    top: '5px',
                                                    right: '5px',
                                                    width: '15px',
                                                    height: '5px',
                                                    padding: '0px'
                                                }}
                                            >
                                                {/* <ButtonSecondary size="small" back_color="#479BEE" back_color_hover="#97E3C8"> */}
                                                <Typography
                                                    variant="body1"
                                                    align="center"
                                                    lineHeight="17px"
                                                    color="#FFFFFF"
                                                    sx={{
                                                        fontSize: '17px',
                                                        width: '20px',
                                                        height: '20px',
                                                        background: '#EE4763',
                                                        borderRadius: '5px',
                                                        padding: '0px',
                                                        cursor: 'pointer'
                                                    }}
                                                    onClick={() =>
                                                        handleDeleteImages(state[index][num].idRelationship, state[index][num].id)
                                                    }
                                                >
                                                    x
                                                </Typography>
                                                {/* </ButtonSecondary> */}
                                            </Grid>
                                        )}
                                    </Grid>
                                ))}
                            </Grid>
                            <Grid item container xs={12} spacing={3}>
                                <Grid item>
                                    <ButtonPrimary size={'large'} width_full={'100'} onClick={Update}>
                                        {utilsData.name_buttom}
                                    </ButtonPrimary>
                                </Grid>
                                <Grid item>
                                    <ButtonPrimary size={'large'} width_full={'100'} onClick={handleClose}>
                                        Cancelar
                                    </ButtonPrimary>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </div>
    );
};

export default ActionProduct;
