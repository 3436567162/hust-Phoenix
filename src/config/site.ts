export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  title: 'Hk 技术博客',
  description: '记录前端、工程化、项目实践与学习总结的中文技术博客。',
  siteUrl: 'https://example.com',
  basePath: '',
  nav: [
    { href: '/', label: '首页' },
    { href: '/blog', label: '博客' },
    { href: '/projects', label: '项目' },
    { href: '/archive', label: '归档' },
    { href: '/about', label: '关于' },
  ] satisfies NavItem[],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/example' },
    { label: 'Email', href: 'mailto:hello@example.com' },
    { label: 'RSS', href: '/rss.xml' },
  ] satisfies SocialLink[],
};
