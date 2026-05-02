type PostIdentity =
  | {
      id: string;
    }
  | {
      slug: string;
    };

type PostLike = PostIdentity & {
  data: {
    title: string;
    date: Date;
    category: string;
    tags: readonly string[];
    draft?: boolean;
    featured?: boolean;
  };
};

type CountItem = {
  name: string;
  count: number;
  slug: string;
};

function isPublishedPost<T extends PostLike>(post: T) {
  return post.data.draft !== true;
}

function slugify(value: string) {
  return value
    .normalize('NFKC')
    .toLocaleLowerCase('en-US')
    .replace(/[^\p{Letter}\p{Number}]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

function compareNames(left: string, right: string) {
  const leftAscii = /^[\x00-\x7F]+$/.test(left);
  const rightAscii = /^[\x00-\x7F]+$/.test(right);

  if (leftAscii && rightAscii) {
    return left.localeCompare(right, 'en', { sensitivity: 'base' });
  }

  if (leftAscii !== rightAscii) {
    return leftAscii ? -1 : 1;
  }

  return left.localeCompare(right, 'zh-CN');
}

function collectCountItems(values: Iterable<string>, useNameAsSlug = false) {
  const counts = new Map<string, number>();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  const items = [...counts.entries()]
    .map(([name, count]) => ({
      name,
      count,
      slug: useNameAsSlug ? name : slugify(name),
    }))
    .sort((left, right) => compareNames(left.name, right.name));

  const slugCounts = new Map<string, number>();

  return items.map(
    (item): CountItem => {
      const collisionCount = (slugCounts.get(item.slug) ?? 0) + 1;
      slugCounts.set(item.slug, collisionCount);

      return {
        ...item,
        slug: collisionCount === 1 ? item.slug : `${item.slug}-${collisionCount}`,
      };
    },
  );
}

export function sortPostsByDateDesc<T extends PostLike>(posts: readonly T[]) {
  return posts
    .filter(isPublishedPost)
    .sort((left, right) => right.data.date.getTime() - left.data.date.getTime());
}

export function getFeaturedPosts<T extends PostLike>(posts: readonly T[]) {
  return posts.filter((post) => isPublishedPost(post) && post.data.featured);
}

export function collectCategories<T extends PostLike>(posts: readonly T[]) {
  return collectCountItems(posts.filter(isPublishedPost).map((post) => post.data.category));
}

export function collectTags<T extends PostLike>(posts: readonly T[]) {
  return collectCountItems(posts.filter(isPublishedPost).flatMap((post) => post.data.tags));
}

export function findCategoryBySlug<T extends PostLike>(posts: readonly T[], categorySlug: string) {
  return collectCategories(posts).find((category) => category.slug === categorySlug);
}

export function findTagBySlug<T extends PostLike>(posts: readonly T[], tagSlug: string) {
  return collectTags(posts).find((tag) => tag.slug === tagSlug);
}

export function findPostsByCategorySlug<T extends PostLike>(posts: readonly T[], categorySlug: string) {
  const category = findCategoryBySlug(posts, categorySlug);

  if (!category) {
    return [];
  }

  return sortPostsByDateDesc(
    posts.filter((post) => isPublishedPost(post) && post.data.category === category.name),
  );
}

export function findPostsByTagSlug<T extends PostLike>(posts: readonly T[], tagSlug: string) {
  const tag = findTagBySlug(posts, tagSlug);

  if (!tag) {
    return [];
  }

  return sortPostsByDateDesc(
    posts.filter((post) => isPublishedPost(post) && post.data.tags.includes(tag.name)),
  );
}

export function groupPostsByYear<T extends PostLike>(posts: readonly T[]) {
  const groups = new Map<string, T[]>();

  for (const post of sortPostsByDateDesc(posts)) {
    const year = String(post.data.date.getFullYear());
    const currentGroup = groups.get(year) ?? [];
    currentGroup.push(post);
    groups.set(year, currentGroup);
  }

  return [...groups.entries()].map(([year, groupedPosts]) => ({
    year,
    posts: groupedPosts,
  }));
}

export function findAdjacentPosts<T extends PostLike>(posts: readonly T[], slugOrId: string) {
  const orderedPosts = sortPostsByDateDesc(posts);
  const currentIndex = orderedPosts.findIndex(
    (post) => ('slug' in post ? post.slug : post.id) === slugOrId,
  );

  if (currentIndex === -1) {
    return {
      previous: undefined,
      next: undefined,
    };
  }

  return {
    previous: orderedPosts[currentIndex - 1],
    next: orderedPosts[currentIndex + 1],
  };
}
