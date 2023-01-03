const SectionName = ["About Me", "Skills", "Resume", "Contact"] as const;

export type Section = {
  id: string;
  titleText: typeof SectionName[number];
  titleVisible: boolean;
  sectionContent: React.ReactNode;
  sectionVisible: boolean;
  sectionPrintable: boolean;
};
