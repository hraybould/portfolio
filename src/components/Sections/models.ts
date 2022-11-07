type SectionName = "About Me" | "Skills" | "Resume" | "Contact";

type Section = {
  id: string;
  // name: SectionName
};

type SectionsStructure = Record<SectionName, Section>;

export const Sections: SectionsStructure = {
  "About Me": {
    id: "about-me",
  },
  Skills: {
    id: "skills",
  },
  Resume: {
    id: "resume",
  },
  Contact: {
    id: "contact",
  },
};
