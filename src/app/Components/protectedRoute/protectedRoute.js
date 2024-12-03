'use client'

import { usePathname } from 'next/navigation'
import React from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

import {
	fetchLogout,
    selectHavelogin,
    fetchValidateLogin
} from '../../../../slices/auth';

import {
    fetchMenus,
    selectMenus,
    clearDataMenus
} from '../../../../slices/menus';

import Tentaste from '../../not-found'

const ProtectedRoute = ({ children }) => {
    const haveLoginStore = useSelector(selectHavelogin);
    const menus = useSelector(selectMenus);
    const pathname = usePathname()

    console.log("rei delas")
    console.log(menus)
    console.log(pathname)
    console.log(!menus.some(menu => menu.route === pathname))
    console.log(pathname !== '/')
    console.log(haveLoginStore)

    if (!haveLoginStore || !menus.some(menu => menu.route === pathname) && pathname !== '/') {
        return <Tentaste />;
    }

  return children; // Renderiza as children apenas se tiver login
};

export default ProtectedRoute;
