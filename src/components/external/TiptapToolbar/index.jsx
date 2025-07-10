import React from 'react';
import { 
  Bold, 
  Italic, 
  Underline as UnderlineIcon, 
  Strikethrough, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered, 
  AlignLeft, 
  AlignCenter, 
  AlignRight
} from 'lucide-react';
import styles from './TiptapToolbar.module.css';

export default function TiptapToolbar({ editor }) {
    if (!editor) {
        return null;
    }

    return (
        <div className={styles.toolbar}>
            {/* Basic formatting */}
            <div className={styles.toolbarGroup}>
                <button
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    disabled={!editor.can().chain().focus().toggleBold().run()}
                    className={`${styles.toolbarButton} ${editor.isActive('bold') ? styles.active : ''}`}
                    title="Bold"
                >
                    <Bold size={16} />
                </button>
                
                <button
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    disabled={!editor.can().chain().focus().toggleItalic().run()}
                    className={`${styles.toolbarButton} ${editor.isActive('italic') ? styles.active : ''}`}
                    title="Italic"
                >
                    <Italic size={16} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleUnderline().run()}
                    disabled={!editor.can().chain().focus().toggleUnderline().run()}
                    className={`${styles.toolbarButton} ${editor.isActive('underline') ? styles.active : ''}`}
                    title="Underline"
                >
                    <UnderlineIcon size={16} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleStrike().run()}
                    disabled={!editor.can().chain().focus().toggleStrike().run()}
                    className={`${styles.toolbarButton} ${editor.isActive('strike') ? styles.active : ''}`}
                    title="Strikethrough"
                >
                    <Strikethrough size={16} />
                </button>
            </div>

            <div className={styles.divider}></div>

            {/* Headings */}
            <div className={styles.toolbarGroup}>
                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 1 }) ? styles.active : ''}`}
                    title="Heading 1"
                >
                    <Heading1 size={16} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    className={`${styles.toolbarButton} ${editor.isActive('heading', { level: 2 }) ? styles.active : ''}`}
                    title="Heading 2"
                >
                    <Heading2 size={16} />
                </button>
            </div>

            <div className={styles.divider}></div>

            {/* Lists */}
            <div className={styles.toolbarGroup}>
                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className={`${styles.toolbarButton} ${editor.isActive('bulletList') ? styles.active : ''}`}
                    title="Bullet List"
                >
                    <List size={16} />
                </button>

                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className={`${styles.toolbarButton} ${editor.isActive('orderedList') ? styles.active : ''}`}
                    title="Numbered List"
                >
                    <ListOrdered size={16} />
                </button>
            </div>

            <div className={styles.divider}></div>

            {/* Text Alignment */}
            <div className={styles.toolbarGroup}>
                <button
                    onClick={() => editor.chain().focus().setTextAlign('left').run()}
                    className={`${styles.toolbarButton} ${editor.isActive({ textAlign: 'left' }) ? styles.active : ''}`}
                    title="Align Left"
                >
                    <AlignLeft size={16} />
                </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('center').run()}
                    className={`${styles.toolbarButton} ${editor.isActive({ textAlign: 'center' }) ? styles.active : ''}`}
                    title="Align Center"
                >
                    <AlignCenter size={16} />
                </button>

                <button
                    onClick={() => editor.chain().focus().setTextAlign('right').run()}
                    className={`${styles.toolbarButton} ${editor.isActive({ textAlign: 'right' }) ? styles.active : ''}`}
                    title="Align Right"
                >
                    <AlignRight size={16} />
                </button>
            </div>


        </div>
    );
} 