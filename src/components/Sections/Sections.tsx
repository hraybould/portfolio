import { AboutMe } from "./AboutMe";
import { Contact } from "./Contact";
import { Section } from "./models";
import { Resume } from "./Resume";
import { Skills } from "./Skills";

export const SectionsBuilder: React.FC = () => {
  return (
    <div className="SectionsWrapper">
      {ALL_SECTIONS.map(
        (section) =>
          section.sectionVisible && (
            <section
              key={section.titleText}
              id={section.id}
              className={
                section.sectionPrintable ? "IsPrintable" : "NotForPrinting"
              }
            >
              <div className="SectionInner">
                {section.titleVisible && (
                  <h2 className="SectionHeading">{section.titleText}</h2>
                )}
                {section.sectionContent}
              </div>
            </section>
          )
      )}
    </div>
  );
};

export const ALL_SECTIONS: Section[] = [
  {
    id: "about-me",
    titleText: "About Me",
    titleVisible: false,
    sectionContent: <AboutMe />,
    sectionVisible: true,
    sectionPrintable: false,
  },
  {
    id: "skills",
    titleText: "Skills",
    titleVisible: true,
    sectionContent: <Skills />,
    sectionVisible: true,
    sectionPrintable: false,
  },
  {
    id: "resume",
    titleVisible: true,
    titleText: "Resume",
    sectionContent: <Resume />,
    sectionVisible: true,
    sectionPrintable: true,
  },
  {
    id: "contact-me",
    titleText: "Contact",
    titleVisible: true,
    sectionContent: <Contact />,
    sectionVisible: true,
    sectionPrintable: true,
  },
];
