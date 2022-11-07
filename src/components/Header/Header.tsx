import { Navigation } from "components/Navigation";
import mac from "assets/memoji/mac.png";
import { headerId } from "./models";

export const Header: React.FC<{}> = () => {
  return (
    <header id={headerId}>
      <img className="MeMoji" src={mac} alt="MeMoji Icon of me" />
      <Navigation />
    </header>
  );
};
