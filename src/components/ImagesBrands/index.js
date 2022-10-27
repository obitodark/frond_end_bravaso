import { Grid } from '@mui/material';
const ImagesBrands = () => {
    const brands = [
        'https://rodavigo.net/datos/logos-marcas-png/th_newport.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/245px-New_Balance_logo.svg.png',
        'https://tentulogo.com/wp-content/uploads/Adidas-Twitter.jpg',

        'https://www.america-retail.com/static//2022/03/puma.png',
        'https://i.pinimg.com/originals/87/06/39/870639883348ac2df7c6bab980e16e5c.gif'
    ];
    return (
        <div>
            <Grid container spacing={0}>
                {brands.map((brand, index) => (
                    <Grid item lg={10} xl={5} key={index} sx={{ border: '1px #BFBFBF solid', borderRadius: '8px' }} p={1} m={0.5}>
                        <img width={100} src={brand} alt="" />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};
export default ImagesBrands;
