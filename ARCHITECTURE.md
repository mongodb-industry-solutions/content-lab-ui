# Frontend Architecture Documentation

**This document provides an in-depth exploration of The Content Lab's frontend architecture**, designed to give developers a comprehensive understanding of the application structure, component organization, and design patterns that power this modern content creation platform.

The Content Lab demonstrates sophisticated React and Next.js patterns while showcasing how modern frontend applications can effectively integrate with MongoDB-powered backend services to create seamless user experiences for content creators and journalists.

## Overview & Architecture Philosophy

The Content Lab frontend is built with a **component-driven architecture** that prioritizes modularity, reusability, and maintainability. The application follows modern React patterns and leverages Next.js 15's App Router for optimal performance and developer experience.

### Core Architectural Decisions

- **Next.js 15 with App Router**: Chosen for its file-based routing, built-in optimizations, and excellent developer experience
- **React 19 RC**: Leverages the latest React features including improved concurrent rendering and enhanced hooks
- **CSS Modules**: Provides scoped styling with zero runtime overhead and excellent developer experience
- **LeafyGreen Design System**: MongoDB's official design system ensures consistent UI/UX across the application
- **Microservices Integration**: Clean separation between frontend and multiple backend services for scalability

## Project Structure Deep Dive

The application follows a clear hierarchical structure that separates concerns and promotes code organization:

```
/src
├── /app                    # Next.js App Router - route definitions and layouts
│   ├── layout.jsx         # Root layout with providers and global styles
│   ├── providers.jsx      # LeafyGreen provider configuration
│   ├── globals.css        # Global CSS styles
│   └── (dashboard)/       # Route group for authenticated pages
│       ├── layout.jsx     # Dashboard layout wrapper
│       ├── (landing)/     # Landing page route
│       ├── drafts/        # Draft creation and editing routes
│       ├── saved/         # Saved drafts management
│       └── topics/        # Topic exploration and research
├── /components            # Reusable UI components organized by feature
│   ├── /Dashboard/        # Feature-specific dashboard components
│   ├── /Layout/           # Application layout components
│   ├── /Login/            # User selection and authentication
│   └── /external/         # Third-party and animation components
├── /api                   # API client functions for backend communication
├── /hooks                 # Custom React hooks for shared logic
├── /utils                 # Utility functions and constants
└── /public               # Static assets including images and icons
```

## Component Architecture

The application uses a **hierarchical component structure** with clear separation between different types of components:

### Layout Components
**Purpose**: Provide structural foundation and navigation
- **`Layout/index.jsx`**: Main layout wrapper handling authentication state and navigation
- **`Layout/Navbar`**: Primary navigation with user context and logout functionality
- **Route Layouts**: Next.js layout components for different application sections

### Feature Components
**Purpose**: Implement specific business logic and user workflows

#### Dashboard Components (`/components/Dashboard/`)
- **`Landing/`**: Welcome page with trending content aggregation
  - `Headline/`: Hero section with floating cards animation
  - `TopNews/`: Curated news display with category filtering
  - `ViralPosts/`: Social media content aggregation
- **`Topics/`**: Content research and topic exploration
  - `Search/`: Advanced search with filters and suggested queries
  - `Suggestions/`: AI-powered topic recommendations with visual cards
- **`Drafts/`**: Content creation and editing environment
  - `EditorPanel/`: Rich text editor with metadata sidebar
  - `Chatbot/`: AI writing assistant integration
- **`Saved/`**: Draft management and organization
  - `DraftCard/`: Individual draft preview and actions

#### Shared Components (`/components/external/`)
- **Animation Components**: `FlickeringGrid`, `GradientBackground`, `SparklesText`
- **UI Enhancements**: `InfoWizard`, `DotBackground`, `GridPattern`
- **Interactive Elements**: `Globe`, `Marquee`, `TiptapToolbar`

### Component Design Patterns

#### Container/Presenter Pattern
```jsx
// Container Component (logic)
const TopicsContainer = () => {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  // ... business logic
  
  return <Suggestions topics={topics} isLoading={isLoading} />;
};

// Presenter Component (UI)
const Suggestions = ({ topics, isLoading }) => {
  return (
    <section className={styles.suggestionsSection}>
      {/* Pure UI rendering */}
    </section>
  );
};
```

#### Custom Hooks for State Management
```jsx
// useDraftManager.js - Complex state logic abstraction
export function useDraftManager(initialDraftId, showNotification, editorRef) {
  const [draftId, setDraftId] = useState(initialDraftId);
  const [isSaving, setIsSaving] = useState(false);
  // ... draft operations
  
  return { draftId, isSaving, handleSaveDraft, handleMetadataChange };
}
```

## Data Flow & State Management

The application implements a **unidirectional data flow** with strategic state management patterns:

### Backend Service Communication

#### API Layer Architecture
```javascript
// Centralized API functions with consistent error handling
export async function fetchSuggestedTopics(category = 'general') {
  try {
    const response = await fetch(`${mainBackendUrl}/api/suggestions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ category })
    });
    
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    throw new Error('Failed to fetch suggestions. Please try again.');
  }
}
```

#### Service Integration Patterns
- **Main Backend Service** (Port 8000): Content aggregation, draft management, user profiles
- **AI Chat Service** (Port 8001): Writing assistance, content suggestions, style adaptation
- **Environment Configuration**: Flexible backend URL configuration for different deployment environments

### Client-Side State Handling

#### Local Storage Integration
```javascript
// Persistent user session management
const userProfile = JSON.parse(localStorage.getItem('userProfile') || 'null');
const topicCard = JSON.parse(localStorage.getItem('topicCard') || 'null');
```

#### State Lifting and Prop Drilling
- **Topics Flow**: `TopicsContainer` → `Search` + `Suggestions` → `TopicCard`
- **Drafts Flow**: `Drafts` → `EditorPanel` + `Chatbot` → `Sidebar` + `RichTextEditor`

## Routing & Navigation

### Next.js App Router Implementation

The application leverages Next.js 15's App Router with strategic route organization:

```
/app/(dashboard)/
├── layout.jsx           # Shared dashboard layout
├── (landing)/page.jsx   # Default route: Landing page
├── topics/page.jsx      # Topic research and exploration
├── saved/page.jsx       # Draft management
├── drafts/
│   ├── page.jsx         # New draft creation
│   └── [draftId]/page.jsx  # Existing draft editing
```

#### Dynamic Routing Patterns
```jsx
// Dynamic draft editing with parameter handling
export default async function EditDraftPage({ params }) {
  const { draftId } = await params;
  return <Drafts draftId={draftId} />;
}
```

#### Navigation State Management
- **Programmatic Navigation**: `useRouter` for dynamic routing based on user actions
- **State Preservation**: Topic cards and user context maintained across navigation
- **Deep Linking**: Direct URL access to specific drafts and content states

## Styling Architecture

### CSS Modules Implementation

The application uses CSS Modules for **component-scoped styling** with consistent naming conventions:

```css
/* Component.module.css */
.componentContainer {
  display: flex;
  flex-direction: column;
  padding: 2rem;
}

.headerSection {
  margin-bottom: 3rem;
}

/* Responsive design patterns */
@media (min-height: 1200px) {
  .componentContainer {
    padding: 3rem 4rem;
  }
}
```

### LeafyGreen Design System Integration

#### Component Usage Patterns
```jsx
import { H2, Body } from '@leafygreen-ui/typography';
import Button from '@leafygreen-ui/button';
import Card from '@leafygreen-ui/card';

// Consistent design system implementation
<Card className={styles.customCard}>
  <H2 className={styles.title}>Content Title</H2>
  <Body className={styles.description}>Content description</Body>
  <Button variant="primary" size="default">Action</Button>
</Card>
```

#### Design Token Consistency
- **Color Palette**: MongoDB brand colors with semantic variants
- **Typography Scale**: Consistent font sizes and weights across components (LeafyGreen Typography)

### Animation and Visual Effects

#### External Component Integration
- **Magic UI Components**: `GradientBackground`, `GridPattern` for visual enhancement
- **React Bits**: Interactive animations for user engagement
- **21st.dev Components**: Modern UI effects and transitions

## Development Patterns

### Component Design Patterns

#### Ref Forwarding for Editor Integration
```jsx
const EditorPanel = forwardRef(({ metadata, onMetadataChange, topicCard }, ref) => {
  const editorRef = useRef(null);
  
  useImperativeHandle(ref, () => ({
    getDraftContent: () => editorRef.current?.getDraftContent() || '',
    setDraftContent: (newContent) => editorRef.current?.setDraftContent(newContent)
  }));
  
  return <RichTextEditor ref={editorRef} />;
});
```

#### Custom Hook Patterns
```jsx
// Encapsulating complex logic in reusable hooks
export function useChatbot(getDraftContent, userProfile, topicCard) {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const handleSendMessage = useCallback(async (messageText, promptType) => {
    // Complex message handling logic
  }, [getDraftContent, userProfile, topicCard]);
  
  return { messages, isTyping, handleSendMessage };
}
```

### Error Handling Strategies

#### Component-Level Error Boundaries
```jsx
// Graceful error handling with fallback UI
const renderContent = () => {
  if (error) {
    return (
      <div className={styles.errorContainer}>
        <Body className={styles.errorMessage}>{error}</Body>
      </div>
    );
  }
  
  return <MainContent />;
};
```

#### API Error Handling
```javascript
// Consistent error messaging across API calls
try {
  const result = await apiFunction();
  return result;
} catch (error) {
  throw new Error('Failed to fetch data. Please try again.');
}
```

### Loading States Implementation

#### Skeleton Loading Patterns
```jsx
import Skeleton from 'react-loading-skeleton';

const LoadingComponent = () => (
  <div className={styles.loadingContainer}>
    <Skeleton height={200} count={3} />
  </div>
);
```

#### Progressive Loading States
- **Initial Load**: Full page loading with spinner
- **Search Loading**: Contextual loading during search operations
- **Component Loading**: Individual component loading states

### Performance Optimization

#### Image Optimization
```jsx
// Next.js Image optimization with responsive loading
<Image 
  src={`/categories/${category}_${index % 4 + 1}.png`}
  alt={topic}
  width={400}
  height={250}
  priority
  className={styles.topicImage}
/>
```

## Complex Component Integration Example: The Drafts System

The **Drafts component** exemplifies our hierarchical architecture pattern, serving as the **single source of truth** for the entire content creation workflow. This component demonstrates how multiple complex systems integrate seamlessly through strategic state management, ref forwarding, and bidirectional communication patterns.

### Hierarchical Architecture Pattern

#### The Drafts Component as Central Coordinator
```jsx
// /components/Dashboard/Drafts/index.jsx - The orchestrator
export default function Drafts({ draftId: initialDraftId = null }) {
    const router = useRouter();
    const editorRef = useRef(null); // Central ref for editor communication
    
    // Multiple custom hooks managing different aspects of state
    const { notification, showNotification, clearNotification } = useNotification();
    const {
        draftId, isSaving, isLoading, userProfile, topicCard, metadata,
        handleMetadataChange, handleSaveDraft
    } = useDraftManager(initialDraftId, showNotification, editorRef);

    // Editor utilities that abstract complex editor interactions
    const { getDraftContent, applyDraftLayout, applySuggestion } = createEditorUtils(editorRef);

    return (
        <div className={styles.draftsContainer}>
            {/* Header with navigation and actions */}
            <div className={styles.headerContainer}>
                <IconButton onClick={() => router.push('/topics')}>
                    <Icon glyph="ChevronLeft" />
                </IconButton>
                <Button onClick={handleSaveDraft} disabled={isSaving}>
                    {isSaving ? 'Saving...' : 'Save Draft'}
                </Button>
            </div>

            {/* Main content grid with bidirectional communication */}
            <div className={styles.contentGrid}>
                <div className={styles.editorSection}>
                    <EditorPanel 
                        ref={editorRef}                    // Ref for direct editor control
                        metadata={metadata}                // State flows down
                        onMetadataChange={handleMetadataChange}  // Callbacks flow up
                        topicCard={topicCard}
                    />
                </div>
                <div className={styles.chatbotSection}>
                    <Chatbot 
                        getDraftContent={getDraftContent}     // Function to read editor
                        applyDraftLayout={applyDraftLayout}   // Function to write to editor
                        applySuggestion={applySuggestion}     // Function to replace text
                        userProfile={userProfile}            // Shared state
                        topicCard={topicCard}                 // Shared context
                    />
                </div>
            </div>
        </div>
    );
}
```

### State Management Coordination

#### Custom Hooks as State Managers
The Drafts component delegates complex logic to specialized hooks while maintaining overall coordination:

```jsx
// useDraftManager.js - Manages draft lifecycle and metadata
export function useDraftManager(initialDraftId, showNotification, editorRef) {
    const [draftId, setDraftId] = useState(initialDraftId);
    const [metadata, setMetadata] = useState({ title: '', category: '', keywords: [] });
    const [userProfile, setUserProfile] = useState(null);
    const [topicCard, setTopicCard] = useState(null);

    // Load existing draft content into editor
    useEffect(() => {
        if (draftId && userProfile?._id) {
            const loadDraft = async () => {
                try {
                    const draft = await fetchDraftById(draftId, userProfile._id);
                    setMetadata(draft.metadata);
                    // Directly control editor through ref
                    editorRef.current?.setDraftContent(draft.content);
                } catch (error) {
                    showNotification('error', 'Failed to load draft');
                }
            };
            loadDraft();
        }
    }, [draftId, userProfile, editorRef]);

    const handleSaveDraft = async () => {
        // Get current content from editor via ref
        const content = editorRef.current?.getDraftContent() || '';
        
        try {
            const result = draftId 
                ? await updateDraft(draftId, metadata.title, metadata.category, content)
                : await saveDraft(userProfile._id, metadata.title, metadata.category, content);
            
            if (!draftId) setDraftId(result._id);
            showNotification('success', 'Draft saved successfully!');
        } catch (error) {
            showNotification('error', 'Failed to save draft');
        }
    };

    return { draftId, metadata, userProfile, topicCard, handleSaveDraft, handleMetadataChange };
}
```

### Bidirectional Communication Patterns

#### Editor-Chatbot Communication Bridge
The architecture enables seamless bidirectional communication between the editor and chatbot through the parent component:

```jsx
// createEditorUtils.js - Abstracts editor interactions
export function createEditorUtils(editorRef) {
    return {
        // Chatbot reads current editor content
        getDraftContent: () => editorRef.current?.getDraftContent() || '',
        
        // Chatbot applies full content layouts
        applyDraftLayout: (newContent) => {
            editorRef.current?.setDraftContent(newContent);
        },
        
        // Chatbot applies specific text suggestions
        applySuggestion: (original, replacement) => {
            editorRef.current?.replaceText(original, replacement);
        }
    };
}
```

#### Chatbot Integration with Editor Context
```jsx
// /components/Dashboard/Drafts/Chatbot/index.jsx
export default function Chatbot({ 
    getDraftContent,      // Function to read editor state
    applyDraftLayout,     // Function to modify editor content
    applySuggestion,      // Function to replace specific text
    userProfile,          // Shared user context
    topicCard            // Shared topic context
}) {
    const { messages, isTyping, handleSendMessage } = useChatbot(
        getDraftContent, userProfile, topicCard
    );

    // When AI suggests content changes
    const handleApplySuggestion = (suggestion) => {
        if (suggestion.type === 'layout') {
            applyDraftLayout(suggestion.content);
        } else if (suggestion.type === 'replacement') {
            applySuggestion(suggestion.original, suggestion.replacement);
        }
    };

    // When sending messages, include current editor content for context
    const handleMessage = async (message, promptType) => {
        const currentContent = getDraftContent(); // Read from editor
        await handleSendMessage(message, promptType, currentContent);
    };

    return (
        <div className={styles.chatbotContainer}>
            <ChatMessages messages={messages} onApplySuggestion={handleApplySuggestion} />
            <ChatInput onSendMessage={handleMessage} />
        </div>
    );
}
```

### Ref Forwarding for Direct Communication

#### Editor Panel Ref Implementation
```jsx
// /components/Dashboard/Drafts/EditorPanel/index.jsx
const EditorPanel = forwardRef(({ metadata, onMetadataChange, topicCard }, ref) => {
    const editorRef = useRef(null);

    // Expose editor methods to parent through ref
    useImperativeHandle(ref, () => ({
        getDraftContent: () => editorRef.current?.getDraftContent() || '',
        setDraftContent: (newContent) => editorRef.current?.setDraftContent(newContent),
        replaceText: (original, replacement) => editorRef.current?.replaceText(original, replacement)
    }));

    return (
        <Card className={styles.editorPanel}>
            <div className={styles.container}>
                <div className={styles.sidebar}>
                    <Sidebar 
                        topicCard={topicCard} 
                        metadata={metadata}
                        onMetadataChange={onMetadataChange}  // Metadata flows back up
                    />
                </div>
                <div className={styles.textEditor}>
                    <RichTextEditor ref={editorRef} />  {/* Ref chain continues down */}
                </div>
            </div>
        </Card>
    );
});
```

### Key Benefits of This Pattern

1. **Single Source of Truth**: All state lives in the Drafts component, eliminating inconsistencies
2. **Controlled Communication**: Components communicate through well-defined interfaces (props, callbacks, refs)
3. **Separation of Concerns**: Each component has a clear responsibility while maintaining integration
4. **Testability**: Components can be tested in isolation with mocked dependencies
5. **Scalability**: New features can be added without disrupting existing communication patterns

This hierarchical pattern ensures that complex interactions between the editor and chatbot remain predictable and maintainable, while allowing each component to focus on its specific responsibilities within the larger content creation workflow.

## Backend Integration Details

### Service Communication Architecture

#### Main Backend Integration (Port 8000)
```javascript
// Centralized backend URL configuration
const mainBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

// Consistent API patterns for content operations (One of the many endpoints from the main backend)
export async function saveDraft(userId, title, category, content, keywords, topicId) {
  const response = await fetch(`${mainBackendUrl}/api/drafts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, title, category, content, keywords, topicId })
  });
  
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}
```

#### AI Chat Service Integration (Port 8001)
```javascript
// Centralized backend URL configuration
const mainBackendUrl = process.env.NEXT_PUBLIC_CHAT_BACKEND_URL || "http://localhost:8000";

// Specialized chat service communication
export async function sendChatMessage(chatData) {
  const response = await fetch(`${chatBackendUrl}/api/writing/assist`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      draftContent: chatData.draftContent,
      promptType: chatData.promptType,
      profile: chatData.userProfile,
      message: chatData.message,
      topicDetails: chatData.topicCard
    })
  });
  
  return await response.json();
}
```

### Real-Time Data Updates

#### Optimistic UI Updates
```javascript
// Immediate UI feedback with rollback capability
const handleSaveDraft = async () => {
  setIsSaving(true);
  
  try {
    const result = await saveDraft(/* ... */);
    showNotification('success', 'Draft saved successfully!');
  } catch (error) {
    showNotification('error', 'Failed to save draft. Please try again.');
  } finally {
    setIsSaving(false);
  }
};
```

---

## Key Takeaways

The Content Lab frontend architecture demonstrates **modern React development practices** with a focus on:

1. **Scalable Component Organization**: Clear separation of concerns with feature-based component structure
2. **Type-Safe Development**: Strategic use of TypeScript patterns and consistent prop interfaces  
3. **Performance Optimization**: Lazy loading, image optimization, and efficient state management
4. **User Experience**: Progressive loading states, optimistic updates, and graceful error handling
5. **Backend Integration**: Clean API abstraction with flexible environment configuration
6. **Design System Consistency**: LeafyGreen integration for cohesive visual experience

This architecture supports rapid development while maintaining code quality and user experience standards expected in modern content management applications, showcasing the powerful combination of React, Next.js, and MongoDB's ecosystem for building sophisticated media industry applications.