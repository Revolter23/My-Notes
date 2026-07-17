import { Note } from "@/app/_lib/definitions";

export const notes: Omit<Note, "userid">[] = [
	{
		id: "1",
		title: "Getting Started with TypeScript",
		content:
			"TypeScript is a powerful programming language that builds on JavaScript by adding static types. This helps catch errors early and improves code quality.",
		date: "2026-01-03T10:00:00Z",
	},
	{
		id: "2",
		title: "React Best Practices",
		content:
			"Always use functional components with hooks instead of class components. Keep your components small and focused on a single responsibility.",
		date: "2026-01-07T10:00:00Z",
	},
	{
		id: "3",
		title: "Database Design Tips",
		content:
			"Normalize your database schema to reduce redundancy. Use proper indexing on frequently queried columns to improve performance.",
		date: "2026-01-11T10:00:00Z",
	},
	{
		id: "4",
		title: "API Development Guide",
		content:
			"RESTful APIs should follow standard HTTP methods. Always validate user input and implement proper error handling.",
		date: "2026-01-05T10:00:00Z",
	},
	{
		id: "5",
		title: "CSS Flexbox Tutorial",
		content:
			"Flexbox is a one-dimensional layout method for arranging items in rows or columns. Use flex-direction, justify-content, and align-items for alignment.",
		date: "2026-01-09T10:00:00Z",
	},
	{
		id: "6",
		title: "JavaScript Async Patterns",
		content:
			"Master async/await for cleaner asynchronous code. Always handle promises and catch errors appropriately to avoid unhandled rejections.",
		date: "2026-01-15T10:00:00Z",
	},
	{
		id: "7",
		title: "Git Workflow Best Practices",
		content:
			"Use descriptive commit messages. Create feature branches for new development and use pull requests for code review before merging.",
		date: "2026-01-02T10:00:00Z",
	},
	{
		id: "8",
		title: "Performance Optimization",
		content:
			"Minimize bundle size by code splitting. Use lazy loading for components and images to improve initial page load time.",
		date: "2026-01-19T10:00:00Z",
	},
	{
		id: "9",
		title: "Testing Strategies",
		content:
			"Write unit tests for business logic and integration tests for user flows. Aim for good coverage without over-testing trivial code.",
		date: "2026-01-13T10:00:00Z",
	},
	{
		id: "10",
		title: "DevOps Essentials",
		content:
			"Containerize applications with Docker for consistency across environments. Use CI/CD pipelines to automate testing and deployment.",
		date: "2026-01-22T10:00:00Z",
	},
];
