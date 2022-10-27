import { List, ListItem, ListItemText, ListItemIcon, Box, Divider } from '@mui/material';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import EqualizerOutlinedIcon from '@mui/icons-material/EqualizerOutlined';
const ListNavMenu = () => {
    return (
        <Box>
            <List>
                <ListItem button components="nav">
                    <ListItemIcon>
                        <PersonOutlineOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="home" />
                </ListItem>
                <ListItem button components="nav">
                    <ListItemIcon>
                        <ShoppingBagOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Venta" />
                </ListItem>
                <ListItem button components="nav">
                    <ListItemIcon>
                        <EqualizerOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Grafico" />
                </ListItem>
                <Divider />
                <ListItem button components="nav">
                    <ListItemIcon>
                        <TextSnippetOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Reporte" />
                </ListItem>
                <ListItem button components="nav">
                    <ListItemIcon>
                        <FolderOpenOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Acceso" />
                </ListItem>
            </List>
        </Box>
    );
};
export default ListNavMenu;
