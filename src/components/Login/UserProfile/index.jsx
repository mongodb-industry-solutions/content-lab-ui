"use client";

/**
 * User profile component for the dashboard source: https://github.com/mongodb-industry-solutions/leafy-bank-ui/blob/main/frontend/components/UserProfile/UserProfile.jsx
 */

import { useState, useEffect } from "react";
import { H3, Subtitle, Body } from '@leafygreen-ui/typography';
import Image from 'next/image';
import Card from '@leafygreen-ui/card';
import Badge from '@leafygreen-ui/badge';
import IconButton from '@leafygreen-ui/icon-button';
import Icon from '@leafygreen-ui/icon';

import styles from './UserProfile.module.css';

const UserProfile = ({ onClose }) => {
    const [selectedUser, setSelectedUser] = useState(null);
    const [userProfile, setUserProfile] = useState(null);

    useEffect(() => {
        // Retrieve data from localStorage
        const userString = localStorage.getItem('selectedUser'); // Only for profile picture
        const userProfileString = localStorage.getItem('userProfile'); // Fetched from backend, contains everything else

        // Parse the JSON strings
        const user = userString ? JSON.parse(userString) : null;
        const profile = userProfileString ? JSON.parse(userProfileString) : null;

        setSelectedUser(user);
        setUserProfile(profile);
    }, []);

    // Don't render anything if selectedUser is null
    if (!selectedUser) {
        return null;
    }

    return (
        <div className={styles.popupOverlay}>
            <Card className={styles.popupCard}>
                <IconButton
                    aria-label="Close"
                    onClick={onClose}
                    className={styles.closeButton}
                >
                    <Icon glyph="X" />
                </IconButton>
                
                <H3>My Profile</H3>
                <Image
                    className={styles.profileImage}
                    src={`/users/avatar${selectedUser.avatar}.png`}
                    alt="User Avatar"
                    width={100}
                    height={130}
                    priority
                />
                <div className={styles.userNameContainer}>
                    <H3>{userProfile.userName}</H3>
                    <Badge variant="blue">{userProfile.persona}</Badge>
                </div>
        
                <div className={styles.divider}></div>
                
                <div className={styles.section}>
                    <Subtitle className={styles.sectionTitle}>Tone</Subtitle>
                    <Body baseFontSize={13}>{userProfile.tone}</Body>
                </div>

                <div className={styles.section}>
                    <Subtitle className={styles.sectionTitle}>Writing Styles</Subtitle>
                    <div className={styles.styleContainer}>
                        <Body baseFontSize={13}>
                            {userProfile.styleTraits[0]}
                        </Body>
                        <Body baseFontSize={13}>
                            {userProfile.styleTraits[1]}
                        </Body>
                        <Body baseFontSize={13}>
                            {userProfile.styleTraits[2]}
                        </Body>
                        
                    </div>
                </div>

                <div className={styles.section}>
                    <Subtitle className={styles.sectionTitle}>About Me</Subtitle>
                    <div className={styles.sampleTextContainer}>
                        <Body baseFontSize={13} className={styles.sampleText}>
                            "{userProfile.sampleText}"
                        </Body>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UserProfile;