import { durationFormatter } from "helpers/durationFormatter";
import wave from "assets/memoji/wave.png";

interface AboutMeProps {}

const DateOfBirth = new Date("1994-12-16");

export const AboutMe: React.FC<AboutMeProps> = () => {
  return (
    <div className="AboutMeSection">
      <h3 className="HiText LargeText CursiveFont">Hi</h3>
      <img src={wave} alt="Memoji of Me, Harrison" />
      <div className="DisplayFlex">
        <div className="ImText CursiveFont LargeText">I'm</div>
        <div>
          <h3>Harrison</h3>
          <div>
            {durationFormatter({ start: DateOfBirth, format: ["years"] })} old
          </div>
          <div>a UK-based Web Developer</div>
        </div>
      </div>
    </div>
  );
};
