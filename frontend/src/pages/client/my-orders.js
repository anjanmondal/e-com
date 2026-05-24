import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../context/app-context';
// import { dummyOrders } from '../../assets/assets';

const MyOrders = () => {

    const [myOrders, setMyOrders] = useState([]);
    const {currency, axios, user} = useAppContext();

    const fetchMyOrders = useCallback(async () => {
        try {
            const {data} = await axios.get('/api/order/user')
            if (data.success) { 
                setMyOrders(data.orders);
            }
        } catch (error) {
            console.log(error);
        }
    }, [axios]);

    useEffect(()=>{
        if (user){
            fetchMyOrders();
        }
    }, [user, fetchMyOrders])

    return (
        <div className='page-common-margin-top'>
            <div className='container my-5'>
                <div className='row pt-5'>
                    <div className='col-12'>
                        <h2 className='site-heading'>My Orders</h2>
                    </div>
                    {myOrders.map((order, index)=>(
                    <div className='col-12 mb-4' key={index}>
                        <div className='order-card'>
                           <div className='row gx-xl-0'>
                            <div className='col-xl-6 col-lg-6 col-md-6 col-sm-8'>
                                <p className='ptxt mb-sm-adjst'>Order Id: {order._id}</p>
                            </div>
                            <div className='col-xl-4 col-lg-3 col-md-3 col-sm-4'>
                                <p className='ptxt mb-sm-adjst'><strong>Payment:</strong> {order.paymentType}</p>
                            </div>
                            <div className='col-xl-2 col-lg-3 col-md-3 col-sm-12 text-md-end'>
                                <p className='ptxt'><strong>Total Amount:</strong> {currency || '$'}{order.amount}</p>
                            </div>
                           </div>
                           {order.items.map((item, index)=>(
                                <div key={index} className={`row gx-xl-0 ${index !== order.items.length - 1 ? 'order-border-bottom' : ''}`}>
                                    <div className='col-xl-1 col-lg-1 col-md-1 my-md-auto'>
                                       <img src={item.product.image[0]} alt={item.product.name} className='order-card-item-image' />
                                    </div>
                                    <div className='col-xl-5 col-lg-5 col-md-5 my-md-auto ps-md-5 ps-lg-5 ps-xl-0'>
                                        <h6 className='site-amtxt-heading mb-1 mt--adjstmnt line-clamp-1'>{item.product.name}</h6>
                                        <p className='ptxt mb-1'>Category: {item.product.category}</p>
                                    </div>
                                    <div className='col-xl-4 col-lg-4 col-md-3 my-md-auto'>
                                       <p className='ptxt text-prmry mb-1'>Quantity: {item.quantity || '1'}</p>
                                       <p className='ptxt text-prmry mb-1'>Status: {order.status}</p>
                                       <p className='ptxt text-prmry mb-1'>Date: {new Date(order.createdAt).toDateString()}</p>
                                    </div>
                                    <div className='col-xl-2 col-lg-2 col-md-3 my-md-auto text-md-end'>
                                        <p className='ptxt mb-1'>Amount: {currency || '$'}{item.product.offerPrice * item.quantity}</p>
                                    </div>
                                </div>
                           ))}
                        </div>
                    </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyOrders;