import { Container, Grid } from '@mui/material';
import { ViewRegistrationUser } from '../../components';

const RegistrationUser = () => {
    return (
        <Container maxWidth="xl">
            <Grid container justifyContent="center" mt={10}>
                <Grid item>
                    <ViewRegistrationUser />
                </Grid>
                <Grid item></Grid>
            </Grid>
        </Container>
    );
};
export default RegistrationUser;
