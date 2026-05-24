import React from 'react';
// importing router components from react-router-dom
import { Routes, Route } from 'react-router-dom';
// importing the client layout for client routes
import ClientLayout from '../components/layouts/client-layout';
// importing the home component for the client home page
import Home from '../pages/client/home';
// importing the cart component for the client cart page
import Cart from '../pages/client/cart';
// importing the NotFound component for handling 404 errors
import NotFound from '../components/common/not-found';
// importing all products page to display all products
import AllProducts from '../pages/client/all-products';
// importing product-category page to display categorized products
import ProductCategory from '../pages/client/product-category';
// importing product-details page to display details of product
import ProductDetails from '../pages/client/product-details';
// importing add address page to add new address
import AddAddress from '../pages/client/add-address';
// importing my orders page to view client's orders
import MyOrders from '../pages/client/my-orders';
// importing spinner page for loading indication
import Loading from '../components/loading/loading';

const ClientRoutes = () => {
    return (
           <Routes>

            {/* client routes children */}
             <Route element={<ClientLayout />}>
                <Route path='/' element={<Home />} />
                <Route path='/products' element={<AllProducts />} />
                <Route path='/products/:category' element={<ProductCategory />} />
                <Route path='/products/:category/:id' element={<ProductDetails />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/add-address' element={<AddAddress />} />
                <Route path='/my-orders' element={<MyOrders />} />
                <Route path='/loader' element={<Loading />} />
                {/* Error routes */}
                <Route path='*' element={<NotFound />} />
             </Route>

           </Routes>
    );
};

export default ClientRoutes;