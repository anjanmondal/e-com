import React from 'react';
// importing router components from react-router-dom
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// importing the client routes
import ClientRoutes from './client-routes';
// importing the admin routes
import AdminRoutes from './admin-routes';
// importing the AppContextProvider to provide global state management
import { AppContextProvider } from '../context/app-context';
// importing the navbar
import Navbar from '../components/navbar/navbar';
// importing the footer
import Footer from '../components/footer/footer';
// importing Toaster for toast notifications
import { Toaster } from 'react-hot-toast';


const MainRouter = () => {
    
    // *** if path is admin dashboard then client navbar should not be shown ***/
    const isAdminPath = window.location.pathname.includes('/admin');

    return (
        // Wrapping the entire application with AppContextProvider to manage global state
        <AppContextProvider>
        <BrowserRouter>
        
            {/*** if path is admin dashboard then client navbar should not be shown ***/}
            { isAdminPath ? null : <Navbar /> }

            <Toaster />

            <Routes>
                {/* client routes */}
                <Route path='/*' element={<ClientRoutes />} />

                {/* admin routes */}
                <Route path='/admin/*' element={<AdminRoutes />} />
            </Routes>

            {/*** if path is admin dashboard then client footer should not be shown ***/}
            { !isAdminPath && <Footer />}

        </BrowserRouter>
        </AppContextProvider>
    );
};

export default MainRouter;