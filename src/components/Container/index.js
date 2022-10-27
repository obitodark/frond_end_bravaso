import NavBars from '../NavBars';
import ProductCart from '../ProductCart';
import CarrusuelImages from '../CarrusuelImages';
import Layout from '../Layout';

const Container = () => {
    const styles = {
        root: {
            display: 'flex'
        }
    };
    return (
        <div sx={styles.root}>
            <NavBars />
            <CarrusuelImages />
            <ProductCart />
        </div>
    );
};
export default Container;
