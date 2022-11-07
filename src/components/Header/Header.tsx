import { Navigation } from "components/Navigation";
import wave from "assets/memoji/wave.png";
import { headerId } from "./models";

export const Header: React.FC<{}> = () => {
  return (
    <header id={headerId}>
      <img className="MeMoji" src={wave} alt="MeMoji Icon of me" />
      <Navigation />
    </header>
  );
};
