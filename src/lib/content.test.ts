import { describe, expect, test } from 'vitest';
import {
  collectCategories,
  collectTags,
  getFeaturedPosts,
  groupPostsByYear,
  sortPostsByDateDesc,
} from './content';
import { formatPostDate } from './date';

const publishedPosts = [
  {
    slug: 'build-my-first-astro-blog',
    data: {
      title: '用 Astro 搭建我的个人博客',
      date: new Date('2026-04-28'),
      category: '学习总结',
      tags: ['Astro', '部署'],
      featured: true,
      draft: false,
    },
  },
  {
    slug: 'from-course-project-to-frontend-engineering',
    data: {
      title: '从课程作业到前端工程实践',
      date: new Date('2025-11-15'),
      category: '项目复盘',
      tags: ['React', '工程化'],
      featured: true,
      draft: false,
    },
  },
  {
    slug: 'troubleshooting-vite-build-on-windows',
    data: {
      title: '一次 Vite Windows 构建问题排查',
      date: new Date('2026-05-01'),
      category: '问题排查',
      tags: ['Vite', 'Windows', '构建'],
      featured: false,
      draft: false,
    },
  },
] as const;

const draftPost = {
  slug: 'draft-performance-notes',
  data: {
    title: '性能优化草稿',
    date: new Date('2026-05-02'),
    category: '性能 优化!',
    tags: ['Node.js', '学习总结'],
    featured: true,
    draft: true,
  },
} as const;

const posts = [...publishedPosts, draftPost] as const;

describe('content helpers', () => {
  test('sortPostsByDateDesc returns latest published posts first', () => {
    const sorted = sortPostsByDateDesc(posts);

    expect(sorted.map((post) => post.slug)).toEqual([
      'troubleshooting-vite-build-on-windows',
      'build-my-first-astro-blog',
      'from-course-project-to-frontend-engineering',
    ]);
  });

  test('getFeaturedPosts keeps only featured published posts', () => {
    const featured = getFeaturedPosts(posts);

    expect(featured.map((post) => post.slug)).toEqual([
      'build-my-first-astro-blog',
      'from-course-project-to-frontend-engineering',
    ]);
  });

  test('collectCategories returns unique published category counts with normalized slugs', () => {
    const categories = collectCategories(posts);

    expect(categories).toHaveLength(3);
    expect(categories).toEqual(
      expect.arrayContaining([
        { name: '问题排查', count: 1, slug: '问题排查' },
        { name: '学习总结', count: 1, slug: '学习总结' },
        { name: '项目复盘', count: 1, slug: '项目复盘' },
      ]),
    );
  });

  test('collectTags returns unique published tag counts with route-safe slugs', () => {
    const tags = collectTags(posts);

    expect(tags).toHaveLength(7);
    expect(tags).toEqual(
      expect.arrayContaining([
        { name: 'Astro', count: 1, slug: 'astro' },
        { name: 'Vite', count: 1, slug: 'vite' },
        { name: 'Windows', count: 1, slug: 'windows' },
        { name: 'React', count: 1, slug: 'react' },
        { name: '部署', count: 1, slug: '部署' },
        { name: '工程化', count: 1, slug: '工程化' },
        { name: '构建', count: 1, slug: '构建' },
      ]),
    );
  });

  test('groupPostsByYear groups only published posts under year headings', () => {
    expect(groupPostsByYear(posts)).toEqual([
      {
        year: '2026',
        posts: [publishedPosts[2], publishedPosts[0]],
      },
      {
        year: '2025',
        posts: [publishedPosts[1]],
      },
    ]);
  });

  test('normalizes mixed taxonomy labels into route-safe slugs', () => {
    expect(collectTags([{ ...publishedPosts[0], data: { ...publishedPosts[0].data, tags: ['Node.js', '性能 优化!', '学习总结'] } }])).toEqual(
      expect.arrayContaining([
        { name: 'Node.js', count: 1, slug: 'node-js' },
        { name: '性能 优化!', count: 1, slug: '性能-优化' },
        { name: '学习总结', count: 1, slug: '学习总结' },
      ]),
    );
  });
});

describe('date helpers', () => {
  test('formatPostDate formats a Chinese calendar date', () => {
    expect(formatPostDate(new Date('2026-05-01'))).toBe('2026年5月1日');
  });
});
