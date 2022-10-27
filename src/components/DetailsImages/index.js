import { Card, CardMedia, Button, Grid } from '@mui/material';
import { useState } from 'react';

import Carousel from 'react-bootstrap/Carousel';
// import './css.css';
const styles_card = {
    width: '50px',
    height: '60px',
    border: '1px solid #D4D4D4',
    borderRadius: '7px',
    ':hover': {
        border: '2px #6a5de3 solid ',
        // boxShadow: '4px 4px 5px #bfbfbf',
        transition: 'all 0.2s ease-in'
    }
};

const ImageScreenSmall = ({ dataProduct }) => {
    return (
        <Carousel>
            {dataProduct.images !== undefined &&
                dataProduct.images.map((data, index) => (
                    <Carousel.Item key={index}>
                        <img className="d-block w-100" src={data.images.image} alt="Third slide" />
                    </Carousel.Item>
                ))}
        </Carousel>
    );
};

const ImageScreenBig = ({ dataProduct }) => {
    const [indexImage, setIndexImage] = useState(0);

    return (
        <Card variant="outlined" sx={{ position: 'relative', paddingBottom: '100px', border: 'none' }}>
            <Grid>
                <CardMedia
                    sx={{ width: '80%' }}
                    component="img"
                    image={dataProduct.images !== undefined && dataProduct.images[indexImage].images.image}
                />
            </Grid>
            <Grid container elevation={0} justifyContent="center" sx={{ position: 'absolute', top: '85%', left: 5, width: '95%' }}>
                <Grid container item xs={12} justifyContent="center">
                    {/* {console.log(`iiiiiiiiiiiiiiiiiiiiiiiiiiii`, dataProduct.images)} */}
                    {dataProduct.images !== undefined &&
                        dataProduct.images.map((data, index) => (
                            <Grid item xs={1.5} key={index} mx={1} mt={2}>
                                <Button sx={styles_card} size="small">
                                    <img
                                        width="100%"
                                        height="100%"
                                        src={data.images.image}
                                        alt=""
                                        onClick={() => setIndexImage(index)}
                                        sx={{ border: '10px solid black' }}
                                    />
                                </Button>
                            </Grid>
                        ))}
                </Grid>
            </Grid>
        </Card>
    );
};

const DetailsImages = ({ dataProduct }) => {
    const handleResize = () => {
        setWidth(window.innerWidth);
    };
    const [width, setWidth] = useState(window.innerWidth);
    // const { listProduct, idProduct } = useContext(DataContext);
    // const [indexImage, setIndexImage] = useState(0);
    // const [image, setImage] = useState('');
    window.addEventListener('resize', handleResize);
    // const getImage = () => {
    //     const product = listProduct.filter((data) => data.id === idProduct);
    //     setImage(product[0].image);
    //     console.log('image', product[0].image);
    // };
    // useEffect(() => {
    //     getImage();
    // }, []);

    return (
        <div>
            {/* {getImage()} */}

            {/* <ImageScreenBig dataProduct={dataProduct} /> */}
            {width >= 1200 ? <ImageScreenBig dataProduct={dataProduct} /> : <ImageScreenSmall dataProduct={dataProduct} />}
        </div>
    );
};
export default DetailsImages;
