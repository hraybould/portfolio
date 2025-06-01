import React from "react";
import {
  STARTED_AVAMAE,
  STARTED_MTC,
  STARTED_STORMFRONT_RETAIL,
} from "../keyDates";
import { useResumeDropdown } from "./components/ResumeDropdown";
import { useMedia } from "use-media";
import { TABLET_MIN_WIDTH } from "appHelpers";
import {
  ALL_SKILLS,
  buildSkillTitle,
  getSkillsArray,
} from "../Skills/skillsHelpers";
import { durationFormatter } from "helpers/durationFormatter";
import { ListItem, SimpleList } from "components/SimpleList";
import { useAppSelector } from "app/hooks";
import { CV_MODE } from "app/selectors";
import { RootState } from "app/store";
import { ResumeHeading } from "./components/ResumeHeading";

interface ResumeProps {}

export const Resume: React.FC<ResumeProps> = () => {
  const cvMode = useAppSelector(CV_MODE);
  return (
    <>
      {/* Personal Profile */}
      <PersonalProfile />
      {/* Key Skills - Resume */}
      <KeyResumeSkills cvMode={cvMode} />
      {/* Key Achievements */}
      <KeyAchievements cvMode={cvMode} />
      {/* Prior Experience */}
      <PriorExperience />
      {/* Education */}
      <Education cvMode={cvMode} />
      {/*
          NOTE: Deliberate break here when print CV
          REASON: When printing the CV version, the heading shows on a previous page
      */}
      {cvMode && <br className="ForPrintOnly" />}
      {/* Hobbies and Interests */}
      <HobbiesAndInterests />
      {/* Print button */}
      <PrintThisPage cvMode={cvMode} />
    </>
  );
};

// Personal Profile - START
/**
 * Introduction to Resume
 */
const PersonalProfile: React.FC = () => {
  const cvMode = useAppSelector(CV_MODE);

  return (
    <section>
      <h3>Personal Profile</h3>
      {cvMode ? (
        <>
          <p>
            Senior front-end React developer with expertise in TypeScript and
            modern web technologies. Expertise in building high-performance,
            real-time user interfaces for data-intensive applications. Recent
            experience developing a live sports-betting platform; requiring
            ultra-low latency, high-frequency data updates, and pixel-perfect UI
            design.
          </p>
          <p>
            Experienced in leading front-end initiatives within dynamic,
            cross-functional teams, collaborating closely with backend
            engineers, product managers, and designers to deliver scalable,
            maintainable solutions that balance performance with usability.
            Proven ability to thrive in high-pressure, time-sensitive
            environments where precision and speed are paramount.
          </p>
        </>
      ) : (
        <>
          <p>
            Senior front-end React developer with expertise in TypeScript,
            focused on building high-performance, real-time UIs for data-driven
            applications. Experienced in leading front-end efforts on
            low-latency platforms with streaming updates. A strong collaborator
            within cross-functional teams, delivering scalable, high-fidelity
            interfaces in fast-paced, high-stakes environments.
          </p>
        </>
      )}
    </section>
  );
};
// Personal Profile - END

// Key Skills (Resume) - START

interface KeyResumeSkillsProps {
  cvMode: RootState["toggle"]["cvMode"];
}
/**
 *
 */
const KeyResumeSkills: React.FC<KeyResumeSkillsProps> = ({ cvMode }) => (
  <section className="ForPrintOnly">
    <h3>Key Skills</h3>
    <SimpleList
      list={getSkillsArray(
        {
          CoreSkills: ALL_SKILLS["CoreSkills"],
          Languages: ALL_SKILLS["Languages"],
          "Software & Other Libraries":
            ALL_SKILLS["Software & Other Libraries"],
        },
        true,
        true
      ).map((skill) => ({
        itemInfo: (
          <>
            {buildSkillTitle(skill)}&nbsp;-&nbsp;
            {durationFormatter({
              start: skill.start,
              end: skill.end,
              format: cvMode ? ["years", "months"] : ["years"],
              delimiter: ", ",
            })}
          </>
        ),
        visible: true,
      }))}
    />
  </section>
);
// Key Skills (Resume) - END

// Key Achievements - START
type KeyAchievement = Omit<ListItem, "visible" | "subList"> & {
  cvVisible: boolean;
  resumeVisible: boolean;
  subList?: KeyAchievement[];
};
const KEY_ACHIEVEMENTS: KeyAchievement[] = [
  {
    itemInfo: (
      <>
        Developed and distributed a React Native app to both Apple and Android
        app stores
      </>
    ),
    cvVisible: true,
    resumeVisible: true,
  },
  {
    itemInfo: (
      <>
        Became a Lead Engineer for AVAMAE's largest project less than 2 years
        after starting
      </>
    ),
    cvVisible: true,
    resumeVisible: true,
  },
  {
    itemInfo: (
      <>
        Without outages or downtime, rewrote a live React app from JavaScript to
        TypeScript; including converting lifecycle methods to Hooks and
        providing extensive type definitions
      </>
    ),
    cvVisible: true,
    resumeVisible: true,
  },
  {
    itemInfo: (
      <>
        Represented The Manufacturing Technology Centre (The MTC) by presenting
        at the International Conference on Additive Manufacturing, EMO Hannover
        2019
      </>
    ),
    cvVisible: true,
    resumeVisible: true,
  },
  {
    itemInfo: (
      <>
        Lead development in key projects at The MTC such as: Additive
        Manufacturing (AM), and low-cost Industry 4.0 (I4.0) condition
        monitoring
      </>
    ),
    cvVisible: true,
    resumeVisible: true,
    subList: [
      {
        itemInfo: <>Obtained Level 1 Vibration Analyst from RMS Solutions</>,

        cvVisible: false,
        resumeVisible: false,
      },
      {
        itemInfo: (
          <>
            Early completion of The MTC Graduate Program, transferring from the
            2-year scheme within the first 6 months
          </>
        ),

        cvVisible: true,
        resumeVisible: true,
      },
    ],
  },
  {
    itemInfo: (
      <>
        Halved the time in which a repair could be processed and completed as a
        Senior Technician at Select (formerly Stormfront Retail)
      </>
    ),

    cvVisible: false,
    resumeVisible: false,
  },
  {
    itemInfo: (
      <>Graduated from Exeter University with a 2:1 BSc Physics (Hons.)</>
    ),

    cvVisible: true,
    resumeVisible: true,
  },
  {
    itemInfo: (
      <>
        Gained 4 full A-Levels: A*, A, A, C, from Arthur Terry School and Sixth
        Form
      </>
    ),
    cvVisible: true,
    resumeVisible: false,
  },
];

const convertKeyAchievements =
  (cvMode: RootState["toggle"]["cvMode"], includeSubItems = false) =>
  (keyAchievement: KeyAchievement): ListItem => ({
    itemInfo: keyAchievement.itemInfo,
    visible: cvMode ? keyAchievement.cvVisible : keyAchievement.resumeVisible,
    subList:
      includeSubItems && keyAchievement.subList
        ? keyAchievement.subList.map(convertKeyAchievements(cvMode))
        : undefined,
  });

interface KeyAchievementsProps {
  cvMode: RootState["toggle"]["cvMode"];
}
/**
 * Summary of key achievements over recent years
 */
const KeyAchievements: React.FC<KeyAchievementsProps> = ({ cvMode }) => (
  <section>
    <h3>Key Achievements</h3>
    <SimpleList list={KEY_ACHIEVEMENTS.map(convertKeyAchievements(cvMode))} />
  </section>
);
// Key Achievements - END

// Prior Experience - START
/**
 * Summary of roles
 */
type JobRole = {
  companyName: string;
  /** Optional sub-title, added because Stormfront changed its name */
  subTitle?: string;
  // description: string
  /** Start date of role */
  start: Date;
  /** End date of role */
  end?: Date;
  positions: Position[];
  /** Brief description about role */
  overview: React.ReactNode;
  // /** Bullet points for the resume version of the role, this is short */
  // roleResume: ListItem[]
  /** Bullet points for the CV version of the role, this is longer */
  rolePoints: ListItem[];
  /** Show/hide the role */
  visible: boolean;
  /** Link to company website or further details */
  link: string;
};

/**
 * Summary of positions in different roles
 */
type Position = {
  positionName: string;
  /** If no start date, use parent start date */
  start?: Date;
  /** If no end date, use parent end date */
  end?: Date;
  // description: string;
};

const PREVIOUS_ROLES: JobRole[] = [
  {
    companyName: "Select",
    subTitle: "Formerly: Stormfront Retail",
    start: STARTED_STORMFRONT_RETAIL,
    end: STARTED_MTC,
    positions: [
      {
        positionName: "Team Member",
        end: new Date("2017-03-01"),
      },
      {
        positionName: "Senior Technician",
        start: new Date("2017-03-01"),
      },
    ],
    overview: (
      <>
        An intensely customer facing role; uniquely for a retail position it
        required high attention to detail in order to efficiently diagnose
        issues with customer devices.
      </>
    ),
    rolePoints: [
      {
        itemInfo: <>Assisted customers with device issues.</>,
        visible: true,
      },
      {
        itemInfo: <>Provided educational workshops for customers.</>,
        visible: true,
      },
      {
        itemInfo: (
          <>
            Created an internal document to support other staff members; its use
            lead to a 30% reduction in repair lead times.
          </>
        ),
        visible: true,
      },
      {
        itemInfo: (
          <>Collaborated with team members to improve service quality.</>
        ),
        visible: true,
      },
    ],
    visible: false,
    link: "https://uk.selectonline.com/",
  },
  {
    companyName: "The Manufacturing Technology Centre",
    subTitle: "The MTC",
    start: STARTED_MTC,
    end: STARTED_AVAMAE,
    positions: [
      {
        positionName: "Graduate Research Engineer",
        end: new Date("2018-03-01"),
      },
      {
        positionName: "Research Engineer",
        start: new Date("2018-03-01"),
      },
    ],
    overview: (
      <>
        Contributed to a wide range of projects from Industry 4.0 (I4.0) to
        Internet of Things (IoT) systems; notable projects include "Encompass",
        "BluePlanet", and "AI Ecosystem". Later in the role, held management and
        mentoring roles for a number of graduates within the team helping to
        onboard and develop their skills.
      </>
    ),
    rolePoints: [
      {
        itemInfo: <>Key technologies: Python, Python-Flask, JavaScript</>,
        visible: true,
      },
      {
        itemInfo: (
          <>
            Mentored graduate engineers, fostering a collaborative team
            environment and skill development.
          </>
        ),
        visible: true,
      },
      {
        itemInfo: (
          <>
            Led full-stack development for the Encompass project, building an{" "}
            <i>"Integrated Design Decision Support"</i> (IDDS) system that
            handled third-party integrations.
          </>
        ),
        visible: true,
      },
      {
        itemInfo: (
          <>
            Presented expertise on Encompass and Additive Manufacturing at an
            international, industry-leading engineering forum in Hannover,
            Germany.
          </>
        ),
        visible: true,
      },
      {
        itemInfo: (
          <>
            Architected and developed a low-code I4.0-IoT solution for
            "BluePlanet". A fully-autonomous crop-monitoring rover reported
            agricultural and telemetry data to AWS.
          </>
        ),
        visible: true,
      },
      {
        itemInfo: (
          <>
            Created a Python Web-App template that became the basis for many
            projects including the <i>"AI Ecosystem"</i>
            which showcased the department's capabilities and success stories.
          </>
        ),
        visible: true,
      },
    ],
    visible: true,
    link: "https://www.the-mtc.org/",
  },
  {
    companyName: "AVAMAE Software Solutions",
    start: STARTED_AVAMAE,
    // end: new Date(),
    positions: [
      {
        positionName: "App Engineer",
        end: new Date("2023-04-01"),
      },
      {
        positionName: "Lead Engineer",
        start: new Date("2023-04-01"),
      },
    ],
    overview: (
      <>
        Joined in the midst of the pandemic which required strong communication
        skills in order to quickly form close-knit connections with the team.
        This role cemented proficiencies in React, Hooks, Redux, and TypeScript.
        The project here required excellent time-management and flexibility in
        order to meet the demands of the role and client.
      </>
    ),
    rolePoints: [
      {
        itemInfo: (
          <>Key technologies: React, TypeScript, SCSS, Microsoft Azure</>
        ),
        visible: true,
      },
      {
        itemInfo: (
          <>
            Facilitated client interactions, adapting to evolving priorities and
            requirements.
          </>
        ),
        visible: true,
      },
      {
        itemInfo: (
          <>
            Led project to enhance UI, UX, and accessability with React, Hooks,
            and TypeScript.
          </>
        ),
        visible: true,
      },
      {
        itemInfo: (
          <>
            Spearheaded codebase modernisation, converting 300 files to
            TypeScript; improved code-clarity, readability, robustness and lead
            to a 15% increase in page performance
          </>
        ),
        visible: true,
      },
      {
        itemInfo: (
          <>
            Mentored junior engineers to improve onboarding rate and code
            familiarity.
          </>
        ),
        visible: true,
      },
      {
        itemInfo: (
          <>
            Built and maintained low-latency, high-frequency UIs to address
            client needs.
          </>
        ),
        visible: true,
      },
    ],
    visible: true,
    link: "https://www.avamae.co.uk/",
  },
];

/**
 * Previous jobs
 */
const PriorExperience: React.FC = () => {
  // IDEA:
  //  - timeline slider alongside roles to show dates
  const [rolesData, dropdown] = useResumeDropdown(PREVIOUS_ROLES);
  const largerThanTablet = useMedia(TABLET_MIN_WIDTH);

  return (
    <section>
      <div className="DisplayFlex SmallGap JustifySpaceBetween">
        <h3>Prior Experience</h3>
        <div>{dropdown}</div>
      </div>
      {rolesData.map(
        (job, jobIndex) =>
          job.visible && (
            <div key={`JOB_${jobIndex}`} className="RoleGroup">
              <ResumeHeading
                heading={job.companyName}
                subTitle={job.subTitle}
                link={job.link}
                start={job.start}
                end={job.end}
                flexEvenly={!largerThanTablet}
              />
              {job.positions.map((position, positionIndex) => (
                <ResumeHeading
                  key={`JOB_ROLE_${positionIndex}`}
                  heading={position.positionName}
                  start={position.start ?? job.start}
                  end={position.end ?? job.end}
                  smaller
                  flexEvenly={!largerThanTablet}
                />
              ))}
              {/* <div className="RoleInfo">
                {cvMode ? job.roleCV : job.roleResume}
              </div> */}
              <p>{job.overview}</p>
              <SimpleList list={job.rolePoints} />
            </div>
          )
      )}
    </section>
  );
};
// Prior Experience - END

// Education History - START
type EducationalInstitutions = {
  institutionName: string;
  start: Date;
  end: Date;
  subTitle?: string;
  modules: {
    title?: string;
    subTitle?: string;
    notableGrades: string[];
  }[];
};

const PAST_EDUCATION: EducationalInstitutions[] = [
  {
    institutionName: "University Of Exeter",
    subTitle: "2:1 BSc Physics (Hons.)",
    start: new Date("2013-09-01"),
    end: new Date("2016-06-01"),
    modules: [
      {
        subTitle: "2:1 BSc Physics (Hons.)",
        notableGrades: [
          "Quantum Mechanics I - 69%",
          "Nuclear and High Energy Particle Physics - 67%",
          "Projects and Dissertations - 67%",
          "Practical Physics II - 65%",
          "General Problems - 65%",
        ],
      },
    ],
  },
  {
    institutionName: "Arthur Terry School and Sixth Form",
    start: new Date("2006-09-01"),
    end: new Date("2013-06-01"),
    modules: [
      {
        title: "A-Level",
        subTitle: "A-Levels: A*AAC",
        notableGrades: [
          "Mathematics - A*",
          "Further Mathematics - A",
          "Physics - A",
          "Chemistry - C",
        ],
      },
      {
        title: "GCSE",
        subTitle: "GCSEs: 11 A-grades, 3 B-grades",
        notableGrades: [
          "11 A-grades (including English, Maths, all Sciences, and ICT)",
          "3 B-grades",
        ],
      },
    ],
  },
];

interface EducationProps {
  cvMode: RootState["toggle"]["cvMode"];
}

/**
 * Education History
 */
const Education: React.FC<EducationProps> = ({ cvMode }) => {
  const [educationData, dropdown] = useResumeDropdown(PAST_EDUCATION);
  return (
    <section>
      <div className="DisplayFlex SmallGap JustifySpaceBetween">
        <h3>Education</h3>
        <div>{dropdown}</div>
      </div>
      {educationData.map((institution, institutionIndex) => (
        <div
          key={`EDUCATION_INSTITUTION_${institutionIndex}`}
          className="RoleGroup"
        >
          <ResumeHeading
            heading={institution.institutionName}
            subTitle={institution.subTitle}
            start={institution.start}
            end={institution.end}
          />
          {institution.modules.map((module, moduleIndex) => (
            <React.Fragment key={`EDUCATION_MODULE_${moduleIndex}`}>
              {cvMode ? (
                <>
                  {module.title && <h6>{module.title}</h6>}

                  <ul>
                    {module.notableGrades.map((grade, gradeIndex) => (
                      <li key={`NOTABLE_GRADE_${gradeIndex}`}>{grade}</li>
                    ))}
                  </ul>
                </>
              ) : (
                module.subTitle && <p>{module.subTitle}</p>
              )}
            </React.Fragment>
          ))}
        </div>
      ))}
    </section>
  );
};
// Education History - END

// Hobbies and Interests - START
/**
 * Hobbies and Interests
 */
const HobbiesAndInterests: React.FC = () => (
  <section>
    <h3>Hobbies and Interests</h3>
    <p>
      Passionate about powerlifting, DIY, scuba diving, and small-scale
      programming projects:
    </p>
    <ul>
      <li>A Visual Studio Code (VS Code) extension</li>
      <li>
        An Apple HomeKit-compatible smart thermostat controlled by Node-Red on a
        Raspberry Pi
      </li>
      <li>An Eisenhower Matrix app written in Swift for iOS</li>
      <li>
        A Network-Attached Storage (NAS) device for sharing files within my home
        network
      </li>
    </ul>
  </section>
);
// Hobbies and Interests - END

// Print page - START
interface PrintThisPageProps {
  cvMode: RootState["toggle"]["cvMode"];
}
const PrintThisPage: React.FC<PrintThisPageProps> = ({ cvMode }) => {
  return (
    <>
      <p className="NotForPrinting">
        You've read this far, why not{" "}
        <button
          type="button"
          className="Btn NoPadding NoBorder BtnInlineAction NoPrintDecoration"
          onClick={window.print}
        >
          print this page
        </button>{" "}
        to download a copy of my {cvMode ? "CV" : "resume"}.
      </p>
      <div style={{ fontSize: 0 }}>{process.env.REACT_APP_ADDITIONAL_INFO}</div>
    </>
  );
};
// Print page - START
