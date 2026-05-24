import React from 'react';
// importing router components from react-router-dom
import { Routes, Route } from 'react-router-dom';
// importing the admin layout for admin routes
import AdminLayout from '../components/layouts/admin-layout';
// importing the dashboard component for the admin dashboard page
import Dashboard from '../pages/admin/dashboard';
// importing the add product component for adding new products
import AddProduct from '../pages/admin/add-product';
// importing the product list component for viewing all products
import ProductList from '../pages/admin/product-list';
// importing the orders component for viewing received orders
import Orders from '../pages/admin/orders';
// importing the users list component for viewing all users
import UsersList from '../pages/admin/users';
// importing the admin login component for admin login page
import AdminLogin from '../pages/admin/admin-login';
// importing the app context to access global state
import { useAppContext } from '../context/app-context';
import { Navigate } from 'react-router-dom';

const AdminRoutes = () => {

    const { isSeller } = useAppContext();

    return (
        <Routes>

            {/* admin routes children */}
            <Route element={isSeller ? <AdminLayout /> : <AdminLogin />}>
                <Route
                    index
                    element={
                        !isSeller
                            ? <AdminLogin />
                            : <Navigate to="/admin/dashboard" replace />
                    }
                />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/add-product' element={<AddProduct />} />
                <Route path='/product-list' element={<ProductList />} />
                <Route path='/orders' element={<Orders />} />
                <Route path='/users' element={<UsersList />} />
            </Route>

        </Routes>
    );
};

export default AdminRoutes;