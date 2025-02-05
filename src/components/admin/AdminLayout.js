import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="admin-container">
            <div className="admin-content">
                <AdminSidebar />
                <main className="admin-main">{children}</main>
            </div>
        </div>
    );
};

export default AdminLayout;
