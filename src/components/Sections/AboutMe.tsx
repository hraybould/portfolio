import { durationFormatter } from "helpers/durationFormatter";
import wave from "assets/memoji/wave.png";

interface AboutMeProps {}

const DateOfBirth = new Date("1994-12-16");

export const AboutMe: React.FC<AboutMeProps> = () => {
  return (
    <div>
      <h3>Hi</h3>
      <img src={wave} alt="Memoji of Me, Harrison" />
      <p>I'm Harrison</p>
      <p>
        I'm
        {durationFormatter({ start: DateOfBirth, format: ["years"] })}
      </p>
      <p>I'm a Web Developer from the UK.</p>
    </div>
  );
};
