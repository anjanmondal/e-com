import React, { useEffect, useState, useCallback } from 'react';
// import { dummyAddress } from '../../assets/assets';
import { useAppContext } from '../../context/app-context';
import UserIcon from '../../assets/img/user-icon.png';
import MailIcon from '../../assets/img/mail.png';
// import CallIcon from '../../assets/img/call.png';
import toast from 'react-hot-toast';

const UsersList = () => {

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

    return (
        <div className='admin-common-gapping'>
            <div className='container-fluid pb-5'>
                <div className='row mb-4'>
                    <div className='col-12'>
                        <h2 className='admin-hero-heading'>Users List</h2>
                    </div>
                </div>
                {users.map((user, index)=>(
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
            </div>
        </div>
    );
};

export default UsersList;