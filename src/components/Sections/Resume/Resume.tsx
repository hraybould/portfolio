import React from "react";
import {
  STARTED_AVAMAE,
  STARTED_MTC,
  STARTED_STORMFRONT_RETAIL,
} from "../keyDates";
import { Link } from "components/Link";
import { useResumeDropdown } from "./ResumeDropdown";
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

interface ResumeProps {}

export const Resume: React.FC<ResumeProps> = () => {
  return (
    <>
      {/* Personal Profile */}
      <PersonalProfile />
      {/* Key Skills - Resume */}
      <KeyResumeSkills />
      {/* Key Achievements */}
      <KeyAchievements />
      {/* Prior Experience */}
      <PriorExperience />
      {/* Education */}
      <Education />
      {/* Hobbies and Interests */}
      <HobbiesAndInterests />
      {/* Print button */}
      <PrintThisPage />
    </>
  );
};

interface ResumeHeadingProps {
  heading: string;
  subTitle?: string;
  link?: string;
  start: Date;
  end?: Date;
  smaller?: boolean;
  flexEvenly?: boolean;
}

const ResumeHeading: React.FC<ResumeHeadingProps> = ({
  heading,
  subTitle,
  link,
  start,
  end,
  smaller = false,
  flexEvenly = false,
}) => {
  const headingContent = (
    <>
      {link ? (
        <Link href={link} noPrintDecoration>
          {heading}
        </Link>
      ) : (
        heading
      )}
      {subTitle && (
        <>
          {" "}
          {/* Breakable space needed above for a better look when wrapping */}
          <em className="XSmallText Italics DisplayInlinBlock">({subTitle})</em>
        </>
      )}
    </>
  );

  const datesContent = (
    // non-breaking-space before to keep " -" before breaking to a new line
    <div className="RoleDate">
      <span>{formatDate(start)}&nbsp;-</span>{" "}
      <span>{end ? formatDate(end) : "Present"}</span>
    </div>
  );

  return (
    <div
      className={`DisplayFlex SmallGap ${
        flexEvenly ? "FlexEvenly" : ""
      } JustifySpaceBetween`}
    >
      <div>{smaller ? headingContent : <h5>{headingContent}</h5>}</div>
      <div>{smaller ? datesContent : <h5>{datesContent}</h5>}</div>
    </div>
  );
};

// Personal Profile - START

const CV_PERSONAL_PROFILE: React.ReactNode = (
  <>
    <p>
      Senior front-end JavaScript developer with deep expertise in React,
      TypeScript, and modern web technologies, focused on building
      high-performance, real-time user interfaces for data-intensive
      applications. My recent experience developing a live sports-betting
      platform—requiring ultra-low latency, high-frequency data updates, and
      pixel-perfect UI design—translates directly to the demands of financial
      trading systems such as day-trading or FX platforms. I've led front-end
      initiatives within agile, cross-functional teams, collaborating closely
      with backend engineers, product managers, and designers to deliver
      scalable, maintainable solutions that balance performance with usability.
      Proven ability to thrive in high-pressure, time-sensitive environments
      where precision and speed are paramount.
    </p>
  </>
);

const RESUME_PERSONAL_PROFILE: React.ReactNode = (
  <>
    <p>
      Senior front-end JavaScript developer with expertise in React and
      TypeScript, focussed on building high-performance, real-time UIs for
      data-driven applications. Experienced in leading front-end efforts on
      low-latency platforms with streaming updates, including work directly
      applicable to trading systems. Strong collaborator within cross-functional
      teams, delivering scalable, high-fidelity interfaces in fast-paced,
      high-stakes environments.
    </p>
  </>
);

/**
 * Introduction to Resume
 */
const PersonalProfile: React.FC = () => {
  const cvMode = useAppSelector(CV_MODE);

  return (
    <section>
      <h3>Personal Profile</h3>
      {cvMode ? CV_PERSONAL_PROFILE : RESUME_PERSONAL_PROFILE}
    </section>
  );
};
// Personal Profile - END

// Key Skills (Resume) - START
/**
 *
 */
const KeyResumeSkills: React.FC = () => (
  <section className="ForPrintOnly">
    <h3>Key Skills</h3>
    <SimpleList
      list={getSkillsArray(
        {
          Languages: ALL_SKILLS["Languages"],
          "Software & Other Libraries":
            ALL_SKILLS["Software & Other Libraries"],
        },
        true
      ).map((skill) => ({
        itemInfo: (
          <>
            {buildSkillTitle(skill)}&nbsp;-&nbsp;
            {durationFormatter({
              start: skill.start,
              end: skill.end,
              format: ["years", "months"],
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
const KEY_ACHIEVEMENTS: ListItem[] = [
  {
    itemInfo: (
      <>
        Developed and distributed a React Native app to both Apple and Android
        app stores
      </>
    ),
    visible: true,
  },
  {
    itemInfo: (
      <>
        Became the Lead Engineer for AVAMAE's largest project less than 2 years
        after starting
      </>
    ),
    visible: true,
  },
  {
    itemInfo: (
      <>
        Without outages or downtime, rewrote a live React app from JavaScript to
        TypeScript; including converting lifecycle methods to Hooks and
        providing extensive type definitions
      </>
    ),
    visible: true,
  },
  {
    itemInfo: (
      <>
        Represented The Manufacturing Technology Centre (The MTC) by presenting
        at the International Conference on Additive Manufacturing, EMO Hannover
        2019
      </>
    ),
    visible: true,
  },
  {
    itemInfo: (
      <>
        Lead development in key projects at The MTC such as: Additive
        Manufacturing (AM), and low-cost Industry 4.0 (I4.0) condition
        monitoring
      </>
    ),
    visible: true,
    subList: [
      {
        itemInfo: <>Obtained Level 1 Vibration Analyst from RMS Solutions</>,
        visible: false,
      },
      {
        itemInfo: (
          <>
            Early completion of The MTC Graduate Program, transferring from the
            2-year scheme within the first 6 months
          </>
        ),
        visible: true,
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
    visible: false,
  },
  {
    itemInfo: (
      <>Graduated from Exeter University with a 2:1 BSc Physics (Hons.)</>
    ),
    visible: true,
  },
  {
    itemInfo: (
      <>
        Gained 4 full A-Levels: A*, A, A, C, from Arthur Terry School and Sixth
        Form
      </>
    ),
    visible: false,
  },
];

/**
 * Summary of key achievements over recent years
 */
const KeyAchievements: React.FC = () => (
  <section>
    <h3>Key Achievements</h3>
    <SimpleList list={KEY_ACHIEVEMENTS} />
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
  /** The resume version of the role, this is shorter */
  roleResume: React.ReactNode;
  /** The CV version of the role, this is longer */
  roleCV: React.ReactNode;
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
    roleResume: (
      <>
        <p>
          This was an intensely customer facing role; uniquely for a retail
          position it required high attention to detail in order to efficiently
          diagnose issues with customer devices. In an effort to improve repair
          times, I wrote an internal document to help train staff; its use lead
          to a significant reduction in repair lead times.
        </p>
      </>
    ),
    roleCV: (
      <>
        <p>
          The positions held at Stormfront Retail were intensely customer
          facing. Uniquely for a retail position, it also required high
          attention to detail in order to efficiently diagnose complex issues
          with customer devices. In an effort to improve repair times, I
          produced an internal training document for colleagues to refer to; its
          use lead to a significant reduction in time taken to complete iPhone
          repairs and replacements.
        </p>
      </>
    ),
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
    roleResume: (
      <>
        <p>
          During my time at The MTC, I was involved in a number of projects,
          such as "Encompass" and "BluePlanet". I additionally held management
          responsibilities for a number of graduates in the team.
        </p>
        <p>
          My involvement in Encompass included full-stack development with a
          Python backend, using [Vanilla] JavaScript; this ignited my passion
          for Web Development. I lead the design and development of the{" "}
          <i>"Integrated Design Decision Support"</i> (IDDS) system that
          interfaced with multiple databases and third parties. In 2019 In 2019
          I had the opportunity to deliver a presentation at an international,
          industry-leading engineering forum in Hannover, Germany.
        </p>
        <p>
          During the course of the BluePlanet project, I developed an Industry
          4.0 (I4.0), Internet of Things (IoT) solution to go on a
          fully-autonomous crop-monitoring rover. Agricultural and telemetry was
          reported data to an AWS instance hosting an IoT dashboarding platform.
        </p>
        <p></p>
      </>
    ),
    roleCV: (
      <>
        <p>
          I am immensely proud of the projects I contributed to at The MTC;
          ranging from Industry 4.0 (I4.0) to Internet of Things (IoT) systems.
          My most notable projects were "Encompass" and "BluePlanet". Later in
          my role, I held management and mentoring roles for a number of
          graduates within the team.
        </p>
        <p>
          My involvement in Encompass included full-stack development with a
          Python backend, using [Vanilla] JavaScript, JQuery, HTML, and CSS. It
          was this project that ignited my passion for Web Development; I lead
          the design and development of the{" "}
          <i>"Integrated Design Decision Support"</i> (IDDS) system that
          interfaced with multiple databases and third-party applications. In
          2019 I had the opportunity to deliver a presentation at an
          international, industry-leading engineering forum in Hannover,
          Germany.
        </p>
        <p>
          During the course of the BluePlanet project, I architected, developed,
          and created an I4.0-IoT solution. A fully-autonomous crop-monitoring
          rover reported agricultural and telemetry data to an AWS instance
          hosting ThingsBoard - an IoT dashboarding platform.
        </p>
        <p>
          In addition to the aforementioned projects, I also produced a Python
          Web-App template which became widely used by my colleagues across the
          department; It became the starting point for numerous projects
          including the <i>"AI Ecosystem"</i> - an internal demonstrator
          platform that collated and showcased the department's capabilities and
          success stories.
        </p>
      </>
    ),
    // Disman Project:
    // The Disman project also involved a web solution that was able to mine data from Inspection report documents and save them to a unified front-end that displayed analytics.
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
    roleResume: (
      <>
        <p>
          I joined AVAMAE in the midst of the pandemic which meant that I had to
          rely heavily on my communication skills to form fast, close
          connections with the team.
        </p>
        <p>
          I quickly established myself as the go-to developer of the project and
          set about improving code robustness, uniformity and readability.
        </p>
        <p>
          I have focussed largely on a number of custom-built React interfaces
          for my client; one of which was written with few comments and no type
          definitions while the others were at least partially typed with
          TypeScript. In my mission to improve the quality of the project, I set
          about converting some 300
          <span className="pre" children=".js" /> and{" "}
          <span className="pre" children=".jsx" /> files to TypeScript (
          <span className="pre" children=".ts" /> and
          <span className="pre" children=".tsx" />
          ). I upgraded the project from a pre-Hooks React and Redux
          (Redux-Compose) ecosystem, to Hook-capable and extensively-typed
          TypeScript solution. One reason I did this was in an effort to help a
          junior engineer get to drips with the project. I set about a plant to
          convert the 300+ files and create the extensive type definitions; all
          while adding new features and functionality and responding to client
          requests.
        </p>
        <p>
          The project itself required a low-latency, high-fidelity user
          interface; capable of streaming realtime updates to the UI and
          frequent state changes.
        </p>
      </>
    ),
    roleCV: (
      <>
        <p>
          Joining AVAMAE was not without its challenges, I joined a new business
          in the midst of the pandemic which meant that I had to rely heavily on
          my communication skills to form fast, close connections with the team.
        </p>
        <p>
          From the beginning I was thrown into a project with a fast-paced
          client with changing priorities. I quickly established myself as the
          go-to developer of the project and within 6 months, I had cemented my
          proficiencies in React, Hooks, Redux, and TypeScript; I began pushing
          both myself and the surrounding team towards improving code
          robustness, uniformity and readability.
        </p>
        <p>
          My time has been split between a number of custom-built React
          interfaces for my client; one of which was written with few comments
          and no type definitions while the others were at least partially typed
          with TypeScript. In my mission to improve the quality of the project,
          I set about converting some 300
          <span className="pre" children=".js" /> and{" "}
          <span className="pre" children=".jsx" /> files to TypeScript (
          <span className="pre" children=".ts" /> and
          <span className="pre" children=".tsx" />
          ). I upgraded the project from a pre-Hooks React and Redux
          (Redux-Compose) ecosystem, to Hook-capable and extensively-typed
          TypeScript solution. There were a number of reasons why I did this,
          chief among which was that a junior engineer joined the team and
          struggled to get to grips with the code. I had long felt that
          TypeScript should be implemented and this catalysed that decision; I
          started small, ensuring that any new components were written in
          TypeScript then set about methodically creating the necessary type
          definitions; all the while adding new features and functionality and
          responding to client requests.
        </p>
        <p>
          The project itself required a low-latency, high-fidelity user
          interface; capable of streaming realtime updates to the UI and
          frequent state changes.
        </p>
      </>
    ),
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
  const cvMode = useAppSelector(CV_MODE);

  return (
    <section>
      <div className="DisplayFlex SmallGap JustifySpaceBetween">
        <h3>Prior Experience</h3>
        <div>{dropdown}</div>
      </div>
      {rolesData.map(
        (job, jobIndex) =>
          job.visible && (
            <div key={`JOB_${jobIndex}`}>
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
              <div className="RoleInfo">
                {cvMode ? job.roleCV : job.roleResume}
              </div>
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
    notableGrades: string[];
  }[];
};

const PAST_EDUCATION: EducationalInstitutions[] = [
  {
    institutionName: "University Of Exeter",
    start: new Date("2013-09-01"),
    end: new Date("2016-06-01"),
    subTitle: "2:1 BSc Physics (Hons.)",
    modules: [
      {
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
        notableGrades: [
          "Mathematics - A*",
          "Further Mathematics - A",
          "Physics - A",
          "Chemistry - C",
        ],
      },
      {
        title: "GCSE",
        notableGrades: [
          "11 A-grades (including English, Maths, all Sciences, and ICT)",
          "3 B-grades",
        ],
      },
    ],
  },
];

/**
 * Education History
 */
const Education: React.FC = () => {
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
          className="RoleParent"
        >
          <ResumeHeading
            heading={institution.institutionName}
            start={institution.start}
            end={institution.end}
          />
          {institution.modules.map((module, moduleIndex) => (
            <React.Fragment key={`EDUCATION_MODULE_${moduleIndex}`}>
              {module.title && <h6>{module.title}</h6>}
              <ul>
                {module.notableGrades.map((grade, gradeIndex) => (
                  <li key={`NOTABLE_GRADE_${gradeIndex}`}>{grade}</li>
                ))}
              </ul>
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
      In my spare time, I'm an avid powerlifter and occasional runner; I find
      that my physical wellbeing has a significant (and direct) impact on my
      mental well-being and professional focus.
    </p>
    <p>
      At home, I have also taken on small-scale programming projects such as:
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
    <p>
      I also enjoy gaming, DIY, and bouldering. In 2024 I rekindled my passion
      for Scuba Diving and completed my PADI Open Water certification; this year
      I intend to attain the Advanced certification.
    </p>
  </section>
);
// Hobbies and Interests - END

// Print page - START
const PrintThisPage: React.FC = () => {
  const cvMode = useAppSelector(CV_MODE);
  return (
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
  );
};
// Print page - START

const formatDate = (date: Date) =>
  date.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
