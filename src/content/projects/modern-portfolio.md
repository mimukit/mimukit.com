---
name: 'Modern Portfolio'
description: 'Modern Portfolio is a personal website designed to effectively present my portfolio and technical projects. Developed with Astro.js and styled using Tailwind CSS, it delivers a high-performance, responsive user experience. The site features an elegant, minimalist design with intuitive navigation, emphasizing the clear presentation of my skills and accomplishments.'
tags: ['astro', 'tailwindcss', 'typescript', 'react']
image: '../../assets/projects/modern-portfolio.png'
link: 'https://mimukit.com'
startDate: '2025-11-04'
rank: 4
---

# Personal Portfolio & Blog

![Astro](https://img.shields.io/badge/Astro-FF5D01?style=for-the-badge&logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

A sophisticated, high-performance personal portfolio and blog developed with Astro.js. Engineered to highlight projects and technical articles while delivering exceptional speed, accessibility, and industry-leading SEO.

## ✨ Features

- 🚀 **Exceptional Performance** – Leveraging Astro.js to ensure optimal loading speeds and efficiency.
- 📝 **Comprehensive Blogging Platform** – Supports technical articles with code syntax highlighting for clarity and readability.
- 🎨 **Elegant User Interface** – Features a modern, responsive design utilizing Tailwind CSS for a polished appearance across all devices.
- 🌙 **Dark Mode Compatibility** – Enables seamless switching between light and dark themes to enhance user experience.
- 📱 **Fully Responsive Layout** – Provides an optimal viewing experience on all devices, from mobile to desktop.
- 🔍 **Advanced SEO Optimization** – Incorporates structured data and meta tags for superior search engine discoverability.
- 🏷️ **Robust Tagging System** – Facilitates categorization of blog posts and projects with an integrated tagging mechanism.
- 📊 **Organized Content Management** – Employs Astro's content collections for systematic content organization.
- 🖼️ **Professional Project Showcase** – Highlights work using descriptive text, images, and technology tags for clear presentation.

## 🛠️ Tech Stack

- **[Astro.js](https://astro.build/)** – Industry-leading static site generator renowned for superior performance.
- **[React.js](https://reactjs.org/)** – Powers dynamic and interactive user interface components.
- **[Tailwind CSS](https://tailwindcss.com/)** – Utility-first CSS framework enabling rapid, responsive, and maintainable styling.
- **[TypeScript](https://www.typescriptlang.org/)** – Provides robust type safety and enhances overall developer productivity.
- **[MDX](https://mdxjs.com/)** – Seamlessly integrates JSX within Markdown, facilitating rich content creation.
- **[React](https://reactjs.org/)** – Utilized for modular, reusable UI elements.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v20 or higher)
- [pnpm](https://pnpm.io/) (package manager)
- [Git](https://git-scm.com/) (version control system)

## ⚙️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/mimukit/mimukit.com.git
cd mimukit.com
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Start the development server**

```bash
pnpm run dev
```

4. **Open your browser**
   Navigate to `http://localhost:3000` to see the site running locally.

## 📁 Project Structure

```
mimukit.com/
├── public/                 # Static assets
├── src/
│   ├── assets/             # Static assets
│   │   ├── projects/       # Project images
│   │   └── blog/           # Blog images
│   ├── components/         # UI components
│   ├── content/            # Content collections
│   │   ├── blog/           # Blog posts in MD/MDX format
│   │   └── projects/       # Project data
│   ├── layouts/            # Page layouts
│   ├── lib/                # Utility functions
│   ├── pages/              # Page routes
│   └── styles/             # Global styles
├── astro.config.mjs        # Astro configuration
├── tailwind.config.cjs     # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── package.json            # Project dependencies
```

## 🚀 Usage

### Creating a Blog Post

1. Create a new `.mdx` or `.md` file within the `src/content/blog` directory.
2. Populate the frontmatter section with the required fields: `title`, `description`, `date`, `tags`, and `authors`.
3. Compose your article using Markdown syntax, and incorporate MDX components as needed for enhanced functionality.

```mdx
---
title: 'Your Post Title'
description: 'A concise summary of your article'
date: 2025-04-20
tags: ['tag1', 'tag2', 'tag3']
authors: ['Your Name', 'Co-author (optional)']
---

# Your Post Title

Begin your article here using Markdown syntax. Clearly present your key ideas and provide thorough explanations where appropriate.

## Subheading

Elaborate on your topic with additional insights, technical details, or examples as needed.
```

### Adding a Project

To add a new project entry:

1. Create a new `.md` file within the `src/content/projects` directory.
2. Provide essential project details in the file’s frontmatter, including: `name`, `description`, `tags`, and the relative path to the project image.

## 🌙 Dark Mode

This project offers comprehensive dark mode support leveraging Tailwind CSS and React. User preferences are automatically detected and reflected, with an intuitive toggle provided for seamless switching between light and dark themes.

## 📊 Data Utilities

A suite of utility functions is provided in `data-utils.ts` to facilitate data management and retrieval:

- `getAllPosts()` – Retrieves all blog posts.
- `getRecentPosts(count)` – Returns the most recent posts, limited by the specified count.
- `getAdjacentPosts(currentId)` – Obtains the next and previous posts relative to the given post ID.
- `getAllTags()` – Compiles a list of all tags present across posts.
- `getSortedTags()` – Produces a list of tags, sorted by frequency of usage.
- `getPostsByAuthor(authorId)` – Retrieves all posts authored by the specified individual.

## 🤝 Contributing

Contributions to this project are highly appreciated. If you would like to contribute, please follow the steps below:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes with a descriptive message (`git commit -m 'Describe your feature or fix'`).
4. Push the branch to your fork (`git push origin feature/your-feature-name`).
5. Submit a Pull Request for review.

Thank you for supporting the project.

## 📄 License

This project is distributed under the MIT License. For comprehensive terms and conditions, please refer to the LICENSE file included with this repository.
