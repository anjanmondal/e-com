import React, { useEffect } from 'react';
import NavLogo from '../../assets/img/logo.png';
import SearchIcon from '../../assets/img/search-icon.png';
import CartIcon from '../../assets/img/cart-icon.png';
import MenuIcon from '../../assets/img/menu-icon.png';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/app-context';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import LoginModal from '../login/login';
import toast from 'react-hot-toast';

const Navbar = () => {

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [modalShow, setModalShow] = useState(false);

    const {user, setUser, SearchQuery, setSearchQuery, getCartCount, axios} = useAppContext();

    const navigate = useNavigate();

    const logout = async ()=>{
        try {
            const {data} = await axios.get('/api/user/logout');
            if (data.success) {
                toast.success(data.message);
                setUser(null);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    useEffect(()=>{
        if (SearchQuery.length > 0) {
            navigate('/products')
        }
    },[SearchQuery, navigate])

    return (
        <>
        <header className='site-header'>
            <nav className='container'>
                <div className='row'>
                    <div className='col-xl-2 col-lg-3 col-md-3 col-6'>
                        <Link to='/' className='nav-brand'>
                            <img src={NavLogo} alt='BringIt Logo' className='nav-logo' />
                            <h1 className='nav-title'>Bring<span>It</span></h1>
                        </Link>
                    </div>
                    <div className='col-xl-10 col-lg-9 col-md-9 col-6'>
                        <div className='d-flex justify-content-end align-items-center'>
                           <div className='search-box smscreen-off'>
                             <img src={SearchIcon} alt='Search Icon' className='search-icon' />
                             <input onChange={(e)=> setSearchQuery(e.target.value)} type='text' className='search-input' placeholder='Search for products...' />
                           </div>
                           <Link to='/cart' className='cart-icon-box'>
                             <div className='cart-count'>{getCartCount()}</div>
                             <img src={CartIcon} alt='Cart Icon' className='cart-icon' />
                           </Link>

                           {/* whenever the user is logedin then show this my orders button */}
                           {user &&
                           <Link to='/my-orders' className='nav-order-link lgscreen-only'>My Orders</Link>
                           }

                           {/* whenever the user is logedin then shows the logout button & whenever is not logedin then shows the login button */}
                           {!user ? (<button className='site-btn lgscreen-only' onClick={() => setModalShow(true)}>Login</button>):(<button onClick={logout} className='site-btn-inactive2 lgscreen-only'>Logout</button>)}

                           {/* mobile hamburger menu icon */}
                           <img src={MenuIcon} alt='Menu Icon' className='menu-icon mdscreen-only' onClick={handleShow} />

                        </div>
                    </div>
                </div>
            </nav>
        </header>

        {/* mobile menu */}
        <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
                <Link to='/' className='nav-brand'>
                    <img src={NavLogo} alt='BringIt Logo' className='nav-logo' />
                    <h1 className='nav-title'>Bring<span>It</span></h1>
                </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
            <div className='search-box mb-4'>
                <img src={SearchIcon} alt='Search Icon' className='search-icon' />
                <input onChange={(e)=> setSearchQuery(e.target.value)} type='text' className='search-input' placeholder='Search for products...' />
            </div>
            <div className='d-flex flex-column'>
                { user &&
                <Link to='/my-orders' className='nav-order-link-lg c-pointer'>My Orders</Link>
                }
                {!user ? (<span className='nav-order-link-lg c-pointer' onClick={() => setModalShow(true)}>Login</span>):(<span onClick={logout} className='nav-order-link-lg c-pointer'>Logout</span>)}
            </div>
            <p className='mm-copyright-text'>&copy; <span>{(new Date().getFullYear())}</span> Bringit all rights reserved.</p>
        </Offcanvas.Body>
        </Offcanvas>

        {/* Login modal */}
        <LoginModal show={modalShow} onHide={() => setModalShow(false)} />
        </>
    );
};

export default Navbar;