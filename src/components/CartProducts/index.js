import { Typography, Stack, Grid, Card, Rating, CardContent, CardMedia, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useRef, useState, useContext } from 'react';
import { DataContext } from '../../Context/DataProvider';
import SpeedDial from '@mui/material/SpeedDial';

import SpeedDialIcon from '@mui/material/SpeedDialIcon';
// import AddIcon from '@mui/icons-material/Add';
import './index.css';
// import { LabelDiscount } from '../stylesComponentsButton';
// import Products from '../../services/ProductsServices';
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
import Backdrop from '@mui/material/Backdrop';
import FavoriteProductServices from '../../services/ProductFavoriteServices';

const styles_img = {
    borderRadius: '9px, 0px',
    transition: ' all 0.2s ease-in',
    overflow: 'hidden',
    ':hover': {
        transition: ' all 0.3s ease-in'
    }
};

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#E74D4D '
    },
    '& .MuiRating-iconHover': {
        color: '#E74D4D '
    }
});
const styles_card = {
    border: '1px rgba(202, 198, 198,0.5) solid ',
    padding: '0px',
    boxShadow: 'none',
    borderRadius: '9px',
    position: 'relative',
    cursor: 'pointer',

    ':hover': {
        boxShadow: '5px 5px 10px rgb(212, 204, 204), -5px -5px 8px rgb(212, 204, 204)',
        border: '1px rgb(202, 198, 198)solid ',
        background: 'white',
        transition: 'all 0.2s ease-in'
    }
};

const CartProducts = ({ data, styleText, refresh, setRefresh }) => {
    const [value, setValue] = useState(0);
    const [hiden, setHiden] = useState(true);
    const history = useNavigate();
    const { setIdProduct, bandera, setBandera, refreshCount, setRefreshCount, refreshDetailProduct, setRefreshDetailProduct } =
        useContext(DataContext);

    const img = useRef();

    const handleAddCard = (id) => {
        const code = id;
        setIdProduct(code);
        history('/Details-Product');
        const status = !refreshDetailProduct;
        setRefreshDetailProduct(status);
        // console.log(typeof id);
    };

    // const createDescont = (price, discount) => {
    //     return (price - price * (discount / 100)).toFixed(2);
    // };

    const handleHoverBox = (imgs) => {
        if (imgs === undefined) return;
        img.current.src = String(imgs);
        // img.current.style = { styles_img };
        // console.log(imgs);
        setHiden(false);
    };
    const handleOutBox = (imgs) => {
        img.current.src = imgs;
        setHiden(true);
    };

    const handleChangeFavorite = async (event, newValue, id) => {
        if (newValue === 1) {
            setValue(newValue);
            await FavoriteProductServices.CreateFavorite(Number(id));
            setRefreshCount(!refreshCount);
        } else {
            setValue(0);
            await FavoriteProductServices.deleteFavorite(Number(id));
            setRefreshCount(!refreshCount);
        }

        setBandera(!bandera);
        setRefresh(!refresh);
    };
    // const actions = [
    //     { icon: <AddShoppingCartIcon sx={{ color: 'white' }} />, name: 'ver detalle' },
    //     { icon: <FavoriteIcon sx={{ color: 'white' }} />, name: 'add favorite' }
    // ];

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        // <motion.div Layout>
        <Card
            className="box_Product"
            sx={{ ...styles_card, position: 'relative' }}
            // onMouseOver={() => setHiden(false)}
            onMouseOver={() => handleHoverBox(data.images[1] !== undefined ? data.images[1].images.image : data.images[0].images.image)}
            // onMouseOut={() => setHiden(true)}
            onMouseOut={() => handleOutBox(data.images[0].images.image)}
        >
            <Box sx={{ transform: 'translateZ(0px)', flexGrow: 1 }}>
                <Grid container>
                    <Grid item>
                        <figure>
                            <CardMedia
                                className="box_img"
                                sx={styles_img}
                                component="img"
                                image={data.images[0].images.image}
                                // alt={'image :' + data.name}
                                ref={img}
                            />
                        </figure>

                        {/* <LabelDiscount discount={data.discount} top={'85%'} left={'5px'}>
                        {data.discount !== 0 && '- ' + data.discount + '%'}
                    </LabelDiscount> */}
                        {/* {console.log('id', ids, 'data', data.favo)} */}
                        <StyledRating
                            sx={{
                                position: 'absolute',

                                top: 10,
                                right: 10
                            }}
                            max={1}
                            value={data.favo === undefined ? value : data.favo}
                            icon={<FavoriteIcon fontSize="inherit" />}
                            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                            onChange={(event, newValue) => handleChangeFavorite(event, newValue, data.id)}
                        />
                    </Grid>

                    <Backdrop open={open} sx={{ background: 'rgba(255, 255, 255, 0.2)', backdropFilter: 'grayscale(60%)' }}></Backdrop>
                    <SpeedDial
                        FabProps={{ size: 'medium', style: { backgroundColor: '#6A5DE3' } }}
                        ariaLabel="SpeedDial basic example"
                        sx={{ position: 'absolute', bottom: '30%', right: 7 }}
                        icon={<SpeedDialIcon />}
                        hidden={hiden}
                        onClose={handleClose}
                        onOpen={handleOpen}
                        onClick={() => handleAddCard(data.id)}
                    ></SpeedDial>
                </Grid>
                <Divider sx={{ background: 'black' }} />
                <CardContent>
                    <Typography component="div" sx={{ ...styleText, fontWeight: 400, fontSize: '14px' }}>
                        {data.name}
                    </Typography>

                    <Typography variant="body1" component="div" color="text.secondary" align="left" sx={{ fontWeight: 500 }}>
                        {data.brand.name}
                    </Typography>
                </CardContent>
                <Grid container alignItems="center" justifyContent="space-around" sx={{ marginTop: -2.5 }}>
                    <Grid item>
                        <Stack direction="row" justifyContent="flex-start" spacing={1}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 900 }} color="black">
                                {/* PEN {data.discount === 0 ? data.price_off : createDescont(data.price_off, data.discount)} */}
                                {'PEN ' + data.price}
                            </Typography>

                            <Typography
                                variant="subtitle1"
                                color="#A29D9D"
                                sx={{ fontWeight: 400, textDecoration: 'line-through', top: '5px' }}
                            >
                                {/* {data.discount === 0 ? '' : ' PEN ' + data.price_off} */}
                            </Typography>
                        </Stack>

                        <Rating
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                            name="size-small"
                            size="small"
                            value={Number(data.stars)}
                            sx={{ color: '#E85142 ', fontSize: '16px' }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Card>
        // </motion.div>
    );
};
export default CartProducts;
