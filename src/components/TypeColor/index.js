import { Grid, Typography } from '@mui/material';

const TypeColor = () => {
    return (
        <Grid direction="row" container spacing={1}>
            <Grid item>
                {' '}
                <Typography variant="body1" sx={{ background: 'red', padding: '12px', borderRadius: '12px' }}></Typography>
            </Grid>
            <Grid item>
                {' '}
                <Typography variant="body1" sx={{ background: 'red', padding: '12px', borderRadius: '12px' }}></Typography>
            </Grid>
            <Grid item>
                {' '}
                <Typography variant="body1" sx={{ background: 'red', padding: '12px', borderRadius: '12px' }}></Typography>
            </Grid>
            <Grid item>
                {' '}
                <Typography variant="body1" sx={{ background: 'red', padding: '12px', borderRadius: '12px' }}></Typography>
            </Grid>
        </Grid>
    );
};
export default TypeColor;
