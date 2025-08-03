/**
 * Loading component for the user selection page   
 */

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styles from './Loading.module.css';
import Card from '@leafygreen-ui/card';

export default function Loading() {
    return (
        <div className={styles.container}>
            <Card className={styles.loadingCard}>
                <Skeleton height={40} width={300} className={styles.titleSkeleton} />
                <Skeleton height={20} width={200} className={styles.subtitleSkeleton} />
                <div className={styles.userSkeletons}>
                    <Skeleton height={120} width={100} />
                    <Skeleton height={120} width={100} />
                    <Skeleton height={120} width={100} />
                </div>
            </Card>
        </div>
    );
};
