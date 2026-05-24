import React, { useEffect, useState, useCallback } from 'react';
import Form from 'react-bootstrap/Form';
import DeleteBtn from '../../assets/img/cross-btn.png';
import { useAppContext } from '../../context/app-context';
// import { dummyAddress } from '../../assets/assets'; // Assuming dummyAddress is defined in assets.js
import { useNavigate } from 'react-router-dom';
import ArrowLeftIcon from '../../assets/img/arrow.png';
import toast from 'react-hot-toast';

const Cart = () => {
    const { products, currency, cartItems, setCartItems, removeFromCart, getCartCount, updateCartItem, getCartAmount, axios, user } = useAppContext();
    const [cartArray, setCartArray] = useState([]);
    const [addresses, setAddresses] = useState([]);
    const [showAddress, setShowAddress] = useState(false);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentOption, setPaymentOption] = useState('COD');

    const navigate = useNavigate();
    const scrollToTop = () => {
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }, 0);
    }

    const getCart = useCallback(()=>{
        let tempArray = [];
        for (const key in cartItems) {
            const product = products.find((item)=>item._id === key);
            if (product) {
                const cartProduct = {...product, quantity: cartItems[key]};
                tempArray.push(cartProduct);
            }
        }
        setCartArray(tempArray);
    }, [products, cartItems])

    useEffect(()=>{
        if (products.length > 0 && cartItems){
            getCart();
        }
    }, [products, cartItems, getCart]);

    const getUserAddress = useCallback(async ()=>{
        try {
            const {data} = await axios.get('/api/address/get');
            if (data.success) {
                setAddresses(data.addresses)
                if (data.addresses.length > 0) {
                    setSelectedAddress(data.addresses[0])
                }
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }, [axios])

    useEffect(()=>{
        if(user) {
            getUserAddress();
        }
    }, [user, getUserAddress]);

    const placeOrder = async () =>{
        try {
            if (!selectedAddress) {
                return toast.error('Please login to place an order');
            } 

            // place order using cod
            if (paymentOption === 'COD') {
                const {data} = await axios.post('/api/order/cod', {
                    userId: user._id,
                    items: cartArray.map(item=>({product: item._id, quantity: item.quantity})),
                    address: selectedAddress._id,
                })

                if (data.success) {
                    toast.success(data.message);
                    setCartItems({});
                    navigate('/my-orders');
                } else {
                    toast.error(data.message);
                }
            } else {
                // place order using online payment stripe
                const {data} = await axios.post('/api/order/stripe', {
                    userId: user._id,
                    items: cartArray.map(item=>({product: item._id, quantity: item.quantity})),
                    address: selectedAddress._id,
                })

                if (data.success) {
                    window.location.replace(data.url);
                } else {
                    toast.error(data.message);
                }
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    return products.length > 0 && cartItems ? (
        <div className='page-common-margin-top'>
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-xl-8'>
                        <h2 className='site-heading pt-5'>Your Cart <span className='ptxt text-danger ms-2'>{getCartCount()} items</span></h2>

                        <div className='row pt-4'>
                            <div className='col-7'><h6 className='carttable-head'>Product Details</h6></div>
                            <div className='col-3'><h6 className='carttable-head'>Subtotal</h6></div>
                            <div className='col-2'><h6 className='carttable-head'>Action</h6></div>
                        </div>

                        {cartArray.map((product, index)=> (
                        <div className='row my-3' key={index}>
                            <div className='col-7'>
                                <div className='d-flex'>
                                    <img src={product.image[0]} alt={product.name} className='cart-product-image c-pointer' onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollToTop();}} />
                                    <div>
                                        <p className='ptxt fwm mb-1 line-clamp-1 c-pointer' onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollToTop();}}>{product.name}</p>
                                        <p className='ptxt mb-1'>Weight: {product.weight || 'N/A'}</p>
                                        <div className='d-flex'>
                                            <p className='ptxt mb-0'>Qty: </p>
                                            <Form.Select onChange={e => updateCartItem(product._id, Number(e.target.value))} value={cartItems[product._id]} aria-label="Default select example" className='table-form-select'>
                                                    {Array(cartItems[product._id] > 9 ? cartItems[product._id] : 9).fill('').map((_, index)=>(
                                                        <option key={index} value={index+1}>{index+1}</option>
                                                    ))}
                                            </Form.Select>
                                        </div>
                                        
                                    </div>
                                </div>
                            </div>
                            <div className='col-3'>
                                <p className='ptxt mb-1'>{currency}{product.offerPrice * product.quantity}</p>
                            </div>
                            <div className='col-2'>
                                <img onClick={()=>{removeFromCart(product._id)}} src={DeleteBtn} alt='delete-btn' className='delete-btn' />
                            </div>
                        </div>
                        ))}
                        <div className='row my-4'>
                            <div className='col-12'>
                                <button className='site-btnn' onClick={()=>{navigate('/'); scrollToTop();}}>
                                    <img src={ArrowLeftIcon} alt='arrow-left' className='me-2' />
                                    Continue Shopping</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 pt-5'>
                        <div className='summary-box'>
                            <h5 className='site-amtxt-heading mb-3'>Order Summary</h5>
                            <hr />
                            <h6 className='carttable-head'>Delivery Address</h6>
                            <div className='d-flex justify-content-between align-items-center position-relative'>
                                <p className='ptxt line-clamp-1'>{selectedAddress ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}` : 'No address found'}</p>
                                <button onClick={()=>{ setShowAddress(!showAddress)}} className='link-btn mt--16px'>Change</button>
                                {showAddress && (
                                    <div className='address-dropdown'>
                                        {addresses.map((address, index)=>(
                                            <p className='ptxt change-address-list-pan line-clamp-1' onClick={()=>{setSelectedAddress(address); setShowAddress(false)}}>{address.street}, {address.city}, {address.state}, {address.country}</p>
                                            ))}
                                        <button className='site-btn-inactive bg-white w-100 address-btn-position fs-sm-12px' onClick={()=>{navigate('/add-address')}}>Add Address</button>
                                    </div>
                                )}
                            </div>
                            <div className='mt-2'>
                                <h6 className='carttable-head mb-3'>Payment Method</h6>
                                    <Form.Select aria-label="Default select example" onChange={e => setPaymentOption(e.target.value)}>
                                        <option value='COD'>Pay on delivery</option>
                                        <option value='Online'>Online payment</option>
                                    </Form.Select>
                            </div>
                            <hr />
                            <div className='d-flex justify-content-between align-items-center'>
                                 <p className='ptxt mb-1'>Price</p>
                                 <p className='ptxt mb-1'>{currency}{getCartAmount()}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                 <p className='ptxt mb-1'>Shipping Charges</p>
                                 <p className='ptxt mb-1 text-success'>{currency}0</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                 <p className='ptxt mb-1'>Taxes (2%)</p>
                                 <p className='ptxt mb-1'>{currency}{getCartAmount()*2/100}</p>
                            </div>
                            <div className='d-flex justify-content-between align-items-center'>
                                 <h6 className='carttable-head'>Total Amount</h6>
                                 <p className='ptxt mb-1'>{currency}{getCartAmount() + getCartAmount()*2/100}</p>
                            </div>
                            <button className='site-btn w-100 mt-4 mb-3' onClick={placeOrder}>{paymentOption==='COD' ? 'Place Order' : 'Proceed to checkout'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
};

export default Cart;