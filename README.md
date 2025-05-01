# Code Challenge Repository

## Overview

This repository contains boilerplate code you will use to build the create account form.

## Tech used

You have been given a starter repository using TypeScript / React / Vite / Tailwind / Ruby on Rails. You will only need
a basic understanding of these technologies to successfully complete this coding challenge. Refer to the documentation
links below for more information.

### Development

- [TypeScript for JavaScript Programmers](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)
- [React docs](https://reactjs.org/docs/hello-world.html)
- [Tailwind docs](https://tailwindcss.com/docs/installation)
- [Vite - Getting Started](https://vitejs.dev/guide/)
- [Ruby on Rails - Getting Started](https://guides.rubyonrails.org/getting_started.html)

### Testing

- [Jest - Getting Started](https://jestjs.io/docs/getting-started)
- [Testing Rails Applications](https://guides.rubyonrails.org/testing.html)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/example-intro)

## Commands

`make -j dev` installs packages and starts the development server. The site exists at `localhost:3000`.

`make -j test` runs the tests.

## Versions

```
▶ node -v
v18.17.1

▶ npm -v
10.1.0
```

If NodeJS is not installed on your computer, we recommend using [nvm](https://github.com/nvm-sh/nvm) for version management.

```
▶ ruby -v
ruby 3.1.4p223 (2023-03-30 revision 957bb7cb81) [arm64-darwin22]
```

If Ruby is not installed on your computer, we recommend using [rbenv](https://github.com/rbenv/rbenv) for version management.

**Note:** `[arm64-darwin22]` may be different as it is dependent on your operating system.

# Approach

## Research & Planning
Before diving into implementation, I began with user research to ground my design in familiar onboarding experiences. I reviewed several login and account creation flows across the web, with special attention to Wealthfront’s own onboarding—both on the website and mobile app. This helped me understand Wealthfront’s visual language and tone, and identify opportunities to enhance usability and consistency in this challenge.

## Design Exploration
To explore ideas visually, I used [Figma to mock up the Create Account page](https://www.figma.com/design/9JiwDG1jGvxDUcL01hTyY1/Wealthfront---UX-UI?node-id=2002-4093&m=dev&t=xacaUaYVVgC2Eh37-1). I took inspiration from existing models and sketched out a potential homepage design that could serve as a landing experience, with a “Get Started” button linking to the account creation form. Since the homepage wasn’t required, I linked it to demonstrate how the full experience might look with more time, providing a more holistic product feel.

## Feature Checklist & Validation Criteria
After defining the UI, I made a checklist to guide implementation, based on the provided requirements and additional improvements I wanted to include:

- Username Validation: 10–50 characters
- Password Validation:
  - 20–50 characters
  - Zxcvbn score ≥ 2
  - Must include at least one letter and one number*
 
*One important clarification to note here is: the requirement of including at least one letter and one number has only been enforced for passwords, not usernames. Since the original specification was ambiguous, I followed the common convention that usernames typically do not require numeric characters. However, if the intention was to apply the same rule to usernames as well, the implementation would closely mirror that of the password validation.

## UX Considerations & Enhancements
To ensure a smooth user experience, I implemented the following enhancements:

- Field Highlighting: Inputs change border color when focused to improve visual clarity.
- Error Feedback: Inline red error messages show precisely which validation criteria failed.
- Password Visibility Toggle: Included a "show/hide" button for accessibility and usability.
- Success Feedback: On successful account creation, a green success banner is shown before a short delay and redirect to /signup/account-selection. This accounts for API response time and offers users a clear completion signal.
- Logout Button Styling: I adjusted the logout button’s font and color to be consistent with the overall UI, ensuring a more polished and unified look.

## Components & Testing
Throughout development, I added tests using Jest and React Testing Library to cover key UI and validation logic. For the frontend, I mainly created the CreateAccount component where I implemented strict validation logic for username and password inputs, real-time password strength feedback using Zxcvbn, and conditional UI feedback for successful and failed account creation. I used Jest to test this component using a fetch mock because it allows the frontend logic to be tested in isolation from the backend, ensuring predictable, fast, and reliable tests. This also makes it easy to simulate various API response scenarios (success, client errors, server errors) without needing a live server.

For the backend, I mainly improved the API controller and User model, adding comprehensive validation criteria such as username length constraints, password complexity requirements (minimum length, alphanumeric mix, strength score), and error handling. I thoroughly tested this logic using the built-in Rails testing libraries. This was important to guarantee backend reliability, ensure API contracts are upheld, and provide informative errors to the frontend.

Further, I improved the existing reusable components, focusing on modularity, readability, and alignment with the app’s design system. These enhancements helped reduce duplication and simplified future UI changes. I also made sure all routes were secured and that users could not access protected pages without appropriate navigation flows, improving both app robustness and user experience.

## Future Improvements
If given more time, here are a few improvements I’d like to pursue:

Frontend improvements:

- Global Design Consistency: Apply a shared UI theme across all pages for consistent typography, color, and spacing.
- Back Button Support: The current flow is one-directional; I would add navigation controls to let users revise earlier responses.
- Enhanced Responsiveness: Although not required, adapting the layout for different screen sizes would improve real-world usability.
- Mocked Home Flow: Fully implement the Figma home page concept and link it to the create account experience for a more realistic app entry point.
- Login Page: Provide a separate login experience for users who already have an account, allowing them to bypass account creation.
- Forgot Password Feature: Add a "Forgot password?" flow that sends a recovery link or code, improving usability and user trust.

Backend improvements:

- User Sessions: Create session management for users upon successful account creation or login, allowing them to stay authenticated across pages.
- Authentication Layer: Implement basic authentication middleware to restrict access to certain routes unless a valid session or token is present.
- Account Tracking: Store and track which users have created accounts to prevent duplicate usernames and improve error handling in the sign-up process.
- Password Recovery Support: Add endpoints for handling password resets, including email or token-based verification.
- Session Persistence: Optionally allow sessions to persist via cookies or token storage for improved UX and security.
