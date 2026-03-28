export type Project = {
  name: string;
  description: string;
  github?: string;
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
    description: "A Next.js 13 library to handle translations",
    github: "https://github.com/iwillreku3206/nextjs-translations",
  },
  {
    name: "PTS Website",
    description:
      "Website used by Peer Tutors Society to handle and track tutor requests, events, and more",
    github: "https://github.com/dlsupts/pts-web-service-2024",
    demo: "https://dlsupts.vercel.app",
  },
  {
    name: "Facial Biometrics Detection System",
    description:
      "Machine Learning project and dataset that attempts to predict biological gender from images of a person's face. Uses public domain data from WikiData",
    github: "https://github.com/jrgo7/stintsy-wikidata",
  },
];

export const experiences: Project[] = [
  {
    name: "ArchCraft",
    description:
      "ArchCraft was an event hosted by the Peer Tutors Society with the goal of teaching basic Computer Architecture via Minecraft. My role in this event was to handle any technology-related parts, such as hosting the server and managing the livestream",
  },
];
