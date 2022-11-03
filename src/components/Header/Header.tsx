import { Navigation } from "components/Navigation";
import wave from "assets/memoji/wave.png";

export const Header: React.FC<{}> = () => {
  return (
    <header>
      <img className="MeMoji" src={wave} alt="MeMoji Icon of me" />
      <Navigation />
    </header>
  );
};
