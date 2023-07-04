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

interface ResumeProps {}

export const Resume: React.FC<ResumeProps> = () => {
  return (
    <div>
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
    </div>
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
      {link ? <Link href={link}>{heading}</Link> : heading}
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
/**
 * Introduction to Resume
 */
const PersonalProfile: React.FC = () => (
  <section>
    <h3>Personal Profile</h3>
    <p>
      I am an enthusiastic, intuitive, and highly motivated React Developer;
      competent in languages such as JavaScript, HTML, and CSS; I also have a
      firm grasp of React, Hooks, Redux, and TypeScript. Being a Physics
      graduate, I have advanced problem solving skills and work with a high
      attention to detail. I enjoy working in a team or independently and have
      great interpersonal skills and experience working in customer/client
      focussed environments.
    </p>
  </section>
);
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
        Rewrote an existing client project from JavaScript to TypeScript,
        providing extensive Type definitions, and converting lifecycle methods
        to Hooks
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
        monitoring.
      </>
    ),
    visible: true,
    sublist: [
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
        visible: false,
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
    visible: true,
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
  // Company name
  companyName: string;
  /** Optional name added because Stormfront changed its name */
  subTitle?: string;
  // description: string
  // Dates
  start: Date;
  end?: Date;
  // Roles in job
  roles: Position[];
  rolesDescription: React.ReactNode;
  // Misc
  visible: boolean;
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

// TODO: Dates and Descriptions
const PREVIOUS_ROLES: JobRole[] = [
  {
    companyName: "Select",
    subTitle: "Formerly: Stormfront Retail",
    start: STARTED_STORMFRONT_RETAIL,
    end: STARTED_MTC,
    roles: [
      {
        positionName: "Team Member",
        end: new Date("2017-03-01"),
      },
      {
        positionName: "Senior Technician",
        start: new Date("2017-03-01"),
      },
    ],
    rolesDescription: (
      <p>
        The positions held at Stormfront Retail were intensely customer facing
        and, uniquely for a retail position, required high attention to detail
        in order to efficiently diagnose issues for customers with their Apple
        devices. In an effort to improve repair times, I personally produced an
        internal training document for colleagues to refer to; known as "The iOS
        Repair Handbook", its use lead to a significant reduction in time taken
        to complete iPhone repairs and replacements.
      </p>
    ),
    visible: true,
    link: "https://uk.selectonline.com/",
  },
  {
    companyName: "The Manufacturing Technology Centre",
    subTitle: "The MTC",
    start: STARTED_MTC,
    end: STARTED_AVAMAE,
    roles: [
      {
        positionName: "Graduate Research Engineer",
        end: new Date("2018-03-01"),
      },
      {
        positionName: "Research Engineer",
        start: new Date("2018-03-01"),
      },
    ],
    rolesDescription: (
      <>
        <p>
          During my time at The MTC, I was involved in a number of projects,
          such as Encompass and BluePlanet. I additionally held management
          resposibilities for a number of graduates in the team.
        </p>
        <p>
          My involvement in Encompass included full-stack development with a
          Python backend, using [Vanilla] JavaScript, JQuery, HTML, and CSS. It
          was this project that ignited my passion for Web Development; I lead
          the design and development of the{" "}
          <i>"Integrated Design Decision Support"</i> (IDDS) system that
          interfaced with multiple databases and external applications. In 2019
          I had the opportunity to deliver a presentation at an industry-leading
          forum in Hannover, Germany.
        </p>
        <p>
          During the course of the BluePlanet project, I architected and
          developed an Industry 4.0, Internet of Things (IoT) solution capable
          of remotely reporting telemetry data from an agriculture monitoring
          rover to an AWS instance hosting ThingsBoard - a IoT dashboarding
          platform.
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
    roles: [
      {
        positionName: "App Engineer",
        end: new Date("2023-04-01"),
      },
      {
        positionName: "Lead Engineer",
        start: new Date("2023-04-01"),
      },
    ],
    rolesDescription: (
      <>
        <p>
          Joining AVAMAE was not without its challenges, I joined a new business
          in the midst of the pandemic which meant that I had to rely heavily on
          my communication skills to form close connections with the team.
        </p>
        <p>
          From the beginning I was thrown into a project with a fast-paced
          client and quickly found myself the go-to developer of the project.
          Within 6 months, I cemented my proficiencies in React, Hooks, Redux,
          and TypeScript and began pushing both myself and the surrounding team
          towards improving code robustness, uniformity and readability.
        </p>
        <p>
          My time has been split between a number of custom-built React
          interfaces for my client; one of which was written with few comments
          and no type definitions while the others were fully typed with
          TypeScript. I used my inittiative and converted{" "}
          <span className="pre">.js</span> and <span className="pre">.jsx</span>{" "}
          files to TypeScript (<span className="pre">.ts</span> and{" "}
          <span className="pre">.tsx</span>). I upgraded the code from pre-Hooks
          React and Redux (Redux-Compose) to being Hook-capable and
          strongly-typed with TypeScript. There were a number of reasons why I
          did this, chief among which was that a junior engineer joined the team
          and struggled to get to grips with the codebase. I had long felt that
          TypeScript should be implemented and this catalysed the
          transformation; I also found it very rewarding being able to support
          someone in my team. Any new components were written in TypeScript and
          I set about providing type definitions and converting the 300+ files;
          all the while adding new features and functionality and responding to
          client requests.
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
  return (
    <section>
      <div className="DisplayFlex SmallGap JustifySpaceBetween">
        <h3>Prior Experience</h3>
        <div>{dropdown}</div>
      </div>
      {rolesData.map(
        (job, jobIndex) =>
          job.visible && (
            <div key={jobIndex}>
              <ResumeHeading
                heading={job.companyName}
                subTitle={job.subTitle}
                link={job.link}
                start={job.start}
                end={job.end}
                flexEvenly={!largerThanTablet}
              />
              {job.roles.map((role, roleIndex) => (
                <ResumeHeading
                  key={roleIndex}
                  heading={role.positionName}
                  start={role.start ?? job.start}
                  end={role.end ?? job.end}
                  smaller
                  flexEvenly={!largerThanTablet}
                />
              ))}
              <div style={{ padding: "1rem 0rem" }}>{job.rolesDescription}</div>
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
        <div key={institutionIndex} style={{ padding: "0.5rem 0" }}>
          <ResumeHeading
            heading={institution.institutionName}
            start={institution.start}
            end={institution.end}
          />
          {institution.modules.map((module, moduleIndex) => (
            <React.Fragment key={moduleIndex}>
              {module.title && <h6>{module.title}</h6>}
              <ul>
                {module.notableGrades.map((grade, gradeIndex) => (
                  <li key={gradeIndex}>{grade}</li>
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
      that my physical wellbeing has a significant and direct impact on my
      mental wellbeing and professional focus.
    </p>
    <p>
      At home, I have also taken on small-scale programming projects such as:
    </p>
    <ul>
      <li>A smart thermostat controlled by a Node-Red on RaspberryPi</li>
      <li>An Eisenhower Matrix iOS app written in Swift</li>
      <li>
        A homemade Network-Attached Storage (NAS) device for sharing files
        within my local Wi-Fi network
      </li>
    </ul>
    <p>I also enjoy gaming, doing DIY, and bouldering.</p>
  </section>
);
// Hobbies and Interests - END

const formatDate = (date: Date) =>
  date.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
