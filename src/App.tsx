import { MODAL_PORTAL_ID } from "appHelpers";
import { Header } from "components/Header";
import Sections from "components/Sections";
import { useSetupPrintTitle } from "hooks";

const App: React.FC = () => {
  useSetupPrintTitle();

  return (
    <div className="App">
      <Header />
      <Sections />
      <div id={MODAL_PORTAL_ID} className="ModalPortal" />
    </div>
  );
};

export default App;
