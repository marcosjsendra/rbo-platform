Hello, please analyze the following files:

@REI API CCA v1.markdown @2officesCredentials.md 

This api uses this website: https://remax-cca.com/api/v1 to submit properties and looks for registed agents.

So my idea is to create a real estate website that is able to look into the api for properties and agents of RE/MAX AZURA and RE/MAX BLUE OCEAN and display static content, display properties an agents, and search and filter properties.

I want to start very simple, implement the API with my website, be able to display, search and filter properties and agents and have some static content with a good layout.

I will scale up and implement more feature that the API allows, but right now I am targeting to start something simple and stable.

------

# Project Prompt: Real Estate Website Using RE/MAX API

Hello, please analyze the following files:

- REI API CCA v1.markdown  
- 2officesCredentials.md

These files are related to the RE/MAX Central America API, available at:

Base URL: https://remax-cca.com/api/v1

This API is used to submit property data and retrieve registered agents.

## Project Goal

I am building a real estate website for the RE/MAX AZURA and RE/MAX BLUE OCEAN offices.

## Phase 1 Objective: MVP (Minimum Viable Product)

The goal is to create a simple and stable real estate website with the following features:

- Static pages for brand content and general information
- Static content: @aboutuspage.md@agents.md@bluezone.md@brandguidelines.md@contactus.md@homecontent.md@luxurycollectionpage.md@services.md 
- API integration to:
  - Display properties from both RE/MAX AZURA and RE/MAX BLUE OCEAN
  - Display agent profiles associated with those offices
  - Provide property search and filtering capabilities

## Technical Requirements

- Implement the RE/MAX API to fetch and render:
  - Property listings
  - Agent details
- Support property filtering (price, location, bedrooms, etc.) based on available API parameters
- Ensure the layout is responsive and user-friendly
- Prepare the architecture to scale with future API features such as:
  - Pagination
  - Property submission
  - User authentication
  - Interactive map support

## Next Steps

1. Analyze the structure and endpoints of the RE/MAX API to identify available parameters and authentication requirements.
2. Design the initial layout and components for static pages, property cards, agent cards, and filters.
3. Recommend a simple, modern tech stack to support frontend rendering and API integration. For example: Next.js, Tailwind CSS, and Axios or Fetch API.
4. Optionally define routing structure and state management if needed.

Please use this information to provide an implementation plan or to assist in building the first version of the website.