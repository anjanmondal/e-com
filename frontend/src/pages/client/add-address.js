import React, { useEffect } from 'react';
import { useState } from 'react';
import AddressVector from '../../assets/img/address-vector.png';
import { useAppContext } from '../../context/app-context';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

// input fields
const InputField = ({ type, placeholder, name, handleChange, address })=>(
        <input class="form-control form-controll mb-3" 
        type={type} 
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name]}
        required
        />
);


const AddAddress = () => {

    const { axios, user } = useAppContext();

    const navigate = useNavigate();

    const [address, setAddress] = useState({
        name: '',
        email: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        country: '',
        phone: ''
    })

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setAddress((prevAddress)=>({
            ...prevAddress,
            [name]: value,
        }))
        console.log();
    }

    const onSubmitHandler = async (e)=>{
        e.preventDefault();

        // checking for user ID before submission
        if (!user || !user._id) { 
            toast.error('Please login to add an address.');
            navigate('/cart');
            return;
        }

        try {
            const addressData = {
                ...address,
                zipcode: Number(address.zipcode), 
            }
            
            const {data} = await axios.post('/api/address/add', {address: addressData, userId: user._id}) 
            if (data.success) {
                toast.success(data.message)
                navigate('/cart');
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        if (!user) {
            navigate('/cart');
        }
    }, [user, navigate])

    return (
        <div className='page-common-margin-top'>
            <div className='container my-5'>
                <div className='row pt-5'>
                    <div className='col-xl-6 mb-5 pe-lg-5 ps-lg-0'>
                        <h2 className='site-heading'>Add Shipping Address</h2>
                        <form onSubmit={onSubmitHandler} className='mt-4'>
                            <div className='row px-4 py-5 bdr-form'>
                                <div className='col-md-6'>
                                    <p class="form-label">Name</p>
                                    <InputField handleChange={handleChange} address={address} name='name' type='text' placeholder='Enter your name' />
                                </div>
                                <div className='col-md-6'>
                                    <p class="form-label">Email</p>
                                    <InputField handleChange={handleChange} address={address} name='email' type='email' placeholder='Enter your email' />
                                </div>
                                <div className='col-md-12'>
                                    <p class="form-label">Street</p>
                                    <InputField handleChange={handleChange} address={address} name='street' type='text' placeholder='Enter street name' />
                                </div>
                                <div className='col-md-6'>
                                    <p class="form-label">City</p>
                                    <InputField handleChange={handleChange} address={address} name='city' type='text' placeholder='Enter city name' />
                                </div>
                                <div className='col-md-6'>
                                    <p class="form-label">State</p>
                                    <InputField handleChange={handleChange} address={address} name='state' type='text' placeholder='Enter state name' />
                                </div>
                                <div className='col-md-6'>
                                    <p class="form-label">Zip code</p>
                                    <InputField handleChange={handleChange} address={address} name='zipcode' type='number' placeholder='Enter zipcode' />
                                </div>
                                <div className='col-md-6'>
                                    <p class="form-label">Country</p>
                                    <InputField handleChange={handleChange} address={address} name='country' type='text' placeholder='Enter country name' />
                                </div>
                                <div className='col-md-12'>
                                    <p class="form-label">Phone</p>
                                    <InputField handleChange={handleChange} address={address} name='phone' type='text' placeholder='Enter phone number' />
                                </div>
                                <div className='col-12'>
                                    <button type='submit' className='site-btn mt-3'>Save Address</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className='col-xl-6 mb-5 pe-lg-0 ps-lg-5'>
                        <img src={AddressVector} alt='address-vector-image' className='img-fluid'/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddAddress;