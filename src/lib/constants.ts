import { NavItem, SocialLink } from "@/types/content";

export const SITE_CONFIG = {
  name: "Apoorv Garg",
  title: "Apoorv Garg — Software Engineer",
  description:
    "Software engineer, Django Software Foundation member, and open source contributor.",
  url: "https://apoorv.dev",
};

export const NAV_ITEMS: NavItem[] = [
  { label: "~/home", href: "#hero" },
  { label: "~/about", href: "#about" },
  { label: "~/projects", href: "#projects" },
  { label: "~/events", href: "#events" },
  { label: "~/blog", href: "#blog" },
  { label: "~/book", href: "#book" },
  { label: "~/social", href: "#social" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "GitHub",
    command: "open github.com/Apoorvgarg-creator",
    url: "https://github.com/Apoorvgarg-creator",
    icon: "gh",
  },
  {
    label: "LinkedIn",
    command: "open linkedin.com/in/apoorv-garg-",
    url: "https://www.linkedin.com/in/apoorv-garg-/",
    icon: "in",
  },
  {
    label: "Portfolio",
    command: "open apoorvgarg.in",
    url: "https://apoorvgarg.in",
    icon: "www",
  },
  {
    label: "Mentor",
    command: "open topmate.io/apoorv_garg",
    url: "https://topmate.io/apoorv_garg",
    icon: "tm",
  },
  {
    label: "Email",
    command: "mail apoorvgarg.ms@gmail.com",
    url: "mailto:apoorvgarg.ms@gmail.com",
    icon: "@",
  },
];

export const ASCII_LOGO = `
 █████   ██████   ██████   ██████  ██████  ██    ██
██   ██  ██   ██ ██    ██ ██    ██ ██   ██ ██    ██
███████  ██████  ██    ██ ██    ██ ██████  ██    ██
██   ██  ██      ██    ██ ██    ██ ██   ██  ██  ██
██   ██  ██       ██████   ██████  ██   ██   ████
`.trim();

export const BOOT_LINES = [
  { text: "BIOS v3.14 — Initializing system...", delay: 0 },
  { text: "Memory test: 16384 MB OK", delay: 200 },
  { text: "Detecting hardware... OK", delay: 400 },
  { text: "Loading kernel modules...", delay: 600 },
  { text: "  ├── gpu.ko ............ OK", delay: 750 },
  { text: "  ├── net.ko ............ OK", delay: 900 },
  { text: "  └── fs.ko ............. OK", delay: 1050 },
  { text: "Mounting filesystems... OK", delay: 1200 },
  { text: "Starting network services... OK", delay: 1400 },
  { text: "Loading portfolio.exe...", delay: 1600 },
  { text: "", delay: 1800 },
  { text: "System ready.", delay: 2000 },
];
