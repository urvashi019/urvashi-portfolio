import { Icons } from "@/components/icons";
import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Urvashi Vishwakarma",
  pronunciation: "/ur·vash·ee · vish·wa·kar·ma/",
  url: "https://urvashivishi.me",
  description: "B.Tech student in Electronics & Communication Engineering at UIT RGPV, interested in hardware and embedded systems.",
  introduction: "I build hardware that talks to software.",
  introductionDetail: "[ADD 1-2 LINES]",
  summary: "[ADD DESCRIPTION]",
  tagline: "ECE · Hardware · Embedded Systems",
  skills: [{ name: "[ADD SKILLS]" }],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "urvashivishi04@gmail.com",
    x: "[ADD X URL]",
    linkedin: "[ADD LINKEDIN URL]",
  },
  resumeUrl: "/resume.pdf",
  work: [
    {
      company: "NITTTR Bhopal",
      title: "Intern",
      period: "[ADD DATES]",
      description: "[ADD WHAT SHE DID]",
    },
    {
      company: "IEEE Society, UIT RGPV",
      title: "Member",
      period: "[ADD YEARS]",
      description: "[ADD ROLE / ACTIVITIES]",
    },
  ],
  education: [
    {
      school: "UIT RGPV",
      degree: "B.Tech in Electronics & Communication Engineering (ECE)",
      period: "2023 - 2027",
      detail: "CGPA [ADD CGPA]",
    },
    {
      school: "Jawahar Navodaya Vidyalaya, Arnia Kalan",
      degree: "Class XII, CBSE",
      period: "2022",
      detail: "75%",
    },
  ],
  projects: [
    {
      title: "Smart India Hackathon 2025 — National Finalist",
      href: "[ADD LINK]",
      dates: "2025",
      description: "[ADD TITLE / DESCRIPTION / HARDWARE USED]",
      technologies: ["[ADD HARDWARE / TOOLS]"],
    },
    {
      title: "[ADD PROJECT 2]",
      href: "",
      dates: "[ADD DATES]",
      description: "[ADD DESCRIPTION]",
      technologies: [],
    },
    {
      title: "[ADD PROJECT 3]",
      href: "",
      dates: "[ADD DATES]",
      description: "[ADD DESCRIPTION]",
      technologies: [],
    },
  ],
  achievements: [
    {
      title: "Smart India Hackathon 2025",
      dates: "2025",
      location: "",
      description: "National Finalist",
    },
    {
      title: "GATE 2027",
      dates: "In preparation",
      location: "",
      description: "Preparing for GATE 2027 (ECE)",
    },
    {
      title: "[ADD MORE ACHIEVEMENTS]",
      dates: "",
      location: "",
      description: "",
    },
  ],
} as const;

export const LINKEDIN_ICON = Icons.linkedin;
export const X_ICON = Icons.x;
