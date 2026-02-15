# Repository Guidelines

Welcome to the contributor guide for this React + TypeScript + Vite project. This document outlines the structure, development workflow, and coding conventions used in this repository.

## Project Structure

The repository follows a standard React project structure with TypeScript:

```
.
├── src/
│   ├── components/     # Shared UI components
│   │   ├── ui/         # Reusable UI primitives
│   │   └── effects/    # Visual effects components
│   ├── sections/       # Page sections and layouts
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions and helpers
│   ├── App.tsx         # Main application component
│   ├── main.tsx        # Application entry point
│   ├── index.css       # Global styles
│   └── App.css         # Component-specific styles
├── public/             # Static assets
├── dist/               # Production builds
├── node_modules/       # Dependencies
├── package.json        # Project metadata and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── README.md           # Project overview
```

## Build, Test, and Development Commands

The following commands are available through npm/pnpm:

- `pnpm dev` - Starts the development server with hot module replacement
- `pnpm build` - Compiles TypeScript and bundles the application for production
- `pnpm lint` - Runs ESLint to check for code issues
- `pnpm preview` - Locally previews the production build

## Coding Style & Naming Conventions

This project follows these coding conventions:

1. **Language**: TypeScript with ES6+ features
2. **Component Structure**: Functional components with hooks
3. **Naming Patterns**:
   - PascalCase for components (`UserProfile.tsx`)
   - camelCase for variables and functions (`getUserData()`)
   - kebab-case for file names (`user-profile.tsx`)
   - UPPER_CASE for constants (`API_ENDPOINTS`)
4. **Imports**: Absolute imports preferred using `@/*` alias for `src/*`
5. **Styles**: Tailwind CSS for styling with utility classes

### Formatting and Linting

ESLint is configured with React and TypeScript rules. Key configurations include:

- Type-aware linting through `tseslint.configs.recommendedTypeChecked`
- React-specific rules via `eslint-plugin-react-x` and `eslint-plugin-react-dom`
- Stylistic rules from `tseslint.configs.stylisticTypeChecked`

Run `pnpm lint` to check for issues before committing.

## Testing Guidelines

This project currently uses manual testing during development. For new features:

1. Ensure components render correctly in the dev environment
2. Verify functionality across different screen sizes
3. Check for TypeScript compilation errors

Future automated testing should follow these conventions:

- Use Jest for unit tests
- Use React Testing Library for component tests
- Place test files alongside components with `.test.tsx` extension
- Aim for 80%+ test coverage for critical components

## Commit & Pull Request Guidelines

### Commit Messages

Follow conventional commits format:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

Types include: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `perf`, `test`

### Pull Requests

When submitting PRs:

1. Provide a clear title summarizing the changes
2. Include a description explaining:
   - What changed
   - Why it was needed
   - How it was implemented
3. Reference any related issues
4. Ensure all checks pass (build, lint)
5. Request review from team members

## Additional Notes

- This project uses Radix UI primitives for accessible components
- GSAP is included for advanced animations
- Tailwind CSS is configured for styling with custom themes
- Path aliases are configured (`@/*` maps to `src/*`)

For questions or clarifications, reach out to the project maintainers.
