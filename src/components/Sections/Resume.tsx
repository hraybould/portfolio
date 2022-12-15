import { format } from "date-fns";
import React, { useState } from "react";
import {
  STARTED_AVAMAE,
  STARTED_MTC,
  STARTED_STORMFRONT_RETAIL,
} from "./keyDates";
import { Link } from "components/Link";

interface ResumeProps {}

export const Resume: React.FC<ResumeProps> = () => {
  return (
    <div>
      {/* Personal Profile */}
      <PersonalProfile />
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
}

const ResumeHeading: React.FC<ResumeHeadingProps> = ({
  heading,
  subTitle,
  link,
  start,
  end,
  smaller = false,
}) => {
  const headingContent = (
    <>
      {link ? <Link href={link}>{heading}</Link> : heading}
      {subTitle && (
        <>
          {" "}
          {/* Breakable space needed above */}
          <em className="XSmallText Italics DisplayInlinBlock">({subTitle})</em>
        </>
      )}
    </>
  );

  const datesContent = (
    // non-breaking-space before to keep " -" before breaking to a new line
    <div className="RoleDate">
      {format(start, "MMM yyyy")}&nbsp;-{" "}
      {end ? format(end, "MMM yyyy") : "Present"}
    </div>
    // <>
    //   <div className="DisplayInlinBlock">{format(start, "MMM yyyy")}</div>
    //   &nbsp;- <div className="DisplayInlinBlock">{format(end, "MMM yyyy")}</div>
    // </>
  );

  return (
    <div className="DisplayFlex SmallGap FlexEvenly JustifySpaceBetween">
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
      competent in languages such as JavaScript, HTML, and CSS, and Python. I
      have a firm grasp of React, Hooks, Redux, and TypeScript. Being a Physics
      graduate, I have advanced problem solving skills and work with a high
      attention to detail. I enjoy working in a team or independently and have
      great interpersonal skills and experience working in customer/client
      focussed environments.
    </p>
  </section>
);
// Personal Profile - END

// Key Achievements - START

type KeyAchievement = {
  achievement: React.ReactNode;
  subAchievements?: KeyAchievement[];
  visible: boolean;
};
const KEY_ACHIEVEMENTS: KeyAchievement[] = [
  {
    achievement: (
      <>
        Rewrote an existing client project from JavaScript to TypeScript with
        extensive Types and Hooks
      </>
    ),
    visible: true,
  },
  {
    achievement: (
      <>
        Represented The Manufacturing Technology Centre (The MTC) at the
        International Conference on Additive Manufacturing, EMO Hannover 2019
      </>
    ),
    visible: true,
  },
  {
    achievement: (
      <>
        Lead development in key projects at The MTC such as: Additive
        Manufacturing (AM), and low-cost Industry 4.0 condition monitoring.
      </>
    ),
    subAchievements: [
      {
        achievement: <>Obtained Level 1 Vibration Analyst from RMS Solutions</>,
        visible: false,
      },
      {
        achievement: (
          <>
            Early completion of The MTC Graduate Program, transferring from the
            2-year scheme within the first 6 months
          </>
        ),
        visible: false,
      },
    ],
    visible: true,
  },
  {
    achievement: (
      <>
        Halved the time in which a repair could be processed and completed as a
        Senior Technician at Select (formerly Stormfront Retail)
      </>
    ),
    visible: true,
  },
  {
    achievement: (
      <>Graduated from Exeter University with a 2:1 BSc Physics (Hons.)</>
    ),
    visible: true,
  },
  {
    achievement: (
      <>
        Gained 4 full A-Levels: A*, A, A, C, from Arthur Terry School and Sixth
        Form
      </>
    ),
    visible: false,
  },
];

interface ListAchievementsProps {
  achievements: KeyAchievement[];
}
const ListAchievements: React.FC<ListAchievementsProps> = ({
  achievements,
}) => {
  if (!achievements.some((value) => value.visible)) {
    return null;
  }
  return (
    <ul>
      {achievements.map(
        (achievement, achievementIndex) =>
          achievement.visible && (
            <React.Fragment key={achievementIndex}>
              <li>{achievement.achievement}</li>
              {achievement.subAchievements && (
                <ListAchievements achievements={achievement.subAchievements} />
              )}
            </React.Fragment>
          )
      )}
    </ul>
  );
};

/**
 * Summary of key achievements over recent years
 */
const KeyAchievements: React.FC = () => (
  <section>
    <h3>Key Achievements</h3>
    <ListAchievements achievements={KEY_ACHIEVEMENTS} />
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
        and for a retail position and required high attention to detail in order
        to efficiently diagnose issues for customers with their Apple devices.
        In an effort to improve repair times, I personally produced an internal
        training document for colleagues to refer to; known as "The iOS Repair
        Handbook", its use lead to a significant reduction in time taken to
        complete iPhone repairs and replacements.
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
          such as Encompass and BluePlanet
        </p>
        <p>
          My involvement in Encompass included full-stack development with a
          Python backend, using Vanilla JavaScript, JQuery, HTML, and CSS. It
          was this project that ignited my passion for Web Development; I lead
          the design and development of the Integrated Design Decision Support
          (IDDS) system that interfaced with a multitude of databases and
          external applications. I then had the opportunity to deliver a
          presentation at EMO Hannover in 2019.
        </p>
        <p>
          During the course of the BluePlanet project, I architected an Industry
          4.0, Internet of Things (IoT) solution capable of remotely reporting
          telemetry data from an agriculture monitoring rover to an AWS instance
          hosting ThingsBoard - a IoT dashboarding platform.
        </p>
        <p>
          In addition to the aforementioned projects, I also produced a Python
          Web-App template which became widely used by my colleagues across the
          department; It became the starting point for numerous projects
          including the "AI Ecosystem" - an internal demonstrator platform that
          compiled demonstrators showcasing the department's capabilities and
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
      },
    ],
    rolesDescription: (
      <>
        <p>
          Joining AVAMAE was not without its challenges. I joined a new
          business, in the midst of the pandemic, with little formal experience
          of React beyond my own learning. I was thrown into a project with a
          fast-paced client and quickly found myself the go-to developer of the
          project. Within 6 months my proficiencies in React, Hooks, Redux, and
          TypeScript cemented and I found myself pushing myself and the
          surrounding team towards a more robust way of working.
        </p>
        <p>
          My time has been split between a number of custom-built interfaces for
          my client. One of which was a JavaScript-React application, with few
          comments and no types. I took it upon myself to pain-stakingly convert{" "}
          <pre>.js</pre> and <pre>.jsx</pre> files to TypeScript (<pre>.ts</pre>{" "}
          and <pre>.tsx</pre>). I upgraded the code from pre-Hooks React and
          Redux (Redux-Compose) to being Hook-capable and strongly-typed. There
          were a number of reasons why I did this, chief among which was that a
          junior engineer joined the team and instantly struggled to get to
          grips with the code. I had long felt that TypeScript should be
          implemented on that application and this sparked the beginning of the
          transformation. Any new components were to be written in TypeScript
          and I set about converting the 300-odd files.
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
  // TODO:
  //  - dropdown to setRoleOrder
  // IDEA:
  //  - timeline slider alongside roles to show dates
  const [roleOrder, setRoleOrder] = useState<"asc" | "desc">("desc");
  const rolesData = PREVIOUS_ROLES.sort((a, b) =>
    roleOrder === "asc"
      ? a.start.valueOf() - b.start.valueOf()
      : b.start.valueOf() - a.start.valueOf()
  );
  return (
    <section>
      <h3>Prior Experience</h3>
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
              />
              {job.roles.map((role, roleIndex) => (
                <React.Fragment key={roleIndex}>
                  <ResumeHeading
                    heading={role.positionName}
                    start={role.start ?? job.start}
                    end={role.end ?? job.end}
                    smaller
                  />
                </React.Fragment>
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
    start: new Date("01-09-2013"),
    end: new Date("01-06-2016"),
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
    start: new Date("01-09-2006"),
    end: new Date("01-06-2013"),
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
const Education: React.FC = () => (
  <section>
    <h3>Education</h3>
    {PAST_EDUCATION.map((institution, institutionIndex) => (
      <div key={institutionIndex} style={{ padding: "0.5rem 0" }}>
        <ResumeHeading
          heading={institution.institutionName}
          start={institution.start}
          end={institution.end}
        />
        {institution.modules.map((module, moduleIndex) => (
          <React.Fragment key={moduleIndex}>
            {module.title && <h5>{module.title}</h5>}
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
// Education History - END

// Hobbies and Interests - START
/**
 * Hobbies and Interests
 */
const HobbiesAndInterests: React.FC = () => (
  <section>
    <h3>Hobbies and Interests</h3>
    <p>
      In my spare time I am an avid Powerlifter and occasional runner; I find
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
    <p>I also enjoy gaming on my PlayStation and doing DIY around the house.</p>
  </section>
);
// Hobbies and Interests - END
