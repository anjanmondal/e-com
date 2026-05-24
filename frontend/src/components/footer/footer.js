import React from 'react';
import { Link } from 'react-router-dom';
import NavLogo from '../../assets/img/logo.png';
import { footerLinks } from '../../assets/assets';

const Footer = () => {
    return (
        <footer className='site-footer'>
            <div className='container'>
                <div className='row'>
                    <div className='col-xl-4 col-lg-3 pe-lg-5 mb-xxl-5 mb-xl-4 mb-4'>
                        <Link to='/' className='nav-brand'>
                            <img src={NavLogo} alt='BringIt Logo' className='nav-logo' />
                            <h2 className='nav-title'>Bring<span>It</span></h2>
                        </Link>
                        <p className='ptxt mt-4'>Delivering fresh groceries to your doorstep, fast, affordable and easy. Your one-stop solution for all grocery needs. </p>
                    </div>
                    <div className='col-xl-8 col-lg-9 ps-lg-5 mb-xxl-5 mb-xl-4'>
                        <div className='flex-wrap-column'>
                            {footerLinks.map((linkcolumn, index)=> (
                                <div className='footer-link-box' key={index}>
                                    <h3 className='footer-link-title'>{linkcolumn.title}</h3>
                                    <ul className='footer-link-list'>
                                        {linkcolumn.links.map((link, i)=>(
                                            <li key={i}>
                                                <Link to={link.url} className='footer-link'>{link.text}</Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className='col-12 bt-1 mt-xxl-5 mt-xl-5 mt-5'>
                        <p className='ptxt text-center pt-3'>&copy; Copyright {new Date().getFullYear()} BringIt. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;