---
trigger: always_on
---

### Project Awareness & Context

- **Always read `PLANNING.md`** at the start of a new conversation to understand the project's architecture, goals, style, and constraints.
- **Check `TASK.md`** before starting a new task. If the task isn’t listed, add it with a brief description and today's date.
- **Use consistent naming conventions, file structure, and architecture patterns** as described in `PLANNING.md`.

### Code Structure & Modularity

- If a file exceeds 500 lines of code:
  - Refactor by splitting it into modules or helper files.
  - Create separate modules or components for reusable or isolated functionality
  - Maintain clear file structure and naming conventions to ensure maintainability
  - Document each segment accordingly with references to the original structure.

---

- **Organize code into clearly separated modules**, grouped by feature or responsibility.
- **Use clear, consistent imports** (prefer relative imports within packages).

### Testing & Reliability

- **Write unit and integration tests** using [Jest](https://jestjs.io/) and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) for all new components, hooks, utilities, and business logic.
- **Use Cypress** for end-to-end (E2E) testing of user flows and critical paths.
- **Update or refactor existing tests** whenever you change relevant code logic.
- **Place tests in a `/__tests__` directory** or alongside components using `.test.tsx` / `.test.ts` file naming.
- **Follow this minimum test rule for each function or component:**
  - One test for the expected (normal) use case
  - One test for a meaningful edge case
  - One test for a failure scenario or incorrect usage

#### Recommended testing libraries/tools

- `jest` – for unit and integration testing
- `@testing-library/react` – for component rendering and interaction
- `@testing-library/jest-dom` – for improved assertions
- `cypress` – for full E2E browser testing
- `msw` (Mock Service Worker) – to mock API calls in both unit and E2E tests

# Task Completion

## Implementation Documentation Structure

### 1. Tasks

**Location:** remax-blueocean/docs/TASK.md

- Contains five main phases, each broken down into actionable tasks
- Each task should be marked as completed using `[x]` when finished

### 2. Progress Tracker

**Location:** remax-blueocean/docs/Progress%Tracker

- Create a detailed report for every completed task
- Organize reports by phase (`Phase1`, `Phase2`, etc.)
- Use consistent file naming format: `TaskX_Y_Z_Report.md`
  (Example: `Task1_4_2_Report.md`)

### 3. Task Completion Checklist

When completing a task:

- Create a detailed report in the Progress Tracker
- Update the `TASK.md` file and mark the task as `[x]`
- Link the report in the corresponding task using relative paths
- Update remax-blueocean/docs/README.md with:

  - A summary of changes made
  - The current development stage
  - Any key notes or next steps
  - A link to the detailed report

### 4. Report Format Guidelines

Each task report should include:

- A clear description of the task
- A summary of what was implemented
- Any challenges encountered and how they were resolved
- Relevant code snippets, screenshots, or diagrams
- Links to related files, commits, or resources

## Style & Conventions

- **Use TypeScript** throughout the project.
- **Follow Next.js best practices**, using the App Router architecture (Next.js 14+).
- **Use Tailwind CSS** for styling with utility-first principles.
- **Leverage Headless UI and Radix UI** for accessible, customizable components.
- **Manage state with React Query (TanStack Query)** for data fetching and caching.
- **Use Axios** for HTTP requests.
- **Handle forms with React Hook Form**, using **Zod** for schema-based validation.
- **Implement authentication via NextAuth.js**.
- **Use Prisma** as ORM, connected to **Supabase** as the Postgres database.
- **Deploy with Vercel**, utilizing edge functions or serverless functions when needed.
- **For maps**, Google Maps depending on the use case.
- **Use modular and reusable components**, follow DRY (Don’t Repeat Yourself) and KISS (Keep It Simple) principles.
- **Add JSDoc-style comments** for all functions and components for documentation and IDE assistance.

### Documentation & Explainability

- **Update `README.md`** when new features are added, dependencies change, or setup steps are modified.
- **Comment non-obvious code** and ensure everything is understandable to a mid-level developer.
- When writing complex logic, **add an inline `# Reason:` comment** explaining the why, not just the what.

### AI Behavior Rules

- **Never assume missing context. Ask questions if uncertain.**
- **Never hallucinate libraries or functions** – only use known, verified and officially documented packages from the JavaScript/TypeScript ecosystem (e.g., npm, yarn, or pnpm registries). Always prefer libraries that are well-maintained, actively used, and compatible with your stack (Next.js, TypeScript, Prisma, Supabase, etc.).
- **Always confirm file paths and module names** exist before referencing them in code or tests.
- **Never delete or overwrite existing code** unless explicitly instructed to or if part of a task from `TASK.md`.

## Project Structure & Architecture

- Follow Next.js patterns and use the App Router.
- Correctly determine when to use server vs. client components in Next.js.

## Styling & UI

- Use Tailwind CSS for styling.
- Use Shadcn UI for components.

## MCP Servers available:

- context7: use to pull up-to-date, version-specific documentation and code examples straight from the source and places them directly into the prompt.
- brave-search: Search the web (great for pulling documentation) with Brave Search.
- filesystem: File system MCP (read/write, refactor, multi-file edits).
- supabase: Manage your Supabase (create databases, make new tables, etc.).
- sequential-thinking: Dynamic and reflective problem-solving through thought sequences.
