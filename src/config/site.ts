export type NavItem = {
  href: string;
  label: string;
};

export type SocialLink = {
  label: string;
  href: string;
};

export const siteConfig = {
  title: 'HK 技术博客',
  description: '记录前端、工程化、项目实践与学习总结的中文技术博客。',
  siteUrl: 'https://3436567162.github.io',
  basePath: '/hust-Phoenix',
  nav: [
    { href: '/', label: '首页' },
    { href: '/blog', label: '博客' },
    { href: '/projects', label: '项目' },
    { href: '/archive', label: '归档' },
    { href: '/about', label: '关于' },
  ] satisfies NavItem[],
  socialLinks: [
    { label: 'GitHub', href: 'https://github.com/3436567162/hust-Phoenix' },
    { label: 'Email', href: 'mailto:3436567162@qq.com' },
  ] satisfies SocialLink[],
};
