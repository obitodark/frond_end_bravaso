import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Box } from '@mui/system';

const CarrusuelImages = () => {
    return (
        <Container maxWidth="100%">
            <Box mt={10} sx={{ height: { sx: 500 } }}>
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://dynamic-yield.linio.com//api/scripts/8767678/images/3791e959cd6b8__big_banner_2_linternacional.jpg"
                            alt="First slide"
                        />
                        <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://dynamic-yield.linio.com//api/scripts/8767678/images/1108c022b6bd8__linio_falabella_on_bb2_ext.jpg"
                            alt="Second slide"
                        />

                        <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://i.linio.com/cms/f01d0156-1cbc-11ed-8191-56c2aa9f22e9.webp"
                            alt="Third slide"
                        />

                        <Carousel.Caption></Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </Box>
        </Container>
    );
};
export default CarrusuelImages;
