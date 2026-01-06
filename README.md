# Flying Rat Tech Blog

## Local development

Preferred (bun):
```
bun install
bun dev
```

Alternative (npm):
```
npm install
npm run dev
```

Then open http://localhost:3000.

## Add a new post

Posts live in `content/posts` as markdown files. Filename format:

```
YYYY-MM-DD-your-post-slug.md
```

The date prefix is used for ordering. URL format: `/{slug}-{id}`.
Example: `2025-01-15-my-post.md` with `id: a1b2c3d4` becomes `/my-post-a1b2c3d4`.

Generate a unique ID for new posts:
```bash
node -e "console.log(Math.random().toString(36).slice(2,10))"
```

Frontmatter fields (required unless marked optional):

- `title`
- `date` (ISO string with timezone)
- `id` (8-char alphanumeric, generate with command above)
- `author` or `authors` (optional; use `authors` for multiple)
- `categories` (optional array)
- `tags` (optional array)
- `toc` (optional boolean; enable table of contents for `##` and `###` headings)
- `excerpt` (optional; auto-generated if missing)

Example template:
```
---
title: "Post title"
date: 2025-01-15T10:00:00+02:00
id: a1b2c3d4
author: "Author Name"
categories:
  - category
tags:
  - tag
  - another-tag
toc: true
excerpt: "Short summary shown on cards and meta."
---

## First section

Your content...
```
