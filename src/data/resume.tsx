import { HomeIcon } from "lucide-react";

export const DATA = {
  name: "Urvashi Vishwakarma",
  pronunciation: "/ur·vash·ee · vish·wa·kar·ma/",
  url: "https://urvashi-portfolio-five.vercel.app/",
  description:
    "ECE student building embedded hardware, from schematic to PCB to working prototype. Interested in assistive electronics and embedded systems.",
  tagline: "ECE · Embedded Systems · PCB Design",
  introduction:
    "ECE student who builds embedded hardware, from schematic to PCB to working prototype.",
  introductionDetails: [
    "Into assistive electronics and embedded systems. Preparing for GATE 2027.",
    "Open to hardware and embedded opportunities. Come say hi.",
  ],
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  contact: {
    email: "urvashivishi1904@gmail.com",
    linkedin: "https://www.linkedin.com/in/urvashi-vishwakarma-065941292/",
  },
  resumeUrl: "/resume.pdf",
  work: [
    {
      company: "NITTTR Bhopal",
      title: "Embedded Systems Intern",
      period: "[ADD DATES]",
      logo: "/logos/nitttr.png",
      description:
        "Assisted in schematic design and component selection for consumer electronics and battery-management systems (BMS).",
      // details: [
      //   "Created BOMs (Bill of Materials), managed vendor interactions for PCB fabrication, and supervised SMT/THT assembly.",
      //   "Performed unit testing, schematic capture updates, and prototype troubleshooting, lowering revision spins by 20%.",
      // ],
    },
    {
      company: "IEEE Student Chapter, UIT RGPV",
      title: "Volunteer, Eklavya event",
      period: "[ADD YEARS / ROLE]",
      logo: "/logos/ieee-rgpv.png",
      description:
        "Volunteered on the organising side of the chapter's flagship event, Eklavya. [VERIFY with her]",
    },
  ],
  education: [
    {
      school: "UIT RGPV",
      degree: "B.Tech in Electronics & Communication Engineering",
      period: "2023 - 2027",
      detail: "CGPA 7.34",
      logo: "/logos/uit-rgpv.png",
      monogram: "UIT",
    },
    {
      school: "Jawahar Navodaya Vidyalaya",
      degree: "CBSE: PCM with Computer Science",
      period: "2020 - 2022",
      detail: "",
      logo: "/logos/jnv.png",
      monogram: "JNV",
    },
  ],
  skills: [
    {
      name: "Hardware & Embedded",
      items: [
        "Schematic Design",
        "PCB Design & Fabrication Coordination",
        "BOM Management",
        "SMT/THT Assembly",
        "Hardware Debugging & Unit Testing",
        "Embedded Systems",
        "Battery Management Systems (BMS)",
        "Bluetooth Communication",
        "[ADD TOOLS, PROGRAMMING LANGUAGES & MICROCONTROLLERS]",
      ],
    },
    {
      name: "GATE ECE Core Subjects",
      items: [
        "Engineering Mathematics",
        "Networks",
        "Signals & Systems",
        "Electronic Devices",
        "Analog Circuits",
        "Digital Circuits",
        "Control Systems",
        "Communications",
        "Electromagnetics",
        "General Aptitude",
      ],
    },
  ],
  projects: [
    {
      title: "Digital Braille",
      dates: "Smart India Hackathon 2025 · National Finalist",
      description:
        "An accessibility project for visually impaired users, built over the 5-day SIH Grand Finale at Bannari Amman Institute of Technology. Combined PDF-to-text conversion, voice-to-text interaction, Gemini-based intelligent assistance and real-time wireless data transfer over Bluetooth.",
      details: "[ADD HER ROLE / HARDWARE USED / LINK]",
      technologies: ["Accessibility", "Bluetooth", "Embedded", "Gemini"],
      art: "braille",
    },
    {
      title: "SRIJAN",
      dates: "Walking-assistance device",
      description: "A hardware-based walking assistance device.",
      details: "[ADD WHAT IT DETECTS / SENSORS / MCU / OUTCOME / LINK]",
      technologies: ["Hardware"],
      art: "srijan",
    },
  ],
  achievements: [
    {
      title: "SIH 2025 National Finalist",
      dates: "2025",
      description: "Smart India Hackathon Grand Finale",
    },
    {
      title: "Preparing for GATE 2027 (ECE)",
      dates: "In preparation",
      description: "",
    },
    {
      title: "[ADD MORE]",
      dates: "",
      description: "",
    },
  ],
  footerCredit: "Template by Magic UI",
} as const;

export const LINKEDIN_ICON = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  </svg>
);
