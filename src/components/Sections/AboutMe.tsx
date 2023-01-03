import { durationFormatter } from "helpers/durationFormatter";
import myImage from "assets/general/me.jpg";
import useMedia from "use-media";
import { TABLET_MIN_WIDTH } from "appHelpers";
import { DATE_OF_BIRTH } from "./keyDates";

// const ClosingTag = () => <span className="ClosingTag">&#x20;&#x2F;&#x3E;</span>;

interface AboutMeProps {}

export const AboutMe: React.FC<AboutMeProps> = () => {
  const largerThanTablet = useMedia(TABLET_MIN_WIDTH);
  const infoClassNames = `InfoText ${
    largerThanTablet ? "LargeText" : "MediumText"
  }`;
  return (
    <div className="SectionInner AboutMeSection">
      <h1 className="CursiveFont">Hi, I'm...</h1>
      <img
        className="MarginAuto"
        src={myImage}
        alt="It's Me, Harrison!"
        height="425"
        width="425"
      />
      <div className="DisplayFlex">
        {/* <div className="XLargeText ImText CursiveFont">I'm &#8230;</div> */}
        <div>
          <div className={infoClassNames}>
            &nbsp;Harrison&nbsp;
            {/* <ClosingTag /> */}
          </div>
          <div className={infoClassNames}>
            &nbsp;
            {durationFormatter({
              start: DATE_OF_BIRTH,
              format: ["years"],
              beSpecific: true,
            })}{" "}
            old&nbsp;
            {/* <ClosingTag /> */}
          </div>
          <div className={infoClassNames}>
            &nbsp;a UK-based Web Developer&nbsp;
            {/* <ClosingTag /> */}
          </div>
        </div>
      </div>
    </div>
  );
};
