import StarterKit from '@tiptap/starter-kit';
import Heading from '@tiptap/extension-heading';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import Placeholder from '@tiptap/extension-placeholder';
import { Markdown } from 'tiptap-markdown';

/**
 * Extensions shared by the editable editor and the read-only draft preview in the chat bubble.
 *
 * Declared once at module scope on purpose: @tiptap/react compares the `extensions` option
 * element-by-element by reference and calls editor.setOptions() on every render whenever the array
 * identity changes. An array literal inside the options object - what useTiptapEditor used to pass -
 * never compares equal.
 */
const SHARED_EXTENSIONS = [
    StarterKit.configure({
        heading: false,
    }),
    Heading.configure({
        levels: [1, 2, 3],
    }),
    TextAlign.configure({
        types: ['heading', 'paragraph'],
    }),
    Link.configure({
        openOnClick: false,
        HTMLAttributes: {
            class: 'tiptap-link',
        },
    }),
    Underline,
];

/**
 * The editable editor (src/hooks/useTiptapEditor.js).
 * `Markdown` has to stay: getDraftText() reads storage.markdown.getMarkdown() and feeds
 * handlePublishDraft (src/hooks/useDraftManager.js).
 */
export const EDITOR_EXTENSIONS = [
    ...SHARED_EXTENSIONS,
    Markdown,
    Placeholder.configure({
        placeholder: 'Start writing your article here...',
    }),
];

/**
 * The read-only preview. Same schema as the editor, minus the two extensions that only make sense
 * for a document being written:
 * - Markdown: the preview only ever receives HTML (via setEditorHtml), so its parser and serializer
 *   are dead weight - and it overrides the setContent command with a markdown round-trip, which is
 *   exactly what the preview must avoid. It contributes no nodes or marks to the schema, so leaving
 *   it out cannot make the preview discard content.
 * - Placeholder: a decoration plugin that would render "Start writing your article here..." inside
 *   an empty preview bubble.
 */
export const PREVIEW_EXTENSIONS = [...SHARED_EXTENSIONS];
