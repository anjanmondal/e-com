import React from 'react';
import HeroBanner from '../../components/hero-banner/hero-banner';
import Categories from '../../components/categories/categories';
import BestSeller from '../../components/best-seller/best-seller';
import Cta from '../../components/call-to-action/cta';
import Newsletter from '../../components/newsletter/newsletter';

const Home = () => {
    return (
        <div className='page-common-margin-top'>
            <HeroBanner />
            <Categories />
            <BestSeller />
            <Cta />
            <Newsletter />
        </div>
    );
};

export default Home;