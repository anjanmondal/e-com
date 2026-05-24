import React from 'react';
import { useNavigate } from 'react-router-dom';
import AddProductIcon2 from '../../assets/img/add-product-icon-2.png';
import RightArrowIcon from '../../assets/img/right-arrow.png';
import ProductListIcon2 from '../../assets/img/pick-list.png';
import OrdersIcon2 from '../../assets/img/received.png';
import { useEffect, useState, useCallback } from 'react';
import { useAppContext } from '../../context/app-context';
import UserIcon from '../../assets/img/user-icon.png';
import MailIcon from '../../assets/img/mail.png';
// import CallIcon from '../../assets/img/call.png';
import toast from 'react-hot-toast';

const Dashboard = () => {

    const {axios} = useAppContext();
    const [ users, setUsers] = useState([]);
    const fetchUsers = useCallback(async ()=>{
        try {
            const {data} = await axios.get('/api/user/admin');
            if (data.success) {
                setUsers(data.users);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [axios]);

    useEffect(()=>{
        fetchUsers();
    }, [fetchUsers]);

    const navigate = useNavigate();
    return (
        <div className='admin-common-gapping'>
            <h2 className='admin-hero-heading'>Welcome Back to Dashboard</h2>
            <div className='container-fluid pb-2'>
                <div className='row pt-3 mb-5'>
                    <div className='col-xl-3 col-md-6 mb-4 mb-xl-0'>
                        <div className='admin-db-box' onClick={()=>navigate('/admin/add-product')}>
                            <div className='d-flex align-items-center gap-3'>
                                <img src={AddProductIcon2} alt='add product' className='db-card-icon' />
                                <div>
                                    <h4 className='db-card-head'>Add Product</h4>
                                    <p className='db-card-sub-head'>Add products directly from here</p>
                                    <span className='db-card-btn'>Add more<img src={RightArrowIcon} alt='right arrow icon' /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-3 col-md-6 mb-4 mb-xl-0'>
                        <div className='admin-db-box' onClick={()=>navigate('/admin/product-list')}>
                            <div className='d-flex align-items-center gap-3'>
                                <img src={ProductListIcon2} alt='add product' className='db-card-icon' />
                                <div>
                                    <h4 className='db-card-head'>Product List</h4>
                                    <p className='db-card-sub-head'>View all products from here</p>
                                    <span className='db-card-btn'>View now<img src={RightArrowIcon} alt='right arrow icon' /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-3 col-md-6 mb-4 mb-xl-0'>
                        <div className='admin-db-box' onClick={()=>navigate('/admin/orders')}>
                            <div className='d-flex align-items-center gap-3'>
                                <img src={OrdersIcon2} alt='add product' className='db-card-icon' />
                                <div>
                                    <h4 className='db-card-head'>Orders</h4>
                                    <p className='db-card-sub-head'>View all orders from here</p>
                                    <span className='db-card-btn'>View now<img src={RightArrowIcon} alt='right arrow icon' /></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className='admin-hero-heading2'>New users at a glance</h2>
            <div className='container-fluid pb-5'>
                {users.slice(0,5).map((user, index)=>(
                   <div key={index} className='row'>
                        <div className='col-xl-9'>
                            <div className='d-flex admin-user-card mb-3'>
                                <img src={UserIcon} alt='user-icon' className='admin-user-list-user-icon' />
                                <div className='d-flex gap-sm-4 gap-2 flex-wrap'>
                                    <p className='admin-order-card-txt'><strong>{user.name}</strong></p>
                                    <p className='admin-order-card-txt'><img src={MailIcon} alt='mail-icon' className='admin-user-call-icon' />{user.email}</p>
                                    {/* <p className='admin-order-card-txt'><img src={CallIcon} alt='call-icon' className='admin-user-call-icon' />{user.phone}</p> */}
                                    <p className='admin-order-card-txt'>User ID - {user._id}</p>
                                    {/* <p className='admin-order-card-txt'>Password - {user.password}</p> */}
                                </div>
                            </div>
                        </div>
                   </div>
                ))}
                <span onClick={()=>navigate('/admin/users')} className='db-card-btn'>Show more<img src={RightArrowIcon} alt='right arrow icon' /></span>
            </div>
        </div>
    );
};

export default Dashboard;