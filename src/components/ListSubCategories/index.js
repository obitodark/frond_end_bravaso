import { Grid, Typography } from '@mui/material';
// import { v4 as uuidv4 } from 'uuid';
import { DataContext } from '../../Context/DataProvider';
import { useContext } from 'react';
import { DataAdminContext } from '../../Context/ContextAdmin/DataProviderAdmin';

const ListSubCategories = ({ idCategory }) => {
    const styles_list = {
        cursor: 'pointer',
        color: '#787878',
        ':hover': {
            color: '#6a5de3',
            background: 'rgba(0, 0, 0, .03)',
            transition: 'all 0.2s ease-in'
        }
    };
    const { productsByPaginacion } = useContext(DataAdminContext);

    const { listSubCategory, getFilterProduct, setFilterBySubCategory } = useContext(DataContext);

    const handleFilter = async (id_subcategory, data) => {
        // console.log('id unicos', uuidv4());

        // console.log('objeto', productsByPaginacion);
        const newObject = { ...productsByPaginacion, id_subcategory: id_subcategory, id_category: idCategory };
        getFilterProduct(newObject);
        setFilterBySubCategory(data);
    };
    return (
        <Grid container>
            {listSubCategory
                .filter((list) => list.id_category === idCategory)
                .map((listSubCategory, index) => (
                    <Typography
                        display="block"
                        key={index}
                        p={1}
                        variant="body2"
                        color="initial"
                        sx={styles_list}
                        onClick={() => handleFilter(listSubCategory.id, listSubCategory.products)}
                    >
                        {listSubCategory.name}
                    </Typography>
                ))}
        </Grid>
    );
};
export default ListSubCategories;
