"use client";

/**
 * Login component for the dashboard source: https://github.com/mongodb-industry-solutions/leafy-bank-ui/blob/main/frontend/components/Login/Login.jsx
 */

import React, { useState, useEffect } from 'react';
import Icon from '@leafygreen-ui/icon';
import Card from "@leafygreen-ui/card";
import { H2, Description, Subtitle } from '@leafygreen-ui/typography';
import styles from './Login.module.css';
import User from './User';
import Loading from './Loading';
import { USER_MAP } from "@/utils/constants";
import Banner from "@leafygreen-ui/banner";
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from "@/api/profile_api";

const LoginComponent = ({ onUserSelected }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [usersLoading, setUsersLoading] = useState(true);

    useEffect(() => {
        setOpen(true);
        
        const loadUsers = async () => {
            setUsersLoading(true);
            
            const loadedUsers = Object.entries(USER_MAP).map(([id, details]) => ({
                id,
                name: details.name,
                avatar: details.avatar,
                shortDescription: details.shortDescription
            }));
            
            setUsers(loadedUsers);
            setUsersLoading(false);
        };

        loadUsers();
    }, []);

    const handleUserSelect = async (user) => {
        localStorage.removeItem('selectedUser'); 
        localStorage.removeItem('userProfile'); 

        setSelectedUser(user);
        localStorage.setItem('selectedUser', JSON.stringify(user));
        
        try {
            const userProfile = await fetchUserProfile(user.id);
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        } catch (error) {
            // Do nothing user profile is not fetched from backend
        }

        onUserSelected(user);
        router.push('/');
    };

    if (usersLoading) {
        return <Loading />;
    }

    return (
        <div className={styles.container}>
        <Card className={styles.card}>
            <div className={styles.modalMainContent}>
                <H2 className={styles.title}>Welcome to The Content Lab</H2>
                <Subtitle className={styles.subtitle}>This is a MongoDB demo</Subtitle>
                <br />
                <Description className={styles.description}>
                    Please select the user you would like to login as:
                </Description>
                
                <div className={styles.usersContainer}>
                    {users.map(user => ( // Constant users
                        <User
                            user={user}
                            isSelectedUser={selectedUser && selectedUser.id === user.id}
                            key={user.id}
                            setOpen={setOpen}
                            setLocalSelectedUser={handleUserSelect}
                            shortDescription={user.shortDescription}
                        />
                    ))}
                </div>

                <div className={styles.descriptionContainer}>
                    <Banner>
                        Look out for  <Icon glyph="Wizard" fill="#889397" /> to find out more about what is going on behind the scenes!
                    </Banner>
                </div>

                <Description>
                    Note: Each user has pre-loaded data, such as writing styles, and sample text. This variation is designed to showcase different scenarios, providing a more dynamic and realistic user experience for the demo.
                </Description>
            </div>
        </Card>
        </div>
    );
};

const Login = ({ onUserSelected }) => {
    return (
        <LoginComponent onUserSelected={onUserSelected} />
    );
};

export default Login;