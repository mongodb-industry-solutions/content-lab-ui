"use client";

/**
 * User component for the dashboard source: https://github.com/mongodb-industry-solutions/leafy-bank-ui/blob/main/frontend/components/User/User.jsx
 */

import React from 'react';
import { Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';

import styles from './User.module.css';

const User = ({ user = null, isSelectedUser = false, setOpen, setLocalSelectedUser = null }) => {
    const selectUserAndCloseModal = () => {
        if (!setLocalSelectedUser) return;
        setLocalSelectedUser(user);
        setOpen(false);
    };

    return (
        <Card
            className={`${styles.userCard} ${user !== null ? 'cursorPointer' : ''} ${isSelectedUser ? styles.userSelected : ''}`}
            onClick={() => selectUserAndCloseModal()}
        >
            <img src={`/users/avatar${user.avatar}.png`} alt="User Avatar" />
            <Body className={styles.userName}>{user.name}</Body> 
        </Card>
    );
};

export default User;