import React from 'react';

const Newsletter = () => {
    return (
        <div className='container my-5'>
          <div className='row justify-content-center'>
            <div className='col-xl-7 col-lg-9 col-md-10'>
                <h2 class="site-heading text-center mb-3">Never Miss A Deal !</h2>
                <p className='ptxt text-center'>Subscribe to get the latest offers, new arrivals, and exclusive discounts.</p>
                <div className='d-flex mt-4'>
                    <input type="email" class="form-control form-controll me-3" placeholder="Enter your email" />
                    <button class="site-btn">Subscribe</button>
                </div>
            </div>
          </div>
        </div>
    );
};

export default Newsletter;