export type Project = {
  name: string;
  description: string;
  github: string;
  website?: string;
  image?: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    name: "Markdown Preview Server",
    description:
      "A markdown preview server written in Rust to live-preview Markdown files",
    github: "https://github.com/iwillreku3206/markdown-preview-server",
  },
  {
    name: "nextjs-translations",
    description:
      "A Next.js 13 library to handle translations",
    github: "https://github.com/iwillreku3206/nextjs-translations",
  }
];
