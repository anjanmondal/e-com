import React from 'react';
// importing outlet from react-router-dom to render child routes
import { Outlet } from 'react-router-dom';

const ClientLayout = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default ClientLayout;