import { Grid, Typography, Container, Box } from '@mui/material';
import { useContext } from 'react';
import {
    ViewProductCart,
    ViewCarrusuelimages,
    ViewCarruselProduct,
    ViewCategoriesFeatured,
    ViewCarruselImagesBrands
} from '../../components';
import { DataContext } from '../../Context/DataProvider';

const ListProduct = () => {
    const { listProduct } = useContext(DataContext);

    return (
        <Box>
            <ViewCarrusuelimages />

            <Container maxWidth="xl">
                {/* <ViewCategoriesFeatured /> */}
                <Grid container justifyContent="center" spacing={3} mt={5}>
                    <Grid item xs={12}>
                        <Typography variant="h5" color="initial" sx={{ fontWeight: '300', color: 'rgba(102,102,102)' }}>
                            Productos Recomendados
                        </Typography>
                        <ViewCarruselProduct data={listProduct} />
                    </Grid>
                </Grid>

                <Grid>
                    <ViewProductCart />
                </Grid>
                <Grid>
                    <Typography variant="h5" color="initial" my={3} sx={{ fontWeight: '300', color: 'rgba(102,102,102)' }}>
                        Marcas reconocidas
                    </Typography>
                    <ViewCarruselImagesBrands />
                </Grid>
            </Container>
        </Box>
    );
};

export default ListProduct;
