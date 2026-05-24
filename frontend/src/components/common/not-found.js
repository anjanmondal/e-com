import React from 'react';
import ErrorImg from '../../assets/img/error-img.jpg';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='page-common-margin-top'>
            <div className='container'>
                <div className='row'>
                   <div className='col-12'>
                     <div className='d-flex justify-content-center text-center'>
                        <img src={ErrorImg} alt='error-image' className='img-404'/>
                     </div>
                        <h2 className='site-heading text-center'>This page doesn’t exist.</h2>
                        <p className='ptxt text-center'>Looks like you entered a page which doesn’t exist anymore. Let’s take you back to home.</p>
                     <div className='d-flex justify-content-center text-center mt-4'>
                        <Link to='/'>
                            <button className='site-btn'>Go to home</button>
                        </Link>
                     </div>
                   </div>
                </div>
            </div>

        </div>
    );
};

export default NotFound;