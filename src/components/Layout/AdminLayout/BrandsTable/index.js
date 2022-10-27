import { Avatar, TextField, Paper, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, Typography } from '@mui/material';
import { useContext } from 'react';
import { DataContext } from '../../../../Context/DataProvider';
import { ButtonSecondary } from '../../../stylesComponentsButton';
import SearchIcon from '@mui/icons-material/Search';
import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import Swal from 'sweetalert2';
import BrandServices from '../../../../services/BrandsServices';

const BrandsTable = ({ setOpenModal }) => {
    const { listBrands, filterBrands, setFilterBrands, refreshBrands, setRefreshBrands } = useContext(DataContext);
    const { setDataBrands, dataBrands } = useContext(DataAdminContext);

    const handleOpenModal = (id, name) => {
        setDataBrands({
            ...dataBrands,
            name: name,
            update: true,
            name_buttom: 'Actulizar',
            title: 'Actulizar Brands',
            id: id
        });
        setOpenModal(true);
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: `Seguro que desea eliminar este  Marca?`,
            text: 'esta accion no podra ser revertido!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                await BrandServices.deleteBrands(id);
                setRefreshBrands(!refreshBrands);
                Swal.fire('Se ha Borrado', `Marcas eliminado`, 'success');
            }
        });
    };
    const handleSearchBrands = (e) => {
        const filter = listBrands.filter((listBrand) => listBrand.name.toLowerCase().includes(e.target.value.toLowerCase()));
        setFilterBrands(filter);
    };
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 750 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell colSpan={5}>
                            <Typography variant="h6" color="initial">
                                Marcas Registrados
                            </Typography>
                        </TableCell>
                        <TableCell align="right" colSpan={5}>
                            <TextField
                                id="outlined-search"
                                label="Search "
                                type="search"
                                size="small"
                                defaultValue=""
                                onChange={handleSearchBrands}
                            />
                            <SearchIcon sx={{ color: '#9A9A9A', paddingTop: '5px', fontSize: '30px' }} />
                        </TableCell>
                    </TableRow>

                    <TableRow>
                        <TableCell align="center">Id</TableCell>
                        <TableCell align="center">Avatar</TableCell>
                        <TableCell align="center">Name</TableCell>

                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filterBrands.length > 0 &&
                        filterBrands.map((listBrand, index) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell align="center" component="th" scope="row">
                                    {listBrand.id}
                                </TableCell>
                                <TableCell align="center">
                                    <Avatar sx={{ bgcolor: '#F1294B ', textTransform: 'uppercase' }}>b</Avatar>
                                </TableCell>
                                <TableCell align="center" component="th" scope="row">
                                    {listBrand.name}
                                </TableCell>

                                <TableCell align="center">
                                    <ButtonSecondary
                                        back_color_hover={'#6A96E9'}
                                        onClick={() => handleOpenModal(listBrand.id, listBrand.name)}
                                    >
                                        edit
                                    </ButtonSecondary>
                                </TableCell>
                                <TableCell align="center">
                                    <ButtonSecondary
                                        back_color={'#F1294B '}
                                        back_color_hover={'#E96A6A'}
                                        onClick={() => handleDelete(listBrand.id)}
                                    >
                                        delete
                                    </ButtonSecondary>
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default BrandsTable;
