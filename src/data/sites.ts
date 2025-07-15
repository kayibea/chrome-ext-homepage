export type Site = (typeof sites)[number];

export const sites = [
  {
    name: 'Stack Overflow',
    shortcut: '@so',
    domain: 'stackoverflow.com',
  },
  {
    name: 'MDN Web Docs',
    shortcut: '@mdn',
    domain: 'developer.mozilla.org',
  },
  {
    name: 'PHP',
    shortcut: '@php',
    domain: 'php.net',
  },
  {
    name: 'GitHub',
    shortcut: '@gh',
    domain: 'github.com',
  },
  {
    name: 'NPM',
    shortcut: '@npm',
    domain: 'npmjs.com',
  },
  {
    name: 'Rust Docs',
    shortcut: '@rs',
    domain: 'doc.rust-lang.org',
  },
  {
    name: 'Go Packages',
    shortcut: '@go',
    domain: 'pkg.go.dev',
  },
  {
    name: 'Python Docs',
    shortcut: '@py',
    domain: 'docs.python.org',
  },
  {
    name: 'Lua Manual',
    shortcut: '@lua',
    domain: 'lua.org/manual',
  },
  {
    name: 'TypeScript Handbook',
    shortcut: '@ts',
    domain: 'typescriptlang.org',
  },
  {
    name: 'Linux Man Pages',
    shortcut: '@man',
    domain: 'man7.org/linux/man-pages',
  },
  {
    name: 'Stack Exchange',
    shortcut: '@se',
    domain: 'stackexchange.com',
  },
  {
    name: 'The Odin Project',
    shortcut: '@odin',
    domain: 'theodinproject.com',
  },
  {
    name: 'CodePen',
    shortcut: '@cp',
    domain: 'codepen.io',
  },
  {
    name: 'LeetCode',
    shortcut: '@lc',
    domain: 'leetcode.com',
  },
  {
    name: 'Exercism',
    shortcut: '@ex',
    domain: 'exercism.io',
  },
  {
    name: 'MDX Docs',
    shortcut: '@mdx',
    domain: 'mdxjs.com',
  },
  {
    name: 'Kubernetes Docs',
    shortcut: '@k8s',
    domain: 'kubernetes.io/docs',
  },
  {
    name: 'Webpack Docs',
    shortcut: '@wp',
    domain: 'webpack.js.org',
  },
  {
    name: 'Vim Documentation',
    shortcut: '@vim',
    domain: 'vimhelp.org',
  },
  {
    name: 'C++ Reference',
    shortcut: '@cppref',
    domain: 'en.cppreference.com',
  },
  {
    name: 'DevDocs',
    shortcut: '@devdocs',
    domain: 'devdocs.io',
  },
  {
    name: 'Hacker News',
    shortcut: '@hn',
    domain: 'news.ycombinator.com',
  },
  {
    name: 'GitLab',
    shortcut: '@gl',
    domain: 'gitlab.com',
  },
  {
    name: 'Deno Manual',
    shortcut: '@deno',
    domain: 'deno.land/manual',
  },
  {
    name: 'CSS-Tricks',
    shortcut: '@csst',
    domain: 'css-tricks.com',
  },
  {
    name: 'W3Schools',
    shortcut: '@w3',
    domain: 'w3schools.com',
  },
  {
    name: 'Reddit Programming',
    shortcut: '@rprog',
    domain: 'reddit.com/r/programming',
  },
  {
    name: 'DigitalOcean Tutorials',
    shortcut: '@do',
    domain: 'digitalocean.com/community/tutorials',
  },
  {
    name: 'FreeCodeCamp',
    shortcut: '@fcc',
    domain: 'freecodecamp.org',
  },
  {
    name: 'JetBrains Docs',
    shortcut: '@jb',
    domain: 'jetbrains.com/help',
  },
] as const;
