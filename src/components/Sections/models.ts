type SectionName = "About Me" | "Skills" | "Resume" | "Contact";

export type Section = {
  id: string;
  titleText: SectionName;
  titleVisible: boolean;
  sectionContent: React.ReactNode;
  sectionVisible: boolean;
};
