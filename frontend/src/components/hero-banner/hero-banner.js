import React from 'react';
import BannerBgimg from '../../assets/img/banner-img-1.png';
import BannerBgimg2 from '../../assets/img/banner-img-2.png';
import { Link } from 'react-router-dom';

const HeroBanner = () => {
    return (
        <div className='hero-banner'>
            <div className='container hero-banner-bg'>
            <img src={BannerBgimg2} alt='Banner' className='banner-bg-img2' />
            <div className='row'> 
                <div className='col-xl-7 col-lg-6'>
                    <div className='banner-text-panel'>
                        <h2 className='hero-heading'>Freshness Delivered <span>Daily</span></h2>
                        <p className='ptxt pe-lg-5 mr-30pxsm'>Groceries at your fingertips, Your trusted grocery partner online. Straight from the farm to your door. Skip the line, not the essentials and shop fast eat fresh.</p>
                        <Link to='products/vegetables'><button className='site-btn mt-lg-4 mt-2'>Shop Now</button></Link>
                    </div>
                </div>
                <div className='col-xl-5 col-lg-6 d-lg-block d-none'>
                  <div className='banner-image-panel'>
                    <img src={BannerBgimg} alt='Banner' className='banner-bg-img' />
                  </div>
                </div>
            </div>
            </div>
        </div>
    );
};

export default HeroBanner;