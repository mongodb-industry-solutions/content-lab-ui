import EditorPanel from './EditorPanel';
import Copilot from './Copilot';
import styles from './Drafts.module.css';

export default function Drafts() {
    return (
        <div className={styles.draftsContainer}>
            <div className={styles.editorSection}>
                <EditorPanel />
            </div>
            <div className={styles.copilotSection}>
                <Copilot />
            </div>
        </div>
    );
}