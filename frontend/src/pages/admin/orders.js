import React, { useState, useEffect, useCallback } from 'react';
import { useAppContext } from '../../context/app-context';
// import { dummyOrders } from '../../assets/assets';
import toast from 'react-hot-toast';

const Orders = () => {

    const {currency, axios} = useAppContext();
    const [ orders, setOrders ] = useState([]);

const fetchOrders = useCallback(async ()=>{
        try {
            const {data} = await axios.get('/api/order/admin');
            if (data.success) {
                setOrders(data.orders);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [axios]);

    useEffect(()=>{
        fetchOrders();
    }, [fetchOrders]);

    return (
        <div className='admin-common-gapping'>
            <div className='container-fluid pb-5'>
                <div className='row mb-4'>
                    <div className='col-12'>
                        <h2 className='admin-hero-heading'>Orders List</h2>
                    </div>
                </div>

                {orders.map((order, index) => (
                <div key={index} className="row mb-3 px-2 py-3 admin-order-card me-xl-5">
                    <div className="col-xl-5">
                        <>
                            {order.items.map((item, index) => (
                                <div key={index} className="d-flex gap-4">
                                    <img className="admin-product-list-img mb-2" src={item.product.image[0]} alt={item.product.name} />
                                    <div className='d-flex flex-column mt-2'>
                                        <p className='admin-order-card-txt mb-1 line-clamp-1'>Order ID - {order._id}</p>
                                        <div className='d-flex gap-2'>
                                            <p className="site-amtxt-heading mb-3 line-clamp-1">{item.product.name}</p>
                                            <p className='site-amtxt-heading mb-3'>x {item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </>
                    </div>

                    <div className="col-xl-4">
                        <p className='admin-order-card-txt line-clamp-1 mt-2 mb-1'>User ID - {order.userId}</p>
                        <p className='admin-order-card-txt mb-1 text-prmry'>{order.address.name}</p>
                        <p className='admin-order-card-txt mb-1 text-prmry'>{order.address.street}, {order.address.city}, {order.address.state},{order.address.zipcode}, {order.address.country}</p>
                        <p className='admin-order-card-txt mb-1 text-prmry'>{order.address.phone}, {order.address.email}</p>
                    </div>

                    <div className="col-xl-3">
                        <p className='admin-order-card-txt mb-1'>Method: {order.paymentType}</p>
                        <p className='admin-order-card-txt mb-1'>Date: {new Date(order.createdAt).toDateString()}</p>
                        <p className='admin-order-card-txt mb-1'>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                        <p className="site-amtxt-heading">{currency || '$'}{order.amount}</p>
                    </div>
                </div>
            ))}
            </div>
        </div>
    );
};

export default Orders;