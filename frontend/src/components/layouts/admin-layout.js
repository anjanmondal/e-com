import React from 'react';
// importing outlet from react-router-dom to render child routes
import { Outlet, NavLink, Link } from 'react-router-dom';
import { useAppContext } from "../../context/app-context";
import BringitLogo from '../../assets/img/logo.png';
// import NavLogo from '../../assets/img/logo.png';
import UserIcon from '../../assets/img/user.png';
// import BellIcon from '../../assets/img/bell.png';
import MenuIcon from '../../assets/img/menu-icon.png';
import BrowserIcon from '../../assets/img/browser-icon.png';
import SearchIcon from '../../assets/img/search-icon.png';
import DashboardIcon from '../../assets/img/dashboard-icon.png';
import AddProductIcon from '../../assets/img/add-product-icon.png';
import ProductListIcon from '../../assets/img/product-list-icon.png';
import OrderReceivedIcon from '../../assets/img/order-received-icon.png';
import UsersIcon from '../../assets/img/users-icon.png';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

const AdminLayout = () => {

    const { SearchQuery, setSearchQuery, setIsSeller, axios } = useAppContext();

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();

    const sidebarLinks = [
        { name: "Dashboard", path: "/admin/dashboard", icon: DashboardIcon },
        { name: "Add Product", path: "/admin/add-product", icon: AddProductIcon },
        { name: "Products List", path: "/admin/product-list", icon: ProductListIcon },
        { name: "Orders", path: "/admin/orders", icon: OrderReceivedIcon },
        { name: "Users", path: "/admin/users", icon: UsersIcon },
    ];

    const Logout = async () => {
        try {
            const {data} = await axios.get('/api/admin/logout');
            if (data.success) {
                toast.success(data.message)
                setIsSeller(false)
                navigate('/admin')
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if (SearchQuery.length > 0) {
            navigate('/admin/product-list')
        }
    },[SearchQuery, navigate])

    return (
                <>
                    <div className="site-header">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-xl-5 col-md-3 col-6">
                                        <div className="nav-brand">
                                            <img src={BringitLogo} className='nav-logo' alt='logo' />
                                            <h2 className='nav-title'>bring<span>it</span></h2>
                                        </div>
                                </div>
                                <div className="col-xl-7 col-md-9 col-6">
                                    <div className="d-lg-flex d-none justify-content-end align-items-center gap-4">
                                        <div className='search-box me-0'>
                                            <img src={SearchIcon} alt='Search Icon' className='search-icon' />
                                            <input type='text' onChange={(e)=> setSearchQuery(e.target.value)} className='search-input' placeholder='Search for products...' />
                                        </div>
                                        <Link to='/' target='_blank' >
                                            <img src={BrowserIcon} alt='Frontend' className='browser-icon' />
                                        </Link>
                                        {/* <div className="notification-icon">
                                            <img src={BellIcon} alt="notification" />
                                            <span className="notification-count">0</span>
                                        </div> */}
                                        <img src={UserIcon} className='user-icon c-not-allowed' alt='user' />
                                        <p className="ptxt mb-0 disp-br">Hi! Admin</p>
                                        <button onClick={Logout} className='site-btn-inactive2'>Logout</button>
                                    </div>
                                    <div className='d-flex d-lg-none justify-content-end mt-md-2'>
                                        <Link to='/' target='_blank' >
                                            <img src={BrowserIcon} alt='Frontend' className='browser-icon frontend-admin-icon-align' />
                                        </Link>
                                        {/* mobile hamburger menu icon */}
                                        <img src={MenuIcon} alt='Menu Icon' className='menu-icon mdscreen-only' onClick={handleShow} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="admin-sidebar">
                        {sidebarLinks.map((item) => (
                            <NavLink
                                to={item.path}
                                key={item.name}
                                end={item.path === '/admin'}
                                className={({ isActive }) =>
                                    `side-bar-link ${isActive ? "link-active" : "link-inactive"}`
                                }
                            >
                                <img src={item.icon} alt={item.name} className="sidebar-icon" />
                                <span>{item.name}</span>
                            </NavLink>
                        ))}
                    </div>

                    {/* mobile menu */}
                    <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                            <Link to='/admin' className='nav-brand'>
                                {/* <img src={NavLogo} alt='BringIt Logo' className='nav-logo' /> */}
                                <h1 className='nav-title'>Hi! <span>Admin</span></h1>
                            </Link>
                    </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <div className='search-box mb-4'>
                            <img src={SearchIcon} alt='Search Icon' className='search-icon' />
                            <input onChange={(e)=> setSearchQuery(e.target.value)} type='text' className='search-input' placeholder='Search for products...' />
                        </div>
                        <div className='d-flex flex-column'>
                            <Link to='/admin/dashboard' className='nav-order-link-lg c-pointer'>Dashboard</Link>
                            <Link to='/admin/add-product' className='nav-order-link-lg c-pointer'>Add Product</Link>
                            <Link to='/admin/product-list' className='nav-order-link-lg c-pointer'>Product List</Link>
                            <Link to='/admin/orders' className='nav-order-link-lg c-pointer'>Orders</Link>
                            <Link to='/admin/users' className='nav-order-link-lg c-pointer'>Users</Link>
                            <span onClick={Logout} className='nav-order-link-lg c-pointer'>Logout</span>
                        </div>
                        <p className='mm-copyright-text'>&copy; <span>{(new Date().getFullYear())}</span> Bringit all rights reserved.</p>
                    </Offcanvas.Body>
                    </Offcanvas>
                    <Outlet />
                </>
    );
};

export default AdminLayout;