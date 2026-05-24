import React from 'react';
import CTABannerImgLg from '../../assets/img/cta-banner-lg.png';
import CTABannerImgSm from '../../assets/img/cta-banner-sm.png';
import CTADecorBt from '../../assets/img/cta-bottom-decor.png';
import CTADecorTp from '../../assets/img/cta-top-decor.png';
import FastDeliveryIcon from '../../assets/img/fast-delivery-icon.png';
import FreshnessIcon from '../../assets/img/freshness-icon.png';
import AffordableIcon from '../../assets/img/affordable-icon.png';
import TrustedIcon from '../../assets/img/trusted-icon.png';

const Cta = () => {
    return (
        <div className="container position-relative cta-container-sm">
            <img src={CTABannerImgLg} alt='cta-banner' className='cta-banner-lg' />
            <img src={CTABannerImgSm} alt='cta-banner' className='cta-banner-sm' />
            <img src={CTADecorBt} alt='cta-decor' className='cta-decor-bt' />
            <img src={CTADecorTp} alt='cta-decor' className='cta-decor-tp' />
            <div className='row justify-content-center justify-content-lg-end align-items-center cta-banner-content'>
               <div className='col-xxl-6 col-xl-6 col-lg-6 cta-content-padding'>
                    <h2 className='hero-heading pe-lg-5'> Excellence Redefined, Why we are <span>the best ?</span></h2>
                    <div className='d-flex flex-lg-column flex-wrap'>
                        <div className='d-flex gap-3 mt-4'>
                        <div className='cta-icon-box'><img src={FastDeliveryIcon} alt='delivery-icon' /></div>
                        <div className='cta-text-box'>
                                <h3 className='cta-heading'>Fast Delivery</h3>
                                <p className='cta-text'>Groceries delivered in under 30 minutes.</p>
                        </div>
                        </div>
                        <div className='d-flex gap-3 mt-2'>
                        <div className='cta-icon-box'><img src={FreshnessIcon} alt='delivery-icon' /></div>
                        <div className='cta-text-box'>
                                <h3 className='cta-heading'>Freshness Guaranteed</h3>
                                <p className='cta-text'>Fresh produce straight from the source.</p>
                        </div>
                        </div>
                        <div className='d-flex gap-3 mt-2'>
                        <div className='cta-icon-box'><img src={AffordableIcon} alt='delivery-icon' /></div>
                        <div className='cta-text-box'>
                                <h3 className='cta-heading'>Affordable Prices</h3>
                                <p className='cta-text'>Quality groceries at unbeatable prices.</p>
                        </div>
                        </div>
                        <div className='d-flex gap-3 mt-2'>
                        <div className='cta-icon-box'><img src={TrustedIcon} alt='delivery-icon' /></div>
                        <div className='cta-text-box'>
                                <h3 className='cta-heading'>Trusted by Thousands</h3>
                                <p className='cta-text'>Loved by 10,000+ happy customers.</p>
                        </div>
                        </div>
                    </div>
               </div>
            </div>
        </div>
    );
};

export default Cta;