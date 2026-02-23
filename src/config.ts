export const SITE = {
  website: "https://blog.mzmuse.com/",
  author: "Mehdi Zonjy",
  profile: "https://mzmuse.com/",
  desc: "A blog about software engineering, performance, and programming.",
  title: "MZMuse",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 4,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "en",
  timezone: "UTC",
} as const;
