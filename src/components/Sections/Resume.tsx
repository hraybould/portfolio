import { format } from "date-fns";
import React from "react";
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
  end: Date;
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
      {subTitle && <em className="XSmallText Italics">&nbsp;({subTitle})</em>}
    </>
  );

  const datesContent = (
    <>
      {format(start, "MMM yyyy")}&nbsp;-&nbsp;{format(end, "MMM yyyy")}
    </>
  );

  return (
    <div className="DisplayFlex JustifySpaceBetween">
      {smaller ? <div>{headingContent}</div> : <h5>{headingContent}</h5>}
      {smaller ? <div>{datesContent}</div> : <h5>{datesContent}</h5>}
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
      competent in languages such as JavaScript, HTML, and CSS, and Python I
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
        Represented The Manufacturing Technology Centre (MTC) at the
        International Conference on Additive Manufacturing, EMO Hannover 2019
      </>
    ),
    visible: true,
  },
  {
    achievement: (
      <>
        Lead development in key areas of projects in areas such as: Additive
        Manufacturing (AM) and low-cost Industry 4.0 condition monitoring.
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
        Senior Technician at Stormfront Retail
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
    visible: true,
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
  end: Date;
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
        The positions held at Stormfront Retail were intensly customer facing
        and required high attention to detail in order to efficiently diagnose
        issues for customers with their Apple devices. In an effort to improve
        repair times, I personally produced an internal training document for
        colleagues to refer to; known as "The iOS Repair Handbook" it use lead
        to a significant reduction in time taken to complete iPhone repairs and
        replacements.
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
          During my time at The MTC, I have been involved in a number of
          projects, such as BluePlanet and Encompass
        </p>
        <p>
          For the BluePlanet project, I architected an Industry 4.0, Internet of
          Things (IoT) solution capable of remotely reporting telemetry data to
          an AWS instance hosting ThingsBoard, a IoT dashboarding platform.
        </p>
        <p>
          My involvement in Encompass included full-stack development with
          Python, JavaScript, HTML, and CSS. I lead the design and development
          of the Integrated Design Decision Support (IDDS) system that
          interfaced with databases and external applications. I then had the
          opportunity to deliver a presentation at EMO Hannover in 2019.
        </p>
        <p>
          In addition to the aforementioned projects, I also produced a Python
          Web-App template; it became widely used by the department in numerous
          projects including the "AI Ecosystem" - an internal demonstrator
          platform that compiled demonstrators showcasing the department's
          capabilities and successes.
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
    end: new Date(),
    roles: [
      {
        positionName: "App Engineer",
      },
    ],
    rolesDescription: "",
    visible: true,
    link: "https://www.avamae.co.uk/",
  },
];

/**
 * Previous jobs
 */
const PriorExperience: React.FC = () => (
  <section>
    <h3>Prior Experience</h3>
    {PREVIOUS_ROLES.map(
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
            <p style={{ padding: "1rem 0rem" }}>{job.rolesDescription}</p>
          </div>
        )
    )}
  </section>
);
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
    end: new Date("01-09-2013"),
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
      In my spare time I am an avid Powerlifter and I occasionally run; I find
      that my physical wellbeing has a significant and direct impact on my
      mental wellbeing and professional focus.
    </p>
    <p>
      At home, I have also taken on small-scale programming projects such as:
    </p>
    <ul>
      <li>A smart thermostat controlled by a Node-Red on RaspberryPi</li>
      <li>An Eisenhower Matrix iOS app written in Swift</li>
      <li>{/* TODO: THERE REALLY SHOULD BE ANOTHER POINT */}</li>
    </ul>
    <p>I also enjoy gaming on my PlayStation and doing DIY around the house.</p>
  </section>
);
// Hobbies and Interests - END
