# IMS2025 Frontend - Quick Start Guide

## ✅ Setup Complete!

Your Next.js frontend is ready to use. Here's what's been set up:

### 📦 What's Included

- **Next.js 16** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Jest** + **React Testing Library** for testing
- **ESLint** for code quality
- **Sample Button Component** with tests
- **Docker support** for containerization
- **Environment configuration** ready for backends

### 🚀 Quick Start

1. **Start Development Server**

   ```bash
   npm run dev
   ```

   Visit: http://localhost:3000

2. **Run Tests**

   ```bash
   npm test
   ```

3. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

### 📁 Project Structure

```
src/
├── app/                    # App Router pages & layouts
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Button.tsx         # Sample Button component
│   └── [Your Components Here]
└── __tests__/             # Test files
    ├── page.test.tsx      # Home page test
    ├── Button.test.tsx    # Button component test
    └── [Your Tests Here]

public/                    # Static assets
```

### 📝 Important Files

- `jest.config.js` - Jest testing configuration
- `jest.setup.ts` - Jest setup (imports testing utilities)
- `next.config.ts` - Next.js configuration
- `tailwind.config.ts` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `.env.example` - Environment variables template

### 🧪 Testing Examples

**Run All Tests:**

```bash
npm test
```

**Run Tests in Watch Mode:**

```bash
npm run test:watch
```

**Generate Coverage Report:**

```bash
npm run test:coverage
```

### 🎨 Component Development

**Create a New Component:**

```typescript
// src/components/MyComponent.tsx
import React from "react";

interface MyComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold">{title}</h2>
    </div>
  );
};
```

**Create a Test:**

```typescript
// src/__tests__/MyComponent.test.tsx
import { render, screen } from "@testing-library/react";
import { MyComponent } from "@/components/MyComponent";

describe("MyComponent", () => {
  it("renders with title", () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
```

### 🌍 Environment Variables

Copy `.env.example` to `.env.local` and update values:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://your-backend-url:3001
```

### 🐳 Docker Deployment

**Build Docker Image:**

```bash
docker build -t ims2025-frontend .
```

**Run Container:**

```bash
docker run -p 3000:3000 ims2025-frontend
```

### 📚 Available Scripts

| Command                 | Purpose                                   |
| ----------------------- | ----------------------------------------- |
| `npm run dev`           | Start dev server on http://localhost:3000 |
| `npm run build`         | Build for production                      |
| `npm start`             | Start production server                   |
| `npm test`              | Run all tests                             |
| `npm run test:watch`    | Run tests in watch mode                   |
| `npm run test:coverage` | Generate coverage report                  |
| `npm run lint`          | Run ESLint                                |

### 🔗 API Integration

Update your API calls to use the environment variable:

```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchData() {
  const response = await fetch(`${API_URL}/api/endpoint`);
  return response.json();
}
```

### 📖 Learn More

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Jest Testing](https://jestjs.io/)
- [React Testing Library](https://testing-library.com/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### ✨ Next Steps

1. Update `.env.local` with your backend URL
2. Start building components in `src/components/`
3. Add tests alongside your components
4. Use Tailwind classes for styling
5. Deploy to Vercel or Docker when ready

Happy coding! 🎉
