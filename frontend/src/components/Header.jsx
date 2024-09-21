import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import { toggleTheme } from '../redux/theme/themeSlice';
// import { signoutSuccess } from '../redux/user/userSlice';
import { useEffect, useState } from 'react';

function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const { currentUser } = useSelector((state) => state.user);
  // const { theme } = useSelector((state) => state.theme);
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
        Header
    </div>
  )
}

export default Header