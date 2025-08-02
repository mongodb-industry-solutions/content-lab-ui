"use client";

/**
 * User component for the dashboard source: https://github.com/mongodb-industry-solutions/leafy-bank-ui/blob/main/frontend/components/User/User.jsx
 */

import React from 'react';
import { Body } from '@leafygreen-ui/typography';
import Card from '@leafygreen-ui/card';
import Image from 'next/image';

import styles from './User.module.css';

const User = ({ user = null, isSelectedUser = false, setOpen, setLocalSelectedUser = null, shortDescription = null }) => {
    const selectUserAndCloseModal = () => {
        if (!setLocalSelectedUser) return;
        setLocalSelectedUser(user);
        setOpen(false);
    };

    return (
        <div className={styles.userContainer}>
            <Card
                className={`${styles.userCard} ${user !== null ? 'cursorPointer' : ''} ${isSelectedUser ? styles.userSelected : ''}`}
                onClick={() => selectUserAndCloseModal()}
            >
                <Image 
                    src={`/users/avatar${user.avatar}.png`} 
                    alt="User Avatar"
                    width={100}
                    height={100}
                    style={{ width: '100%', height: 'auto' }}
                    priority
                />
                <Body className={styles.userName}>{user.name}</Body>
                <Body baseFontSize={13} weight="medium" className={styles.userDescription}>
                    {shortDescription}
                </Body>
            </Card>
        </div>
    );
};

export default User;