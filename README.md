# ResortPass

A hotel day pass booking platform built with Next.js. Search and filter hotels by location, amenities, dates, and more.

## Live Demo

🌐 **Live Application**: [https://resort-pass-eight.vercel.app/](https://resort-pass-eight.vercel.app/)

## Features

- **Hotel Search**: Browse hotels with location-based filtering
- **Advanced Filters**: Filter by amenities (pool, spa, gym, beach access, etc.), price range, ratings, and distance
- **Date Selection**: Pick dates for your stay using an intuitive date picker
- **Category Tabs**: Browse hotels by category (All, Pool, Spa, Day Room)
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI component library
- **Radix UI** - Accessible component primitives
- **Jest** - Testing framework

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run type-check` - Check TypeScript types
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── app/              # Next.js app router pages
├── components/       # React components
├── contexts/         # React contexts (SearchContext)
├── lib/              # Utilities and business logic
├── types/            # TypeScript type definitions
└── images/           # Static images
```

## Testing

Tests are located in `src/lib/__tests__/`. Run the test suite with:

```bash
npm test
```
