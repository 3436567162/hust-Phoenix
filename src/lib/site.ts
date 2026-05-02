function ensureLeadingSlash(value: string) {
  return value.startsWith('/') ? value : `/${value}`;
}

function trimTrailingSlashes(value: string) {
  return value.replace(/\/+$/u, '');
}

export function normalizeBasePath(basePath: string) {
  if (!basePath || basePath === '/') {
    return '';
  }

  return trimTrailingSlashes(ensureLeadingSlash(basePath.trim()));
}

export function withBasePath(basePath: string, pathname: string) {
  const normalizedBasePath = normalizeBasePath(basePath);
  const normalizedPathname =
    pathname === '/' ? '/' : trimTrailingSlashes(ensureLeadingSlash(pathname.trim()));

  if (!normalizedBasePath) {
    return normalizedPathname || '/';
  }

  if (normalizedPathname === '/') {
    return `${normalizedBasePath}/`;
  }

  return `${normalizedBasePath}${normalizedPathname}`;
}

export function buildCanonicalUrl(site: string, pathname: string, basePath = '') {
  return new URL(withBasePath(basePath, pathname), site).toString();
}
