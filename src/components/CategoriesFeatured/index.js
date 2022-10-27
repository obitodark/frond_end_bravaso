import { Grid, Typography, Container, Box, Card, CardMedia, CardActionArea, CardContent } from '@mui/material';
import { fontWeight } from '@mui/system';

const CategoriesFeatured = () => {
    const categories = [
        {
            name: 'Moda Hombre',
            image: 'https://dynamic-yield.linio.com//api/scripts/8767678/images/34c367695ec35__a6_695x289_colecciones-segmentacion-3.jpg'
        },
        {
            name: 'Moda Mujer',
            image: 'https://dynamic-yield.linio.com//api/scripts/8767678/images/253e97aa1edbb__814x190_2.jpg'
        },
        {
            name: 'Deco Hogar',
            image: 'https://dynamic-yield.linio.com//api/scripts/8767678/images/1c1f1341565fb__a3_1403x289_colecciones-segmentacion-3.jpg'
        },
        {
            name: 'Computo',
            image: 'https://dynamic-yield.linio.com//api/scripts/8767678/images/2f2143fcd995f__bt_app_laptops_generico_semana_app.jpg'
        }
    ];
    const styleCard = {
        background: 'E8E8E8',
        border: '1px black solid',
        borderRadius: '10px',
        position: 'relative'
    };
    return (
        <Box mt={5}>
            <Container maxWidth="xl">
                <Typography variant="h5" color="initial" px={3} sx={{ fontWeight: 350 }}>
                    Categorias Destacados
                </Typography>
                <Grid container spacing={2} p={3}>
                    <Grid item xs={12} sm={4}>
                        <Card>
                            <CardActionArea sx={{ position: 'relative' }}>
                                <CardMedia component="img" height="300" width="100" image={categories[3].image} alt="green iguana" />

                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                    sx={{ position: 'absolute', top: '5px', left: '5px' }}
                                >
                                    {categories[3].name}
                                </Typography>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item container xs={12} sm={8} spacing={2}>
                        {categories.map((category, index) => (
                            <Grid item xs={6} key={index}>
                                <Card>
                                    <CardActionArea sx={{ position: 'relative' }}>
                                        <CardMedia component="img" height="140" width="100" image={category.image} alt="green iguana" />

                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="div"
                                            sx={{ position: 'absolute', top: '5px', left: '5px' }}
                                        >
                                            {category.name}
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};
export default CategoriesFeatured;
