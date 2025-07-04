# Topics Component System

## Architecture Overview

The Topics page implements the **"Lift State Up"** pattern with the Topics container serving as the single source of truth for all state management.

```
Topics Container (State Manager)
├── GridPattern (Background)
├── Search (User Input)
│   ├── SearchBar (Query input + Filter dropdown)
│   └── RecQueries (Recommended query cards)
└── Suggestions (Data Display)
    ├── TopicCard components
    └── Loading/Error/Empty states
```

## Data Flow

### 1. State Management (Topics Container)
- **searchQuery**: Current search input value
- **selectedLabel**: Selected filter category ('all', 'technology', etc.)
- **topics**: Array of topic data from API
- **isLoading**: Loading state for API calls
- **error**: Error message for failed requests

### 2. User Interactions → API Calls

#### Search Flow:
```
User types → SearchBar updates local state (no API call)
User presses Enter → handleSearchSubmit() → debouncedFetch() → API call
```

#### Filter Flow:
```
User selects filter → handleLabelChange() → immediate API call
```

#### Recommended Query Flow:
```
User clicks query card → RecQueries.onQuerySelect → handleSearchSubmit() → API call
```

## API Integration

### Frontend → Next.js API Route
```javascript
POST /api/suggestedTopics
Body: { query: "search term", label: "technology" }
```

### Next.js API Route → Backend
```javascript
GET http://backend/api/suggestions?query=search%20term&label=technology
```

### Label Handling
- **label = 'all'**: No label parameter sent (returns all topics)
- **label = 'technology'**: Filters to technology topics only

## Key Features

### 1. Request Optimization
- **Debouncing**: 300ms delay on search submission to prevent spam
- **Deduplication**: Prevents identical consecutive API calls
- **Loading Prevention**: Blocks new requests while one is in flight

### 2. State Synchronization
- **Controlled Components**: SearchBar and Dropdown reflect parent state
- **Callback Chain**: Child components call parent callbacks for state updates
- **Single Source of Truth**: All state managed in Topics container

### 3. User Experience
- **Enter-only Search**: No search-as-you-type behavior
- **Immediate Filtering**: Filter changes trigger instant API calls
- **Loading States**: Skeleton screens during API calls
- **Error Handling**: User-friendly error messages
- **Empty States**: Helpful messages when no results found

## Component Responsibilities

### Topics Container (`index.jsx`)
- ✅ State management for entire page
- ✅ API call orchestration
- ✅ Request optimization (debouncing, deduplication)
- ✅ Error handling

### Search (`Search/index.jsx`)
- ✅ Forward callbacks to child components
- ✅ Bridge between Topics container and search UI

### SearchBar (`Search/SearchBar/index.jsx`)
- ✅ Controlled input component
- ✅ Handle Enter key submission
- ✅ Local state for typing (synced with parent)

### FilterDropdown (`Search/Dropdown/index.jsx`)
- ✅ Controlled dropdown component
- ✅ Trigger immediate filter changes

### RecQueries (`Search/RecQueries/index.jsx`)
- ✅ Pre-defined query suggestions
- ✅ Trigger search on click

### Suggestions (`Suggestions/index.jsx`)
- ✅ Pure display component
- ✅ Handle loading, error, and empty states
- ✅ Render topic cards

## Utility Functions

Located in `@/lib/utils.js`:
- **debounce()**: Prevents rapid function calls
- **areRequestsEqual()**: Compares request objects for deduplication

## Usage Example

```javascript
// Topics container handles all state
const [searchQuery, setSearchQuery] = useState('');
const [selectedLabel, setSelectedLabel] = useState('all');

// User interactions trigger callbacks
<Search 
  onSearchSubmit={handleSearchSubmit}
  onLabelChange={handleLabelChange}
  searchQuery={searchQuery}
  selectedLabel={selectedLabel}
/>

// Data flows down to display component
<Suggestions 
  topics={topics}
  isLoading={isLoading}
  error={error}
/>
```

## Development Notes

- **No search-as-you-type**: Only triggers on Enter key press
- **Filter changes are immediate**: No debouncing for label changes
- **Backend expects GET**: Next.js API route converts POST to GET with query params
- **Request deduplication**: Prevents unnecessary API calls for identical requests 