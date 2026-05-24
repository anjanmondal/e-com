import React, { useState, useEffect }  from 'react';
import { useAppContext } from '../../context/app-context';
import { useNavigate } from 'react-router-dom';
import BringitLogo from '../../assets/img/logo.png';
import toast from 'react-hot-toast';

const AdminLogin = () => {

    const navigate = useNavigate();

    const { isSeller, setIsSeller, axios } = useAppContext();
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');

    const onSubmitHandler = async (e)=> {
        try {
            e.preventDefault();
            const {data} = await axios.post('/api/admin/login', {email, password})
            console.log(data)
            if (data.success) {
                setIsSeller(true)
                navigate('/admin/dashboard')
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    useEffect(()=>{
        // Check if the user is already logged in as a seller
        if (isSeller) {
            navigate('/admin/dashboard');
        }
    }, [isSeller, navigate]);

    return !isSeller && (
        <div className='admin-login'>
           <div className='container my-5 py-5'>
             <div className='row py-5 justify-content-center'>
                <div className='col-xl-4 col-lg-5 col-md-7 col-sm-9 col-12'>
                    <div className='d-flex align-items-center mb-4'>
                        <img src={BringitLogo} className='nav-logo' alt='logo' />
                        <h2 className='nav-title'>bring<span>it</span></h2>
                    </div>
                    <form onSubmit={onSubmitHandler} className='admin-login-form'>
                        <p className='login-heading mb-4'>Admin <span>Login</span></p>
                        <p class="form-label">Email</p>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} type='email' className='form-control form-controll mb-3' placeholder='Enter your email' required />
                        <p class="form-label">Password</p>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type='password' className='form-control form-controll mb-4' placeholder='Enter password' required />
                        <button type='submit' className='site-btn w-100'>Login</button>
                    </form>
                </div>
             </div>
           </div>
           
        </div>
    );
};

export default AdminLogin;