// import Products from '../Products';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './styles.css';

// import required modules
import { Pagination, Navigation } from 'swiper';
import { DataContext } from '../../Context/DataProvider';
import { useState, useContext } from 'react';
import CartProducts from '../CartProducts';
import { Grid } from '@mui/material';

export default function CarruselImagesBrands() {
    const { setOpenBoxCategories, setFilterByProduct, filterByProduct, listProduct } = useContext(DataContext);
    const brands = [
        'https://rodavigo.net/datos/logos-marcas-png/th_newport.png',
        'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/New_Balance_logo.svg/245px-New_Balance_logo.svg.png',
        'https://tentulogo.com/wp-content/uploads/Adidas-Twitter.jpg'

        // 'https://www.america-retail.com/static//2022/03/puma.png',
        // 'https://i.pinimg.com/originals/87/06/39/870639883348ac2df7c6bab980e16e5c.gif',
        // 'https://www.america-retail.com/static//2022/03/puma.png',
        // 'https://i.pinimg.com/originals/87/06/39/870639883348ac2df7c6bab980e16e5c.gif'
    ];
    return (
        <>
            <div>
                <Swiper
                    // slidesPerView={3}
                    // spaceBetween={30}

                    slidesPerGroup={1}
                    loop={true}
                    loopFillGroupWithBlank={true}
                    pagination={{
                        clickable: true
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                    breakpoints={{
                        // when window width is >= 320px
                        320: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        // when window width is >= 480px
                        480: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 3,
                            spaceBetween: 15
                        },

                        920: {
                            slidesPerView: 4,
                            spaceBetween: 20
                        },
                        1240: {
                            slidesPerView: 5,
                            spaceBetween: 20
                        }
                    }}
                >
                    {brands.length > 0 &&
                        brands.map((data, index) => (
                            <SwiperSlide key={index + 1}>
                                <Grid
                                    item
                                    sx={{ border: '1px #BFBFBF solid', borderRadius: '8px', width: '120px', height: '100px' }}
                                    p={1}
                                    m={0.5}
                                >
                                    <img width={50} height={100} src={data} alt="" />
                                </Grid>
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </>
    );
}
