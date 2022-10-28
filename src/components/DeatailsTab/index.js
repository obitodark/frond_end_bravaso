import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DetailsTable from '../DetailsTable';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

export default function BasicTabs({ dataProduct }) {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* {console.log(dataProduct)} */}

            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab label="Detalles" {...a11yProps(0)} />
                    <Tab label="Especificaciones" {...a11yProps(1)} />
                    <Tab label="Comentarios" {...a11yProps(2)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <Typography variant="body1" color="initial" sx={{ color: '#8A8989' }}>
                    {dataProduct.description}
                </Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <DetailsTable dataProduct={dataProduct} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Sin Comentarios ...
            </TabPanel>
        </Box>
    );
}
