'use client';

/**
 * Read-only rendering of a draft the assistant proposed, shown inside the chat bubble.
 *
 * This is a real Tiptap editor with editable: false rather than dangerouslySetInnerHTML: the
 * payload is model output, and parsing it against the editor's schema drops every node and mark the
 * schema does not declare, without needing a separate sanitiser.
 *
 * It must render contenteditable="false" - the e2e suite's editorContent helper is
 * `page.locator('[contenteditable="true"]')` and assumes it is the only one on the drafts page
 * (src/tests/e2e/e2e-user-workflows.spec.js).
 */

import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import { PREVIEW_EXTENSIONS } from '@/utils/tiptapExtensions';
import { setEditorHtml } from '@/utils/editorUtils';
import styles from './DraftPreview.module.css';

export default function DraftPreview({ html }) {
    const editor = useEditor({
        extensions: PREVIEW_EXTENSIONS,
        editable: false,
        content: '',
        immediatelyRender: false,
        // The content is written imperatively in the effect below, so there is nothing for a
        // transaction-driven re-render to pick up.
        shouldRerenderOnTransaction: false,
        editorProps: {
            attributes: {
                class: styles.previewRoot,
                // Tiptap hard-codes role="textbox" on every editor root; that is misleading on a
                // read-only preview. editorProps.attributes is applied after it, so this wins.
                role: 'document',
                'aria-label': 'Draft preview',
            },
        },
    });

    useEffect(() => {
        setEditorHtml(editor, html);
    }, [editor, html]);

    return <EditorContent editor={editor} />;
}
