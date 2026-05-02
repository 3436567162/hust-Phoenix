# Astro Personal Blog Design

## Overview

Build a content-first Chinese personal technical blog for a second-year university student who wants the site itself to also reflect frontend capability. The site will be implemented as a static Astro project and deployed on a free hosting platform.

The first release is not a full content platform. It is a focused, production-like personal site whose primary job is to publish technical writing clearly and consistently, while also providing a lightweight portfolio presence.

## Goals

- Publish Chinese technical articles with a clean reading experience.
- Establish a durable content structure through categories, tags, and archives.
- Present a small number of representative projects without letting them overshadow the blog.
- Keep deployment free and low-maintenance.
- Leave room for later visual and interaction upgrades without reworking the information architecture.

## Non-Goals For V1

- No login system or authoring backend.
- No custom CMS.
- No comment system.
- No advanced search.
- No multi-language support.
- No heavy animation or showcase-first interaction design.
- No self-managed server infrastructure.

V1 is single-language and uses Simplified Chinese as the default language across the site.

## Product Positioning

This site is a "blog-first personal site":

- The blog is the primary surface.
- The portfolio is a supporting surface.
- Personal branding exists, but it does not replace the content system.

The intended first impression is: this is someone who consistently writes about technology and also builds real projects.

## Audience

- Recruiters or interviewers who want quick evidence of technical direction and practical experience.
- Peers who want to read technical posts or project writeups.
- The author, who needs a stable place to accumulate learning notes and project reflections over time.

## Platform Direction

- Framework: Astro
- Site type: Static site
- Deployment preference: Free hosting
- Likely deployment targets: GitHub Pages, Cloudflare Pages, or Vercel

The design should remain host-agnostic so the deployment target can be chosen during implementation without changing the content model or routing structure.

## Language And Localization

V1 uses Simplified Chinese as the primary language for:

- Navigation
- Page headings
- Article metadata labels
- About and project descriptions
- Most article content

English may still appear naturally in technical contexts such as:

- Technology names
- Library and framework names
- Code identifiers
- Command lines

The site should therefore feel like a Chinese technical blog rather than an English template with translated content.

## Information Architecture

V1 includes these pages and sections:

- Home
- Blog index
- Article detail
- Categories index
- Category detail
- Tags index
- Tag detail
- Archive
- Projects
- About

Global layout includes:

- Top navigation
- Footer
- Basic site metadata
- Mobile-responsive layout

## Page Responsibilities

### Home

Purpose:

- Explain who the author is within a few seconds.
- Route visitors toward articles first and projects second.

Required sections:

- Short self-introduction
- Technical interests or focus areas
- Latest articles
- Featured category or tag entry points
- Two to three representative projects
- Short about preview with link to full About page

### Blog Index

Purpose:

- Help visitors discover articles quickly.
- Make the content structure visible.

Required elements:

- Brief page description
- Article list sorted by date
- Title, summary, date, category, and tags for each article
- Filtering by category or tag
- Pagination or year grouping, with pagination preferred for V1

### Article Detail

Purpose:

- Provide a polished technical reading experience.

Required elements:

- Title
- Publication date
- One category
- Two to five tags
- Table of contents
- Rendered article body
- Code block styling
- Previous and next article navigation
- Link back to blog index

### Categories

Purpose:

- Show the major types of content on the site.

Required elements:

- Categories index page
- Category detail pages listing matching articles

### Tags

Purpose:

- Show concrete technical topics covered by the content.

Required elements:

- Tags index page
- Tag detail pages listing matching articles

### Archive

Purpose:

- Show continuity of writing over time.

Required elements:

- Posts grouped by year or month

### Projects

Purpose:

- Support the blog with practical evidence of technical work.

Required elements:

- Project title
- Short description
- Tech stack
- Screenshot or external link

Project entries should stay concise. V1 is not a case-study hub.

### About

Purpose:

- Establish identity and direction.

Required elements:

- Background summary
- Current learning focus
- Future technical goals
- Contact methods such as GitHub and email

## Content Model

### Post Categories

Use a small, stable category system. V1 starts with four categories:

- Learning Summary
- Project Retrospective
- Troubleshooting
- Technical Essay

A fifth category, Practice Log, may be added later if course work or competition writeups become frequent enough to justify it.

### Tags

Tags should capture specific technical topics, such as:

- Astro
- TypeScript
- React
- Node.js
- Linux
- Git
- Algorithms
- Performance
- Deployment
- Debugging
- Tooling

Rules:

- Each article has exactly one category.
- Each article has two to five tags.
- Category names stay fixed unless the content strategy changes significantly.
- Tag naming must remain consistent.

## Content Strategy

V1 content should focus on writing that accumulates technical credibility over time:

- Learning summaries
- Project retrospectives
- Troubleshooting notes
- Growth-oriented technical reflections

The core rule is that the content should center on the author's understanding and hands-on experience, not on reposting general technology news.

Writing should default to clear, natural Chinese, while keeping technical terminology precise. When an English technical term is more standard than its translated form, the English term can be used directly.

## Visual And UX Direction

The site should feel intentional and modern, but V1 should prioritize clarity over visual complexity.

Principles:

- Reading experience comes first.
- Articles should visually outrank portfolio content.
- The visual style should feel personal rather than template-generic.
- Mobile and desktop experiences should both be first-class.

## SEO And Discoverability

V1 should include baseline discoverability support:

- Page titles and descriptions
- Clean URL structure
- Sitemap
- Social metadata where practical
- Sensible article metadata exposure

## Error Handling

V1 should account for common content-site failure modes:

- Missing article metadata should fail clearly during build if possible.
- Empty states for categories, tags, or projects should render gracefully.
- Broken internal navigation should be avoided through generated routes and validated content collections.

## Testing And Quality Bar

V1 does not require a large test suite, but it does need focused verification:

- Local build succeeds without broken routes.
- Core pages render correctly on desktop and mobile widths.
- Article rendering is checked with real sample content.
- Category, tag, and archive navigation works end to end.
- Deployment output is validated on the chosen free host.

## Release Scope For V1

Included:

- Home
- Blog system
- Categories
- Tags
- Archive
- Projects
- About
- Basic SEO
- Responsive layout

Deferred:

- Comments
- Complex search
- Analytics dashboard
- Multi-language support
- Theme switching beyond what is trivial to maintain
- Auth or content admin features

## Implementation Guidance

During implementation, prefer a structure that separates:

- Layouts
- Content definitions
- Page routes
- Shared UI components
- Project and post data sources

The implementation should optimize for long-term maintainability rather than short-term shortcutting, because the value of the site depends on continued publishing over time.

## Success Criteria

V1 is successful if:

- The author can publish articles consistently.
- Visitors can immediately understand the main technical topics covered by the blog.
- Articles are easy to browse through categories, tags, and archives.
- The site presents enough project context to support the author's technical identity without distracting from the writing.
