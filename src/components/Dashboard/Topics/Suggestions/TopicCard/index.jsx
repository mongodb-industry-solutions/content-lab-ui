import styles from './TopicCard.module.css';
import Card from '@leafygreen-ui/card';
import { H3 } from '@leafygreen-ui/typography';

export default function TopicCard({ topic }) {
    return (
        <Card className={styles.card}>
            <div className={styles.cardContent}>
                <H3>{topic.title}</H3>
            </div>
        </Card>
    )
}