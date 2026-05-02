# Astro Blog V1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and prepare deployment for a Chinese, content-first Astro personal blog with posts, categories, tags, archives, projects, and an about page.

**Architecture:** Use Astro static generation with content collections for posts and projects, a small TypeScript helper layer for sorting/filtering/grouping content, and shared Astro layouts/components for all page shells. Keep content in Markdown and data collections so the author can publish without modifying page code.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS, Astro content collections, Vitest, @astrojs/sitemap, GitHub Pages workflow

---

## File Structure

### Root

- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`
- Create: `README.md`
- Create: `.github/workflows/deploy.yml`

### Content

- Create: `src/content.config.ts`
- Create: `src/content/posts/build-my-first-astro-blog.md`
- Create: `src/content/posts/from-course-project-to-frontend-engineering.md`
- Create: `src/content/posts/troubleshooting-vite-build-on-windows.md`
- Create: `src/content/projects/personal-blog-v1.md`
- Create: `src/content/projects/course-system-dashboard.md`
- Create: `src/content/projects/algorithm-visualizer.md`

### Shared Code

- Create: `src/config/site.ts`
- Create: `src/lib/content.ts`
- Create: `src/lib/date.ts`
- Create: `src/lib/site.ts`
- Create: `src/lib/content.test.ts`
- Create: `src/lib/site.test.ts`

### Styles And Layout

- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/PostLayout.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/components/HeroIntro.astro`
- Create: `src/components/PostCard.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/TagChip.astro`
- Create: `src/components/CategoryCard.astro`
- Create: `src/components/ArchiveList.astro`
- Create: `src/components/EmptyState.astro`

### Pages

- Create: `src/pages/index.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/projects.astro`
- Create: `src/pages/archive/index.astro`
- Create: `src/pages/categories/index.astro`
- Create: `src/pages/categories/[category].astro`
- Create: `src/pages/tags/index.astro`
- Create: `src/pages/tags/[tag].astro`
- Create: `src/pages/posts/[...slug].astro`
- Create: `src/pages/404.astro`

### Static Assets

- Create: `public/favicon.svg`
- Create: `public/og-cover.svg`

## Task 1: Bootstrap The Astro Project

**Files:**
- Create: `package.json`
- Create: `astro.config.mjs`
- Create: `tsconfig.json`
- Create: `.gitignore`

- [ ] **Step 1: Initialize git and scaffold the Astro app**

Run:

```powershell
git init
npm create astro@latest . -- --template basics --install --git false --typescript strict
```

Expected:

- A new Astro project is created in the current folder.
- `src/pages/index.astro` exists and will be replaced in later tasks.
- `package-lock.json` is generated.

- [ ] **Step 2: Add the integrations and test tooling**

Run:

```powershell
npx astro add tailwind
npx astro add sitemap
npm install -D vitest
```

Expected:

- Tailwind config support is added by Astro.
- `@astrojs/sitemap` is installed.
- `vitest` is added to `devDependencies`.

- [ ] **Step 3: Normalize the root configuration files**

Replace `package.json` scripts and project metadata with:

```json
{
  "name": "astro-chinese-blog",
  "type": "module",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "test": "vitest run"
  }
}
```

Replace `astro.config.mjs` with:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://example.github.io',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwind()],
  },
});
```

Replace `.gitignore` with:

```gitignore
node_modules
dist
.astro
.DS_Store
coverage
```

- [ ] **Step 4: Verify the scaffold before feature work**

Run:

```powershell
npm run check
npm run build
```

Expected:

- `astro check` exits successfully.
- `astro build` creates the `dist` folder without route errors.

- [ ] **Step 5: Commit the bootstrap**

Run:

```powershell
git add .
git commit -m "chore: bootstrap Astro blog project"
```

## Task 2: Define Content Collections And Core Content Helpers

**Files:**
- Create: `src/content.config.ts`
- Create: `src/content/posts/build-my-first-astro-blog.md`
- Create: `src/content/posts/from-course-project-to-frontend-engineering.md`
- Create: `src/content/posts/troubleshooting-vite-build-on-windows.md`
- Create: `src/content/projects/personal-blog-v1.md`
- Create: `src/content/projects/course-system-dashboard.md`
- Create: `src/content/projects/algorithm-visualizer.md`
- Create: `src/lib/content.ts`
- Create: `src/lib/date.ts`
- Test: `src/lib/content.test.ts`

- [ ] **Step 1: Write the failing content helper tests**

Create `src/lib/content.test.ts` with:

```ts
import { describe, expect, test } from 'vitest';
import {
  collectCategories,
  collectTags,
  getFeaturedPosts,
  groupPostsByYear,
  sortPostsByDateDesc,
} from './content';

const posts = [
  {
    slug: 'build-my-first-astro-blog',
    data: {
      title: '用 Astro 搭建我的个人博客',
      date: new Date('2026-04-28'),
      category: '学习总结',
      tags: ['Astro', '部署'],
      featured: true,
    },
  },
  {
    slug: 'troubleshooting-vite-build-on-windows',
    data: {
      title: '一次 Vite 构建问题排查',
      date: new Date('2026-05-01'),
      category: '问题排查',
      tags: ['Vite', 'Windows'],
      featured: false,
    },
  },
];

describe('content helpers', () => {
  test('sortPostsByDateDesc returns latest posts first', () => {
    const sorted = sortPostsByDateDesc(posts);
    expect(sorted[0].slug).toBe('troubleshooting-vite-build-on-windows');
  });

  test('getFeaturedPosts keeps only featured posts', () => {
    const featured = getFeaturedPosts(posts);
    expect(featured).toHaveLength(1);
    expect(featured[0].slug).toBe('build-my-first-astro-blog');
  });

  test('collectCategories returns unique category counts', () => {
    expect(collectCategories(posts)).toEqual([
      { name: '学习总结', count: 1, slug: '学习总结' },
      { name: '问题排查', count: 1, slug: '问题排查' },
    ]);
  });

  test('collectTags returns unique tag counts', () => {
    expect(collectTags(posts)).toEqual([
      { name: 'Astro', count: 1, slug: 'astro' },
      { name: 'Vite', count: 1, slug: 'vite' },
      { name: 'Windows', count: 1, slug: 'windows' },
      { name: '部署', count: 1, slug: '部署' },
    ]);
  });

  test('groupPostsByYear groups posts under year headings', () => {
    expect(groupPostsByYear(posts)).toEqual([
      { year: '2026', posts: expect.any(Array) },
    ]);
  });
});
```

- [ ] **Step 2: Run the tests to verify the RED state**

Run:

```powershell
npm run test -- src/lib/content.test.ts
```

Expected:

- FAIL with a module resolution or export error for `./content`.

- [ ] **Step 3: Implement the content schemas, helpers, and seed content**

Create `src/content.config.ts`:

```ts
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    category: z.enum(['学习总结', '项目复盘', '问题排查', '技术随笔']),
    tags: z.array(z.string()).min(2).max(5),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    techStack: z.array(z.string()).min(1),
    repoUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

export const collections = { posts, projects };
```

Create `src/lib/date.ts`:

```ts
export function formatPostDate(date: Date) {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}
```

Create `src/lib/content.ts`:

```ts
type PostEntry = {
  slug: string;
  data: {
    title: string;
    date: Date;
    category: string;
    tags: string[];
    featured?: boolean;
  };
};

function slugify(value: string) {
  return /^[a-z0-9-]+$/i.test(value) ? value.toLowerCase() : value;
}

export function sortPostsByDateDesc<T extends PostEntry>(posts: T[]) {
  return [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function getFeaturedPosts<T extends PostEntry>(posts: T[]) {
  return posts.filter((post) => post.data.featured);
}

export function collectCategories<T extends PostEntry>(posts: T[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.data.category, (counts.get(post.data.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, slug: name }))
    .sort((a, b) => a.name.localeCompare(b.name, 'zh-CN'));
}

export function collectTags<T extends PostEntry>(posts: T[]) {
  const counts = new Map<string, number>();
  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([name, count]) => ({ name, count, slug: slugify(name) }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

export function groupPostsByYear<T extends PostEntry>(posts: T[]) {
  const groups = new Map<string, T[]>();
  for (const post of sortPostsByDateDesc(posts)) {
    const year = String(post.data.date.getFullYear());
    groups.set(year, [...(groups.get(year) ?? []), post]);
  }
  return [...groups.entries()].map(([year, posts]) => ({ year, posts }));
}
```

Create one post file, `src/content/posts/build-my-first-astro-blog.md`:

```md
---
title: 用 Astro 搭建我的个人博客
description: 记录我从零开始设计和搭建个人技术博客的思路与步骤。
date: 2026-04-28
category: 学习总结
tags:
  - Astro
  - TypeScript
  - 部署
featured: true
draft: false
---

这是我的第一篇博客文章。
```

Create one project file, `src/content/projects/personal-blog-v1.md`:

```md
---
title: 个人博客 1.0
summary: 基于 Astro 搭建的内容优先型个人博客。
techStack:
  - Astro
  - TypeScript
  - Tailwind CSS
repoUrl: https://github.com/example/astro-blog
featured: true
order: 1
---
```

Mirror the same frontmatter shape for the remaining seeded posts and projects.

- [ ] **Step 4: Run tests and Astro checks**

Run:

```powershell
npm run test -- src/lib/content.test.ts
npm run check
```

Expected:

- All Vitest assertions pass.
- Astro type-checking succeeds with the content schemas.

- [ ] **Step 5: Commit the content model**

Run:

```powershell
git add src/content.config.ts src/content src/lib/content.ts src/lib/date.ts src/lib/content.test.ts
git commit -m "feat: add content collections and content helpers"
```

## Task 3: Build The Shared Site Configuration, Layouts, And Design System

**Files:**
- Create: `src/config/site.ts`
- Create: `src/lib/site.ts`
- Test: `src/lib/site.test.ts`
- Create: `src/styles/global.css`
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/layouts/PostLayout.astro`
- Create: `src/components/SiteHeader.astro`
- Create: `src/components/SiteFooter.astro`
- Create: `src/components/HeroIntro.astro`
- Create: `src/components/PostCard.astro`
- Create: `src/components/ProjectCard.astro`
- Create: `src/components/TagChip.astro`
- Create: `src/components/CategoryCard.astro`
- Create: `src/components/EmptyState.astro`

- [ ] **Step 1: Write the failing site helper tests**

Create `src/lib/site.test.ts` with:

```ts
import { describe, expect, test } from 'vitest';
import { buildCanonicalUrl, normalizeBasePath } from './site';

describe('site helpers', () => {
  test('normalizeBasePath removes trailing slash and preserves leading slash', () => {
    expect(normalizeBasePath('/blog/')).toBe('/blog');
    expect(normalizeBasePath('')).toBe('');
  });

  test('buildCanonicalUrl joins site and path correctly', () => {
    expect(buildCanonicalUrl('https://me.example', '/posts/hello')).toBe(
      'https://me.example/posts/hello',
    );
  });
});
```

- [ ] **Step 2: Run the tests to verify the RED state**

Run:

```powershell
npm run test -- src/lib/site.test.ts
```

Expected:

- FAIL because `./site` does not exist yet.

- [ ] **Step 3: Implement the site config, helpers, layout shell, and shared components**

Create `src/config/site.ts`:

```ts
export const siteConfig = {
  title: 'HK 技术博客',
  description: '记录前端、工程化、项目实践与学习总结。',
  siteUrl: 'https://example.github.io',
  nav: [
    { href: '/', label: '首页' },
    { href: '/blog', label: '博客' },
    { href: '/projects', label: '项目' },
    { href: '/archive', label: '归档' },
    { href: '/about', label: '关于' },
  ],
  social: {
    github: 'https://github.com/example',
    email: 'mailto:hello@example.com',
  },
};
```

Create `src/lib/site.ts`:

```ts
export function normalizeBasePath(basePath: string) {
  if (!basePath) return '';
  return basePath.endsWith('/') ? basePath.slice(0, -1) : basePath;
}

export function buildCanonicalUrl(site: string, path: string) {
  return new URL(path, site).toString();
}
```

Create `src/layouts/BaseLayout.astro`:

```astro
---
import '../styles/global.css';
import { siteConfig } from '../config/site';
import SiteHeader from '../components/SiteHeader.astro';
import SiteFooter from '../components/SiteFooter.astro';

interface Props {
  title: string;
  description?: string;
}

const { title, description = siteConfig.description } = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{title} | {siteConfig.title}</title>
    <meta name="description" content={description} />
  </head>
  <body>
    <div class="site-shell">
      <SiteHeader />
      <main class="site-main">
        <slot />
      </main>
      <SiteFooter />
    </div>
  </body>
</html>
```

Create `src/layouts/PostLayout.astro`:

```astro
---
import BaseLayout from './BaseLayout.astro';
import type { CollectionEntry } from 'astro:content';
import { formatPostDate } from '../lib/date';

interface Props {
  post: CollectionEntry<'posts'>;
  headings: { depth: number; slug: string; text: string }[];
}

const { post, headings } = Astro.props;
---

<BaseLayout title={post.data.title} description={post.data.description}>
  <article class="post-shell">
    <header class="post-hero">
      <p>{post.data.category}</p>
      <h1>{post.data.title}</h1>
      <p>{formatPostDate(post.data.date)}</p>
    </header>
    <aside class="post-toc">
      <ul>
        {headings.map((heading) => (
          <li><a href={`#${heading.slug}`}>{heading.text}</a></li>
        ))}
      </ul>
    </aside>
    <div class="post-body">
      <slot />
    </div>
  </article>
</BaseLayout>
```

Create `src/styles/global.css` with a content-first editorial theme:

```css
@import "tailwindcss";

:root {
  --bg: #f6f1e8;
  --surface: rgba(255, 251, 245, 0.84);
  --line: rgba(37, 45, 54, 0.12);
  --text: #1f2933;
  --muted: #5e6b77;
  --accent: #0f766e;
  --accent-soft: #d9f3ef;
  --max-width: 74rem;
}

html {
  background:
    radial-gradient(circle at top left, rgba(15, 118, 110, 0.08), transparent 28rem),
    linear-gradient(180deg, #fcfaf6 0%, #f6f1e8 100%);
  color: var(--text);
}

body {
  font-family: "Noto Sans SC", "Source Han Sans SC", "PingFang SC", sans-serif;
  margin: 0;
}

h1, h2, h3, .display-font {
  font-family: "Noto Serif SC", "Source Han Serif SC", "Songti SC", serif;
}
```

Implement the component shells with small, focused interfaces:

- `SiteHeader.astro`: renders navigation from `siteConfig.nav`
- `SiteFooter.astro`: renders site title and social links
- `HeroIntro.astro`: renders the home hero copy
- `PostCard.astro`: receives a `CollectionEntry<'posts'>`
- `ProjectCard.astro`: receives a `CollectionEntry<'projects'>`
- `TagChip.astro`: renders a tag link
- `CategoryCard.astro`: renders a category summary card
- `EmptyState.astro`: renders a simple no-content message

- [ ] **Step 4: Re-run tests and verify the layout compiles**

Run:

```powershell
npm run test -- src/lib/site.test.ts src/lib/content.test.ts
npm run build
```

Expected:

- Both Vitest files pass.
- Astro build succeeds with the shared layout files present.

- [ ] **Step 5: Commit the design system**

Run:

```powershell
git add src/config/site.ts src/lib/site.ts src/lib/site.test.ts src/styles/global.css src/layouts src/components
git commit -m "feat: add shared layouts and design system"
```

## Task 4: Implement The Home, Blog, Projects, About, And 404 Pages

**Files:**
- Create: `src/pages/index.astro`
- Create: `src/pages/blog/index.astro`
- Create: `src/pages/projects.astro`
- Create: `src/pages/about.astro`
- Create: `src/pages/404.astro`
- Modify: `src/lib/content.ts`

- [ ] **Step 1: Extend the content tests for listing behavior**

Append to `src/lib/content.test.ts`:

```ts
import { paginateItems } from './content';

test('paginateItems returns the requested page slice', () => {
  const numbers = [1, 2, 3, 4, 5];
  expect(paginateItems(numbers, 1, 2)).toEqual({
    page: 1,
    pageSize: 2,
    totalPages: 3,
    items: [1, 2],
  });
});
```

- [ ] **Step 2: Run the tests to verify the RED state**

Run:

```powershell
npm run test -- src/lib/content.test.ts
```

Expected:

- FAIL because `paginateItems` does not exist.

- [ ] **Step 3: Implement the listing helper and core static pages**

Append to `src/lib/content.ts`:

```ts
export function paginateItems<T>(items: T[], page: number, pageSize: number) {
  const totalPages = Math.ceil(items.length / pageSize);
  const start = (page - 1) * pageSize;
  return {
    page,
    pageSize,
    totalPages,
    items: items.slice(start, start + pageSize),
  };
}
```

Create `src/pages/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../layouts/BaseLayout.astro';
import HeroIntro from '../components/HeroIntro.astro';
import PostCard from '../components/PostCard.astro';
import ProjectCard from '../components/ProjectCard.astro';
import CategoryCard from '../components/CategoryCard.astro';
import { collectCategories, getFeaturedPosts, sortPostsByDateDesc } from '../lib/content';

const posts = sortPostsByDateDesc(await getCollection('posts', ({ data }) => !data.draft));
const projects = await getCollection('projects');
const latestPosts = posts.slice(0, 4);
const featuredProjects = projects.filter((project) => project.data.featured).slice(0, 3);
const categories = collectCategories(posts);
---

<BaseLayout title="首页">
  <HeroIntro />
  <section>
    <h2>最新文章</h2>
    <div>{latestPosts.map((post) => <PostCard post={post} />)}</div>
  </section>
  <section>
    <h2>内容分类</h2>
    <div>{categories.map((category) => <CategoryCard category={category} />)}</div>
  </section>
  <section>
    <h2>代表项目</h2>
    <div>{featuredProjects.map((project) => <ProjectCard project={project} />)}</div>
  </section>
</BaseLayout>
```

Create `src/pages/blog/index.astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../layouts/BaseLayout.astro';
import PostCard from '../../components/PostCard.astro';
import { sortPostsByDateDesc } from '../../lib/content';

const posts = sortPostsByDateDesc(await getCollection('posts', ({ data }) => !data.draft));
---

<BaseLayout title="博客" description="学习总结、项目复盘和问题排查。">
  <section>
    <h1>博客</h1>
    <p>这里记录学习总结、项目复盘和技术问题排查。</p>
    <div>{posts.map((post) => <PostCard post={post} />)}</div>
  </section>
</BaseLayout>
```

Create `src/pages/projects.astro`, `src/pages/about.astro`, and `src/pages/404.astro` with the same `BaseLayout` shell and Chinese copy matching the approved spec.

- [ ] **Step 4: Re-run tests and verify the generated pages**

Run:

```powershell
npm run test -- src/lib/content.test.ts src/lib/site.test.ts
npm run build
```

Expected:

- Tests pass.
- Build output contains `/index.html`, `/blog/index.html`, `/projects/index.html`, `/about/index.html`, and `/404.html`.

- [ ] **Step 5: Commit the core pages**

Run:

```powershell
git add src/pages src/lib/content.ts src/lib/content.test.ts
git commit -m "feat: add home blog projects and about pages"
```

## Task 5: Implement Article, Category, Tag, And Archive Routes

**Files:**
- Create: `src/pages/posts/[...slug].astro`
- Create: `src/pages/categories/index.astro`
- Create: `src/pages/categories/[category].astro`
- Create: `src/pages/tags/index.astro`
- Create: `src/pages/tags/[tag].astro`
- Create: `src/pages/archive/index.astro`
- Create: `src/components/ArchiveList.astro`
- Modify: `src/lib/content.ts`
- Test: `src/lib/content.test.ts`

- [ ] **Step 1: Write the failing tests for route helper behavior**

Append to `src/lib/content.test.ts`:

```ts
import { filterPostsByCategory, filterPostsByTag, getAdjacentPosts } from './content';

test('filterPostsByCategory keeps matching category posts', () => {
  expect(filterPostsByCategory(posts, '学习总结')).toHaveLength(1);
});

test('filterPostsByTag matches tags by exact name', () => {
  expect(filterPostsByTag(posts, 'Astro')).toHaveLength(1);
});

test('getAdjacentPosts returns previous and next posts in sorted order', () => {
  const sorted = sortPostsByDateDesc(posts);
  expect(getAdjacentPosts(sorted, sorted[0].slug)).toEqual({
    previous: undefined,
    next: sorted[1],
  });
});
```

- [ ] **Step 2: Run the tests to verify the RED state**

Run:

```powershell
npm run test -- src/lib/content.test.ts
```

Expected:

- FAIL because the new helper exports do not exist yet.

- [ ] **Step 3: Implement the content navigation helpers and dynamic routes**

Append to `src/lib/content.ts`:

```ts
export function filterPostsByCategory<T extends PostEntry>(posts: T[], category: string) {
  return posts.filter((post) => post.data.category === category);
}

export function filterPostsByTag<T extends PostEntry>(posts: T[], tag: string) {
  return posts.filter((post) => post.data.tags.includes(tag));
}

export function getAdjacentPosts<T extends PostEntry>(posts: T[], slug: string) {
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  return {
    previous: currentIndex > 0 ? posts[currentIndex - 1] : undefined,
    next: currentIndex >= 0 && currentIndex < posts.length - 1 ? posts[currentIndex + 1] : undefined,
  };
}
```

Create `src/pages/posts/[...slug].astro`:

```astro
---
import { getCollection, render } from 'astro:content';
import PostLayout from '../../layouts/PostLayout.astro';
import { getAdjacentPosts, sortPostsByDateDesc } from '../../lib/content';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content, headings } = await render(post);
const allPosts = sortPostsByDateDesc(await getCollection('posts', ({ data }) => !data.draft));
const adjacent = getAdjacentPosts(allPosts, post.slug);
---

<PostLayout post={post} headings={headings}>
  <Content />
  <nav>
    {adjacent.previous && <a href={`/posts/${adjacent.previous.slug}`}>上一篇</a>}
    {adjacent.next && <a href={`/posts/${adjacent.next.slug}`}>下一篇</a>}
  </nav>
</PostLayout>
```

Create `src/pages/categories/index.astro` and `src/pages/tags/index.astro` to list all categories and tags using the helper functions.

Create `src/pages/categories/[category].astro`:

```astro
---
import { getCollection } from 'astro:content';
import BaseLayout from '../../../layouts/BaseLayout.astro';
import PostCard from '../../../components/PostCard.astro';
import { collectCategories, filterPostsByCategory, sortPostsByDateDesc } from '../../../lib/content';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return collectCategories(posts).map((category) => ({
    params: { category: category.slug },
    props: { categoryName: category.name },
  }));
}

const { categoryName } = Astro.props;
const posts = sortPostsByDateDesc(await getCollection('posts', ({ data }) => !data.draft));
const matches = filterPostsByCategory(posts, categoryName);
---

<BaseLayout title={`${categoryName} 分类`}>
  <h1>{categoryName}</h1>
  <div>{matches.map((post) => <PostCard post={post} />)}</div>
</BaseLayout>
```

Create `src/pages/tags/[tag].astro` with the same pattern, but map `params.tag` to the tag slug and filter using the original tag name.

Create `src/pages/archive/index.astro` plus `src/components/ArchiveList.astro` to render `groupPostsByYear(posts)` in descending year order.

- [ ] **Step 4: Re-run tests and verify the route build**

Run:

```powershell
npm run test -- src/lib/content.test.ts src/lib/site.test.ts
npm run build
```

Expected:

- All helper tests pass.
- The build succeeds for article, category, tag, and archive routes.

- [ ] **Step 5: Commit the content routes**

Run:

```powershell
git add src/pages/posts src/pages/categories src/pages/tags src/pages/archive src/components/ArchiveList.astro src/lib/content.ts src/lib/content.test.ts
git commit -m "feat: add post category tag and archive routes"
```

## Task 6: Add SEO Assets, Deployment Workflow, And Author Handoff

**Files:**
- Modify: `astro.config.mjs`
- Create: `.github/workflows/deploy.yml`
- Create: `public/favicon.svg`
- Create: `public/og-cover.svg`
- Create: `README.md`

- [ ] **Step 1: Update the Astro config for final SEO and deployment behavior**

Replace `astro.config.mjs` with:

```js
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL ?? 'https://example.github.io';

export default defineConfig({
  site,
  integrations: [sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwind()],
  },
});
```

- [ ] **Step 2: Add the GitHub Pages workflow**

Create `.github/workflows/deploy.yml`:

```yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Install, build, and upload site
        uses: withastro/action@v6
        with:
          node-version: 24
        env:
          SITE_URL: https://<github-username>.github.io/<repo-name>

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v5
```

- [ ] **Step 3: Add author-facing setup notes and branded static assets**

Create `README.md` with:

```md
# HK 技术博客

## 本地开发

```bash
npm install
npm run dev
```

## 构建检查

```bash
npm run test
npm run check
npm run build
```

## 发布文章

1. 在 `src/content/posts/` 下新建 Markdown 文件
2. 按照 frontmatter 填写标题、摘要、日期、分类和标签
3. 运行 `npm run build` 确认无报错

## GitHub Pages 部署

1. 把仓库推到 GitHub
2. 在仓库设置中把 Pages Source 设为 `GitHub Actions`
3. 修改工作流里的 `SITE_URL`
4. 推送到 `main` 分支触发部署
```

Create `public/favicon.svg` and `public/og-cover.svg` as simple SVG assets using the blog initials and the same green-ink palette as `global.css`.

- [ ] **Step 4: Run the full verification suite**

Run:

```powershell
npm run test
npm run check
npm run build
```

Expected:

- All tests pass.
- Astro check passes.
- The production build succeeds and emits sitemap files into `dist`.

- [ ] **Step 5: Commit the deployment setup**

Run:

```powershell
git add astro.config.mjs .github/workflows/deploy.yml public README.md
git commit -m "feat: add deployment workflow and author docs"
```

## Spec Coverage Review

- Chinese content-first site: covered by Tasks 2, 3, 4, and 5.
- Home, blog, article, categories, tags, archive, projects, and about pages: covered by Tasks 4 and 5.
- Basic SEO and sitemap: covered by Task 6.
- Responsive shared layout and visual direction: covered by Task 3.
- Free-host deployment path: covered by Task 6.
- Durable content authoring model: covered by Task 2.

## Placeholder Scan

- No `TODO`, `TBD`, or "implement later" markers remain.
- All commands, files, and route paths are concrete.
- Every helper introduced in later tasks is defined in an earlier or same task.

## Type Consistency Review

- Posts use the `posts` content collection and projects use the `projects` content collection consistently.
- Category values match the approved Chinese category set.
- Helper names are consistent across tests and implementation: `sortPostsByDateDesc`, `collectCategories`, `collectTags`, `groupPostsByYear`, `paginateItems`, `filterPostsByCategory`, `filterPostsByTag`, `getAdjacentPosts`, `normalizeBasePath`, `buildCanonicalUrl`.
