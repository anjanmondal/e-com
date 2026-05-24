import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { categories } from './../../assets/assets';
import { useNavigate } from 'react-router-dom';


const Categories = () => {
    const navigate = useNavigate();
    const scrollToTop = () => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    }

    return (
    <>
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-12'>
                    <h4 className='site-amtxt-heading'>Shop by categories</h4>
                </div>
                <div className='col-12'>
                          <Swiper
                            spaceBetween={30}
                            loop={true}
                            autoplay={{
                                delay: 2500,
                                pauseOnMouseEnter: true,
                                disableOnInteraction: true,
                                reverseDirection: false,
                            }}
                            pagination={{
                            clickable: true,
                            dynamicBullets: true,
                            }}
                            modules={[Pagination]}
                            className="mySwiper"
                            breakpoints={{
                                0: {
                                    slidesPerView: 1,
                                },
                                360: {
                                    slidesPerView: 2,
                                },
                                768: {
                                    slidesPerView: 3,
                                },
                                992: {
                                    slidesPerView: 4,
                                },
                                1200: {
                                    slidesPerView: 6,
                                },
                            }}>

                            {categories.map((category, index) => {
   

  return (
    <SwiperSlide key={index}>
      <div 
        style={{ backgroundColor: category.bgColor }} 
        className='category-card' 
        onClick={() => { navigate(`/products/${category.path}`); scrollToTop(); }}
      >
        <img src={category.image} alt={category.text} />
      </div>
      <h6 
        className='category-card-heading' 
        onClick={() => navigate(`/products/${category.path}`)}
      >
        {category.text}
      </h6>
    </SwiperSlide>
  );
})}
                           
                        </Swiper>
                </div>
            </div>
        </div>
    </>
    );
};

export default Categories;