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

export default function CarruselProduct() {
    const { setOpenBoxCategories, setFilterByProduct, filterByProduct, listProduct } = useContext(DataContext);
    return (
        <>
            <div>
                <Swiper
                    // slidesPerView={3}
                    // spaceBetween={30}

                    slidesPerGroup={2}
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
                            slidesPerView: 6,
                            spaceBetween: 20
                        }
                    }}
                >
                    {listProduct.length > 0 &&
                        listProduct.map((data, index) => (
                            <SwiperSlide key={index + 1}>
                                <CartProducts data={data} />
                            </SwiperSlide>
                        ))}
                </Swiper>
            </div>
        </>
    );
}
