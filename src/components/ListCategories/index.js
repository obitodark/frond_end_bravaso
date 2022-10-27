// import Accordion from 'react-bootstrap/Accordion';
// import ListGroup from 'react-bootstrap/ListGroup';

import { Typography } from '@mui/material';
import { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import { DataContext } from '../../Context/DataProvider';
import MuiAccordion from '@mui/material/Accordion';
import ListSubCategories from '../ListSubCategories';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordionDetails from '@mui/material/AccordionDetails';

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0
    },
    '&:before': {
        display: 'none'
    }
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)'
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1)
    }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: '1px solid rgba(0, 0, 0, .125)'
}));
const ListCategories = () => {
    const { listCategory } = useContext(DataContext);
    const [expanded, setExpanded] = useState('');
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };
    return (
        <div>
            {listCategory.length > 0 &&
                listCategory.map((listCategory, index) => (
                    <Accordion key={index} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                            <Typography variant="body2">{listCategory.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <ListSubCategories idCategory={listCategory.id} />
                            {/* {console.log(
                                'subcategories',
                                listSubCategory.filter((list) => list.id_category === 3)
                            )} */}
                        </AccordionDetails>
                    </Accordion>
                ))}
        </div>
    );
};
export default ListCategories;

//lista para boostrap react

// <Accordion.Item eventKey={index} key={index}>
//     <Accordion.Header>{listCategory.name}</Accordion.Header>
//     <Accordion.Body>
//         <ListGroup variant="flush">
//             <ListSubCategories listSubCategories={listSubCategories[index]} idCategories={listCategory.id} />
//         </ListGroup>
//     </Accordion.Body>
// </Accordion.Item>
