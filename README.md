# The Content Lab

**The Content Lab is the graphical user interface (GUI) for our demo content creation platform**, showcasing the integration of MongoDB's powerful features tailored specifically for Media and Publishing. This responsive and intuitive UI allows users to interact with a fully functional demo content management environment, highlighting advanced capabilities like real-time content aggregation, AI-powered writing assistance, and a seamless editorial experience. It is designed to demonstrate the potential of building modern, journalist-focused content applications with MongoDB as the backbone.

An important feature of The Content Lab is the **AI Writing Assistant**, an intelligent chatbot embedded within the application. This chatbot enhances the content creation process by providing contextual writing suggestions, style adaptations based on user personas, and real-time feedback on draft content, showcasing the incorporation of AI-powered assistance in modern journalism workflows.

## Components and Features:

The Content Lab is composed of several interconnected features that demonstrate the capabilities of modern content management systems. Users can:

1. **Select a Demo User**
   - Choose from a range of pre-loaded demo personas (Helly R., Mark S., Ms. Casey).
   - Each user has unique writing styles, preferences, and AI assistant personalities.
   - Designed to create a dynamic, realistic experience for different content creation approaches.

2. **Explore Trending Content**
   - View curated news articles and viral social media posts.
   - Access real-time content aggregation from multiple sources.
   - Browse categorized content across topics like technology, business, sports, and culture.

3. **Research Content Topics**
   - Discover trending topics and content suggestions.
   - Access topic-specific research data and background information.
   - Generate content ideas based on current trends and user interests.

4. **Create and Edit Drafts**
   - Use a rich text editor powered by TipTap for professional content creation.
   - Save drafts manually with metadata including title, category, and keywords.
   - Edit existing drafts with full formatting capabilities and content persistence.

5. **Interact with AI Writing Assistant**
   - Chat with persona-specific AI assistants for writing guidance.
   - Receive contextual suggestions based on current draft content.
   - Get style recommendations tailored to the selected user persona.

6. **Manage Content Library**
   - Save interesting articles and content for future reference.
   - Organize saved content by categories and topics.
   - Access a personal content library for research and inspiration.

7. **Switch Between Demo Users**
   - Seamlessly switch between different content creator personas.
   - Experience how writing styles and AI assistance adapt to different user types.
   - Validate and test how content creation workflows behave across different user contexts.

## Where Does MongoDB Shine?

The Content Lab demonstrates the power and flexibility of MongoDB, making it an ideal choice for modern content management and media applications. By leveraging MongoDB's advanced features, the backend services are designed to handle complex content operations efficiently and securely.

This modern **microservices architecture** splits functionalities across different repositories, showcasing a real-world approach to scalable and maintainable software development. Here's how MongoDB shines in the backend services powering The Content Lab:

### 1. **Content Aggregation Service**
This service handles real-time news aggregation and viral content discovery from multiple sources. MongoDB excels here by offering a **flexible document model** that can seamlessly store diverse content structures from different APIs (news articles, Reddit posts, social media content) without requiring schema migrations. Its powerful **aggregation pipelines** enable efficient content filtering, categorization, and ranking based on engagement metrics.

![content aggregation diagram](diagrams/content_aggregation_diagram.png)

---

### 2. **Draft Management Service**
Responsible for handling article creation, editing, and persistence, this service uses MongoDB's **document model** to store rich content with embedded metadata. The **flexible schema** allows for dynamic content structures, supporting various article formats, embedded media, and evolving content requirements. MongoDB's efficient indexing ensures fast retrieval and search capabilities across large content collections.

![draft management diagram](diagrams/draft_management_diagram.png)

---

### 3. **AI Writing Assistant Service**
This service powers the intelligent chatbot that provides contextual writing assistance. It leverages **MongoDB Atlas Vector Search** to store and query high-dimensional embeddings from content drafts and user interactions. Vector search enables the AI to retrieve contextually relevant suggestions, writing style recommendations, and persona-specific guidance efficiently. MongoDB's optimized vector search ensures fast and accurate AI-driven interactions within The Content Lab ecosystem.

![ai writing assistant diagram](diagrams/ai_writing_assistant_diagram.png)

---

### 4. **User Profile and Personalization Service**
This service manages user personas, preferences, and writing styles. MongoDB's **document model** perfectly aligns with the complex user profile structures, storing writing preferences, AI assistant personalities, and content history in a natural JSON-like format. The **flexible schema** accommodates evolving user attributes without requiring database migrations.

![user profile service diagram](diagrams/user_profile_service_diagram.png)

---

### 5. **Content Research and Discovery Service**
This service handles topic research, trend analysis, and content recommendations. MongoDB's **aggregation framework** powers complex analytical queries across content collections, enabling trend detection, topic clustering, and personalized content suggestions. The document model efficiently stores research data, topic metadata, and recommendation algorithms' outputs.

![content research service diagram](diagrams/content_research_service_diagram.png)

---

By adopting a **microservices architecture**, The Content Lab splits features across multiple repositories. This design not only supports **scalability**, **modular development**, and **independent deployments** but also underscores MongoDB's versatility in driving dynamic and robust content management systems.

This approach reflects a **modern and practical way to develop software**, supporting the scalability, modularity, and maintainability required for media and publishing applications in today's fast-evolving digital landscape.

## Tech Stack

The Content Lab is built with a modern tech stack designed to deliver a responsive and dynamic content creation experience. Here's an overview of the primary technologies used:

- **Web Framework:**
  - [Next.js 15](https://nextjs.org/) with App Router

- **Frontend Library:**
  - [React 19 RC](https://react.dev/)

- **Styling:**
  - [CSS Modules](https://github.com/css-modules/css-modules) for component styling
  - [LeafyGreen Design System](https://www.mongodb.design/)

- **UI Components:**
  - [LeafyGreen UI](https://github.com/mongodb/leafygreen-ui) for customizable components
  - [Lucide React](https://lucide.dev/) for extra icons

- **Animations and Effects:**
  - Open-source components from [Magic UI](https://magicui.design/) and [React Bits](https://reactbits.dev/)

- **Typography:**
  - [Geist Font](https://vercel.com/font)

- **Core React and Next.js:**
  - `next`, `react`, `react-dom`

This tech stack ensures The Content Lab is both powerful and user-friendly, capable of handling the interactive needs of modern content creation applications.

## Prerequisites

To run The Content Lab locally, ensure the following prerequisites are met.

### Add environment variables

> **_Note:_** Create a `.env.local` file within the `/src` directory.

```bash
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
NEXT_PUBLIC_CHAT_BACKEND_URL="http://localhost:8001"
```

### Backend Services

The UI depends on multiple backend services, which must be running to enable full functionality. It is recommended to configure these services to run on their respective ports:

- **Main Backend Service** (Port **8000**)
  - *Handles news aggregation, draft management, content research, and user profiles. Essential for core functionality.*
- **Chat/AI Backend Service** (Port **8001**)
  - *Manages AI writing assistant interactions and contextual content suggestions. Essential for AI-powered features.*

### Node.js Requirements
- **Node.js 14 or higher**

These prerequisites are essential for creating a complete and realistic demo environment for The Content Lab. Ensure all services are running and correctly configured to enable smooth interaction across the application.

## Run it Locally

> **Note**: Once you have the backend services running, you can start The Content Lab locally. Follow these steps to run the UI on your machine:

### Run on Local Machine

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

## Run with Docker

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