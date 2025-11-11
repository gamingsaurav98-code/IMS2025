# IMS2025 Frontend

A modern Next.js frontend for the IMS2025 application with TypeScript, Tailwind CSS, and comprehensive testing setup.

## Features

- ⚡ **Next.js 16** - React framework with App Router
- 🎨 **Tailwind CSS** - Utility-first CSS framework
- 📘 **TypeScript** - Type safety and better developer experience
- 🧪 **Jest & React Testing Library** - Testing framework ready for unit and integration tests
- 📝 **ESLint** - Code quality and consistency

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/             # Reusable React components
│   └── (add your components here)
├── __tests__/              # Test files
│   └── page.test.tsx       # Sample test
└── lib/                    # Utility functions and helpers
    └── (add utilities here)

public/                      # Static assets
.next/                       # Build output (git ignored)
jest.config.ts              # Jest configuration
jest.setup.ts               # Jest setup file
next.config.ts              # Next.js configuration
postcss.config.mjs          # PostCSS configuration for Tailwind
tailwind.config.ts          # Tailwind CSS configuration
tsconfig.json               # TypeScript configuration
```

## Getting Started

### Installation

Dependencies are already installed. If you need to reinstall:

```bash
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build

Create a production build:

```bash
npm run build
```

### Production

Start the production server:

```bash
npm start
```

## Testing

### Run Tests

Run all tests:

```bash
npm test
```

### Watch Mode

Run tests in watch mode for development:

```bash
npm run test:watch
```

### Coverage Report

Generate a code coverage report:

```bash
npm run test:coverage
```

## Linting

Check code quality:

```bash
npm run lint
```

## Development Workflow

1. **Create Components**: Add new components in the `src/components/` directory
2. **Add Tests**: Create test files alongside components with `.test.tsx` extension in `src/__tests__/`
3. **Style with Tailwind**: Use Tailwind utility classes in your components
4. **Type Everything**: Utilize TypeScript for better development experience

## Available Scripts

| Script                  | Description              |
| ----------------------- | ------------------------ |
| `npm run dev`           | Start development server |
| `npm run build`         | Build for production     |
| `npm start`             | Start production server  |
| `npm test`              | Run tests                |
| `npm run test:watch`    | Run tests in watch mode  |
| `npm run test:coverage` | Generate coverage report |
| `npm run lint`          | Run ESLint               |

## Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

Note: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser.

## Deployment

The project is ready to be deployed to:

- **Vercel** (Recommended for Next.js)
- **Docker**
- **Traditional Node.js servers**

### Docker Deployment

```bash
docker build -t ims2025-frontend .
docker run -p 3000:3000 ims2025-frontend
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Jest Documentation](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## License

This project is part of the IMS2025 application.
