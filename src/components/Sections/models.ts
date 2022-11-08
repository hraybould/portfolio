type SectionName = "About Me" | "Skills" | "Resume" | "Contact";

type Section = {
  id: string;
  titleVisible: boolean;
  content: React.ReactNode;
  sectionVisible: boolean;
};

export type SectionsStructure = Record<SectionName, Section>;
