# Project Objective: RE/MAX Blue Ocean Website

**This is the core goal. It is very important to focus only on the following features for the initial release.**

We are building a **real estate website** for **RE/MAX AZURA** and **RE/MAX BLUE OCEAN** that includes:

- Stable static content (already implemented)
- Retrieval of properties and agents from the **REI API CCA**, and storing them in our local database for fast access
- Search and filter functionality for property listings
- Property cards and individual property detail pages
- Agent cards and individual agent detail pages

**This is all we want to implement for now. Please focus solely on these five features.**

---

## Implementation Documentation Structure

### 1. Implementation Plan

**Location:** remax-blueocean/docs/implementation_plan.md

- Contains four main phases, each broken down into actionable tasks
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
- Update the `implementation_plan.md` file and mark the task as `[x]`
- Link the report in the corresponding task using relative paths
- Update remax-blueocean/docs/README.md with:

  - A summary of changes made
  - The current development stage
  - Any key notes or next steps
  - A link to the detailed report

---

## 4. Report Format Guidelines

Each task report should include:

- A clear description of the task
- A summary of what was implemented
- Any challenges encountered and how they were resolved
- Relevant code snippets, screenshots, or diagrams
- Links to related files, commits, or resources

---

## 5. Development Best Practices

- Before implementing any page or feature, review the entire content source file.
- For markdown content:

  - Ensure all sections and subsections are implemented
  - Pay close attention to content below the initial viewport
  - Cross-reference every section with headings and bullet points

### Handling Large Files

- If a file exceeds 300 lines of code:

  - Break it down into smaller, manageable chunks
  - Create separate modules or components for reusable or isolated functionality
  - Maintain clear file structure and naming conventions to ensure maintainability
  - Document each segment accordingly with references to the original structure

## Error Handling

- If I encounter an error (in console, frontend, or IDE), I will report it at:
  `/remax-blueocean/docs/Errors/reported/phase*/`
  and share the file or its content with you.

- Your task is to fix the error and submit a report at:
  `/remax-blueocean/docs/Errors/fixedReport/phase*/`

- Reports must include:
  - Description of the error
  - What was changed or fixed
  - Affected files or code

  ## Mock Data

Do not create or use mock data.

All testing and implementation must use real data from the REI API CCA.

If a request fails, return the actual error response and explain it.
I need to see real data and real errors to debug and reach a stable implementation.

