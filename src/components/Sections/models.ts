const SectionName = ["About Me", "Skills", "CV & Resume", "Contact"] as const;

export type Section = {
  id: string;
  titleText:
    | (typeof SectionName)[number]
    | ((passedBoolean: boolean) => React.ReactNode);
  navigationText?: (typeof SectionName)[number];
  titleVisible: boolean;
  titleComponent?: React.ReactNode;
  sectionContent: React.ReactNode;
  sectionVisible: boolean;
  sectionPrintable: boolean;
};
