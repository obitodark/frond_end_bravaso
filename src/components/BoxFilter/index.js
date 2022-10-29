import { Grid, Container, Select, MenuItem, InputLabel, FormControl, TextField, InputAdornment, Button } from '@mui/material';
import { useContext, useState, useRef } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { DataContext } from '../../Context/DataProvider';
import { DataAdminContext } from '../../Context/ContextAdmin/DataProviderAdmin';

const BoxFilter = () => {
    const { setOpenBoxCategories, filterBySearch, filterBySubCategory, setFilterByProduct, getFilterProduct } = useContext(DataContext);
    const { productsByPaginacion } = useContext(DataAdminContext);
    const [age, setAge] = useState('');
    const [name, setName] = useState('');
    const [inputText, setInputText] = useState('');

    const handleChange = (e) => {
        setAge(e.target.value);
        let value = 0;
        if (e.target.value !== 'All') value = Number(e.target.value);

        const newObject = { ...productsByPaginacion, id_brands: value };
        getFilterProduct(newObject);
    };
    const handlechangePrice = async (event) => {
        let value = 0;
        setName(event.target.value);
        // const { value } = event.target;
        if (event.target.value === 'menor') {
            value = 1;
        }
        if (event.target.value === 'mayor') {
            value = 2;
        }
        const newObject = { ...productsByPaginacion, price: value };

        getFilterProduct(newObject);
    };
    function removeDuplicates(elements) {
        const dataArr = elements.map((item) => {
            return [item.name, item];
        }); // creates array of array
        var maparr = new Map(dataArr); // create key value pair from array of array

        return [...maparr.values()];
    }
    // function onlyUnique(value, index, self) {
    //     return self.indexOf(value[1]) === index;
    // }
    const hadleSearch = () => {
        if (inputText === '') return;
        // console.log('search :', inputText);
        const newObject = { ...productsByPaginacion, search: inputText };
        getFilterProduct(newObject);
    };
    const handleChangeInput = async (e) => {
        // const filtro = filterBySearch.filter((listUser) => listUser.name.toLowerCase().includes(e.target.value.toLowerCase()));
        // await setFilterByProduct(filtro);
        if (e.target.value === '') {
            const newObject = { ...productsByPaginacion, search: ' ' };
            getFilterProduct(newObject);
        }
        setInputText(e.target.value);
        // console.log('text', e.target.value);
    };

    return (
        <Container sx={{ background: ' #eeeeee', borderRadius: '5px', border: '1px rgba(0, 0, 0, .1) solid ' }}>
            <Grid container justifyContent="space-between" p={2} direction="row">
                <Grid item container xs={12} sm={12} lg={6} sx={{ justifyContent: { sm: 'center', lg: 'start' } }}>
                    <Grid item xs={12} sm={10} mb={1}>
                        <TextField
                            id="outlined-basic"
                            label="Search"
                            size="small"
                            variant="outlined"
                            fullWidth
                            onChange={handleChangeInput}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <SearchIcon sx={{ cursor: 'pointer', color: '#6A5DE3' }} onClick={hadleSearch} />
                                    </InputAdornment>
                                )
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    container
                    xs={12}
                    lg={6}
                    sx={{ justifyContent: { xs: 'center', sm: 'center', lg: 'end' } }}
                    spacing={1}
                    justifyContent="end"
                >
                    <Grid item minWidth={180}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Brands</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                // name={age}
                                defaultValue={1}
                                value={age}
                                label="Ordenar por"
                                onChange={handleChange}
                            >
                                <MenuItem value={'All'}>All</MenuItem>
                                {removeDuplicates(
                                    filterBySubCategory.map((list) => {
                                        // console.log('lista de marcars', list);
                                        return { name: list.brand.name, id: list.brand.id };
                                    })
                                ).map((list, index) => (
                                    <MenuItem key={index} value={list.id}>
                                        {list.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item minWidth={200}>
                        <FormControl fullWidth size="small">
                            <InputLabel id="demo-simple-select-label">Ordenar</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={name}
                                label="Ordenar por"
                                onChange={handlechangePrice}
                            >
                                <MenuItem value="menor">Menor a Mayor</MenuItem>
                                <MenuItem value="mayor">Mayor a Menor</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <Button variant="outlined" sx={{ display: { sm: 'block', lg: 'none' } }} onClick={() => setOpenBoxCategories(true)}>
                            Filtro
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default BoxFilter;
