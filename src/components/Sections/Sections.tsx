import { useAppSelector } from "app/hooks";
import { CV_MODE } from "app/selectors";
import { AboutMe } from "./AboutMe/AboutMe";
import { Contact } from "./Contact/Contact";
import { Section } from "./models";
import { Resume, ResumeSwitch } from "./Resume";
import { Skills } from "./Skills/Skills";

export const SectionsBuilder: React.FC = () => {
  const cvMode = useAppSelector(CV_MODE);
  return (
    <div className="SectionsWrapper">
      {ALL_SECTIONS.map((section, index) => {
        if (section.sectionVisible) {
          return (
            <section
              key={`PAGE_SECTION_${section.id}_${index}`}
              id={section.id}
              className={
                section.sectionPrintable ? "IsPrintable" : "NotForPrinting"
              }
            >
              <div className="SectionInner">
                {section.titleVisible && (
                  <div
                    className={`DisplayFlex JustifySpaceBetween ${
                      // TODO: Make the sticky behaviour dynamic
                      section.titleSticky ? "StickyTitle IsSticky" : ""
                    }`}
                  >
                    <h2 className="SectionHeading">
                      {typeof section.titleText === "function"
                        ? section.titleText(cvMode)
                        : section.titleText}
                    </h2>
                    {section.titleComponent}
                  </div>
                )}
                {section.sectionContent}
              </div>
            </section>
          );
        }
        return null;
      })}
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
    titleText: (passedBoolean: boolean) => (
      <>
        <span className="ForPrintOnly">
          Harrison Raybould - {passedBoolean ? "CV" : "Resume"}
        </span>
        <span className="NotForPrinting">
          {passedBoolean ? "Curriculum Vitae" : "Resume"}
        </span>
      </>
    ),
    navigationText: "CV & Resume",
    titleComponent: <ResumeSwitch />,
    titleSticky: true,
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
