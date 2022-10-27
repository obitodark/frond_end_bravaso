import * as React from 'react';
import { Typography, TableRow, TableHead, TableContainer, TableCell, TableBody, Table, IconButton, Collapse, Box } from '@mui/material';

import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import { DataContext } from '../../../../Context/DataProvider';
import { useContext, useState } from 'react';
import { ButtonSecondary } from '../../../stylesComponentsButton';

import AddIcon from '@mui/icons-material/Add';

import { DataAdminContext } from '../../../../Context/ContextAdmin/DataProviderAdmin';
import Category from '../../../../services/categoryServices';
import SubCategory from '../../../../services/SubcategoryServices';
import Swal from 'sweetalert2';
function Row(props) {
    const { listSubCategory, category, setOpenModal } = props;
    const { CategoriesDataUtils, setCategoriesDataUtils } = useContext(DataAdminContext);
    const [open, setOpen] = useState(false);
    const handleCloseModal = (id, name) => {
        setCategoriesDataUtils({
            ...CategoriesDataUtils,
            id: id,
            name: name,
            title: 'Update',
            name_buttom: 'Update',
            label: 'Categoria',
            update: true,
            categories: true
        });
        setOpenModal(true);
    };
    const handleUpdateSubcategories = (id, name, idcategories) => {
        setCategoriesDataUtils({
            ...CategoriesDataUtils,
            title: 'Update',
            id: id,
            name: name,
            update: true,
            label: 'SubCategoria',
            id_category: idcategories,
            name_buttom: 'Actulizar',
            categories: false
        });
        setOpenModal(true);
    };

    const handleDelete = async (id, type) => {
        Swal.fire({
            title: `Seguro que desea eliminar este ${type}?`,
            text: 'esta accion no podra ser revertido!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Aceptar'
        }).then((result) => {
            if (result.isConfirmed) {
                if (type === 'Categoria') {
                    handleDeleteCategory(id);
                } else {
                    handleDeleteSubCategory(id);
                }

                Swal.fire('Se ha Borrado', `${type} eliminado`, 'success');
            }
        });
    };
    const handleDeleteCategory = async (id) => {
        await Category.deleteCategory(id);
        window.location.reload();
    };
    const handleDeleteSubCategory = async (id) => {
        await SubCategory.deleteSubcategory(id);
        window.location.reload();
    };
    const handleCreateSubCategories = (idcategories) => {
        setCategoriesDataUtils({
            ...CategoriesDataUtils,
            title: 'Create',
            name: '',
            update: false,
            label: 'SubCategoria',
            id_category: idcategories,

            name_buttom: 'Crear',
            categories: false
        });

        setOpenModal(true);
    };

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell align="center">{category.id}</TableCell>
                <TableCell align="center">{category.name}</TableCell>
                <TableCell align="center">({category.product.length})</TableCell>
                <TableCell align="center">
                    <ButtonSecondary onClick={() => handleCloseModal(category.id, category.name)} back_color="#5799D9">
                        Edit
                    </ButtonSecondary>
                </TableCell>
                <TableCell align="center">
                    <ButtonSecondary onClick={() => handleDelete(category.id, 'Categoria')} back_color="#E33C53">
                        Delete
                    </ButtonSecondary>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse
                        in={open}
                        timeout="auto"
                        unmountOnExit
                        sx={{ background: '#F3EEE8', borderRadius: '7px', margin: '0px,10px' }}
                    >
                        <Box sx={{ margin: 3 }}>
                            <Typography variant="h6" mx={2} gutterBottom component="div" display="inline">
                                Sub-Categories {'- ' + category.name}
                            </Typography>
                            <ButtonSecondary
                                size="small"
                                back_color="#5BDBAE "
                                back_color_hover="#97E3C8 "
                                onClick={() => handleCreateSubCategories(category.id)}
                            >
                                <AddIcon sx={{ fontSize: '15px' }} />
                            </ButtonSecondary>

                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Id</TableCell>
                                        <TableCell align="center">Name</TableCell>
                                        <TableCell align="center">#item</TableCell>
                                        <TableCell align="center"></TableCell>
                                        <TableCell align="center"></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {listSubCategory
                                        .filter((li) => li.id_category === category.id)
                                        .map((subcategories, index) => (
                                            <TableRow key={index}>
                                                <TableCell align="center" component="th" scope="row">
                                                    {subcategories.id}
                                                </TableCell>

                                                <TableCell align="center">{subcategories.name}</TableCell>
                                                <TableCell align="center">{subcategories.products.length}</TableCell>
                                                <TableCell align="center">
                                                    <Typography
                                                        variant="body2"
                                                        onClick={() =>
                                                            handleUpdateSubcategories(subcategories.id, subcategories.name, category.id)
                                                        }
                                                        color="initial"
                                                        fontWeight={700}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        Edit
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Typography
                                                        variant="body2"
                                                        onClick={() => handleDelete(subcategories.id, 'SubCategoria')}
                                                        color="initial"
                                                        fontWeight={700}
                                                        sx={{ cursor: 'pointer' }}
                                                    >
                                                        Delete
                                                    </Typography>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CategoriesTable({ setOpenModal }) {
    const { listCategory, listSubCategory } = useContext(DataContext);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell align="center">Id_Categories</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">#Products</TableCell>
                        <TableCell align="center"></TableCell>
                        <TableCell align="center"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {listCategory.length > 0 &&
                        listCategory.map((category, index) => (
                            <Row key={index} category={category} listSubCategory={listSubCategory} setOpenModal={setOpenModal} />
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
