# The Content Lab

The Content Lab is the graphical user interface (GUI) for our demo content creation platform, showcasing the integration of MongoDB's powerful features tailored specifically for Media and Publishing. This UI allows users to interact with a fully functional demo content management environment, highlighting advanced capabilities like real-time content aggregation, AI-powered writing assistance, and a seamless editorial experience. It is designed to demonstrate the potential of building modern, journalist-focused content applications with MongoDB as the backbone.

An important feature of The Content Lab is the AI Writing Assistant, an intelligent chatbot embedded within the application. This chatbot enhances the content creation process by providing contextual writing suggestions, style adaptations based on user personas, and real-time feedback on draft content, showcasing the incorporation of AI-powered assistance in modern journalism workflows.

## Components and Features

The Content Lab is composed of several interconnected features that demonstrate the capabilities of modern content management systems. Users can:

**Select a Demo User**
- Choose from a range of pre-loaded demo personas
- Each user has unique writing styles, preferences, and AI assistant personalities
- Designed to create a dynamic, realistic experience for different content creation approaches

**Explore Trending Content**
- View curated news articles and viral social media posts
- Access real-time content aggregation from multiple sources
- Browse categorized content across topics like technology, business, sports, and culture

**Research Content Topics**
- Discover trending topics and content suggestions
- Access topic-specific research data and background information
- Generate content ideas based on current trends and user interests

**Create and Edit Drafts**
- Use a rich text editor for professional content creation
- Save drafts manually with metadata including title, category, and keywords
- Edit existing drafts with formatting capabilities and content persistence

**Interact with AI Writing Assistant**
- Chat with persona-specific AI assistants for writing guidance
- Receive contextual suggestions based on current draft content
- Get style recommendations tailored to the selected user persona

**Manage Content Library**
- Save your drafts for future reference

**Switch Between Demo Users**
- Seamlessly switch between different content creator personas
- Experience how writing styles and AI assistance adapt to different user types
- Validate and test how content creation workflows behave across different user contexts

## Where Does MongoDB Shine?

_This section will contain architecture diagrams and detailed backend service explanations once the supporting microservices documentation is complete._

## Tech Stack

The Content Lab is built with a modern tech stack designed to deliver a responsive and dynamic content creation experience. Here's an overview of the primary technologies used:

**Web Framework:**
- [Next.js 15](https://nextjs.org/) with App Router for the framework
- [React 19 RC](https://react.dev/) for the frontend library

**Styling:**
- [CSS Modules](https://github.com/css-modules/css-modules) for component styling
- [LeafyGreen UI](https://github.com/mongodb/leafygreen-ui) for the design system

**UI Components:**
- [LeafyGreen UI](https://github.com/mongodb/leafygreen-ui) for customizable components
- [TipTap](https://tiptap.dev/) for rich text editing
- [Lucide React](https://lucide.dev/) for icons

**Animations and Effects:**
- Open-source components from [Magic UI](https://magicui.design/) and [React Bits](https://reactbits.dev/)

## Project Structure

```
src/
├── app/                    # Next.js App Router with route groups
├── components/             # React components (Dashboard, Layout, Login, Open-source components)
├── hooks/                  # Custom React hooks for state management  
├── api/                    # Backend service integration layer
├── utils/                  # Utility functions and constants
├── public/                 # Static assets (categories, users, mongodb)
├── package.json           # Dependencies and scripts
```

## Prerequisites

To run The Content Lab locally, ensure the following prerequisites are met.

**Add environment variables**

Note: Create a `.env.local` file within the `/src` directory.

```bash
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
NEXT_PUBLIC_CHAT_BACKEND_URL="http://localhost:8001"
```

**Backend Services**

The UI depends on multiple backend services, which must be running to enable full functionality. It is recommended to configure these services to run on their respective ports:

- **Main Backend Service (Port 8000)** - Handles news aggregation, draft management, content research, and user profiles. Essential for core functionality.
- **Chat/AI Backend Service (Port 8001)** - Manages AI writing assistant interactions and contextual content suggestions. Essential for AI-powered features.

**Node.js Requirements**
- Node.js 14 or higher

These prerequisites are essential for creating a complete and realistic demo environment for The Content Lab. Ensure all services are running and correctly configured to enable smooth interaction across the application.

## Run it Locally

Note: Once you have the backend services running, you can start The Content Lab locally. Follow these steps to run the UI on your machine:

**Run on Local Machine**
1. Navigate to the `/src` folder.
2. Install dependencies by running:
```bash
npm install
```
3. Start the frontend development server with:
```bash
npm run dev
```
4. The frontend will now be accessible at http://localhost:3000 by default, providing a user interface.

**Run with Docker**

Make sure to run this on the root directory.

1. To run with Docker use the following command:
```
make build
```
2. To delete the container and image run:
```
make clean
```

## Common Errors & Troubleshooting

- Check that you've created an `.env.local` file that contains the required environment variables.
- Required environment variables:
  - `NEXT_PUBLIC_BACKEND_URL`: Main backend service URL (defaults to http://localhost:8000)
  - `NEXT_PUBLIC_CHAT_BACKEND_URL`: Chat/AI backend service URL (defaults to http://localhost:8001)
- If experiencing build issues with peer dependencies, try installing with `npm install --legacy-peer-deps`