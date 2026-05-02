import { describe, expect, test } from 'vitest';
import { buildCanonicalUrl, normalizeBasePath, withBasePath } from './site';

describe('site helpers', () => {
  test('normalizeBasePath removes trailing slash and preserves a leading slash', () => {
    expect(normalizeBasePath('/blog/')).toBe('/blog');
    expect(normalizeBasePath('blog/')).toBe('/blog');
    expect(normalizeBasePath('/')).toBe('');
    expect(normalizeBasePath('')).toBe('');
  });

  test('withBasePath joins the configured base path and route path', () => {
    expect(withBasePath('/blog', '/posts/hello')).toBe('/blog/posts/hello');
    expect(withBasePath('', '/posts/hello')).toBe('/posts/hello');
    expect(withBasePath('/blog/', '/')).toBe('/blog/');
  });

  test('buildCanonicalUrl joins site, base path, and route path correctly', () => {
    expect(buildCanonicalUrl('https://me.example', '/posts/hello')).toBe(
      'https://me.example/posts/hello',
    );
    expect(buildCanonicalUrl('https://me.example/', '/posts/hello', '/blog')).toBe(
      'https://me.example/blog/posts/hello',
    );
  });
});
