import React from 'react';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/admin/members">회원 관리</Link></li>
                <li><Link to="/admin/choices">설문 관리</Link></li>
                <li><Link to="/admin/reviews">리뷰 관리</Link></li>
            </ul>
        </nav>
    );
};

export default AdminSidebar;
