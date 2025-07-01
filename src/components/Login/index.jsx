"use client";

import React, { useState, useEffect } from 'react';
import Icon from '@leafygreen-ui/icon';
import Card from "@leafygreen-ui/card";
import { H2, Description, Subtitle } from '@leafygreen-ui/typography';
import styles from './Login.module.css';
import User from './User';
import Loading from './Loading';
import { USER_MAP } from "@/lib/constants";
import Banner from "@leafygreen-ui/banner";
import { useRouter } from 'next/navigation';
import { fetchUserProfile } from "@/lib/mongo-client";

const LoginComponent = ({ onUserSelected }) => {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Updated to include UserName and BearerToken
    const [users, setUsers] = useState([]); // Constant users
    const [selectedUser, setSelectedUser] = useState(null);
    const [usersLoading, setUsersLoading] = useState(true);

    useEffect(() => {
        setOpen(true);
        
        const loadUsers = async () => {
            setUsersLoading(true);
            
            const loadedUsers = Object.entries(USER_MAP).map(([id, details]) => ({
                id,
                name: details.name,
                avatar: details.avatar
            }));
            
            setUsers(loadedUsers);
            setUsersLoading(false);
        };

        loadUsers();
    }, []);

    const handleUserSelect = async (user) => {
        // Clear previous user session data
        localStorage.removeItem('selectedUser'); // Constant user
        localStorage.removeItem('userProfile'); // Fetched from backend

        // Set the selected user and fetch user profile data
        setSelectedUser(user);
        localStorage.setItem('selectedUser', JSON.stringify(user));
        
        try {
            const userProfile = await fetchUserProfile(user.id);
            localStorage.setItem('userProfile', JSON.stringify(userProfile));
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }

        // Notify parent component about the selected user
        onUserSelected(user);
        
        // Redirect to the landing page
        router.push('/');
    };

    // Show loading component if users are still loading
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
                        />
                    ))}
                </div>

                <div className={styles.parentContainer}>
                    <Banner>
                        Look out for  <Icon glyph="Wizard" fill="#889397" /> to find out more about what is going on behind the scenes!
                    </Banner>
                </div>

                <Description className={styles.bottomDescription}>
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