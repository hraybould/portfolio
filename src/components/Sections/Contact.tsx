import { BsGithub, BsStackOverflow, BsLinkedin } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import useMedia from "use-media";
import { Link } from "components/Link";
import { useState, useEffect, useRef } from "react";
import { TimeoutRef } from "topLevelModels";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
// Not importing style as it doesn't work well with Dark Mode
// import "reactjs-popup/dist/index.css";

const EMAIL_ADDRESS = "h_c_raybould@hotmail.com";
const EMAIL_SUBJECT = "Hi";
const EMAIL_BODY = `Hi Harrison,%0D%0A%0D%0AI just came across your website and I wanted to you regarding`;

const EMAIL_LINK = `mailto:${EMAIL_ADDRESS}`;
const EMAIL_LINK_FULL = `${EMAIL_LINK}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
  // Check if user prefers dark mode - for Stack Overflow flair
  const isDarkMode = useMedia("(prefers-color-scheme: dark)");

  // ReactJS-Popup does not have fully working controlled state
  // Automatically close the modal after it opens
  const timeout = useRef<TimeoutRef>(null);
  const popupRef = useRef<PopupActions | null>(null);
  const [popUpOpen, setPopUpOpen] = useState<boolean>(false);
  useEffect(() => {
    const currentTimeout = timeout.current;
    if (currentTimeout) {
      clearTimeout(currentTimeout);
    }
    if (popUpOpen) {
      timeout.current = setTimeout(() => {
        setPopUpOpen(false);
        popupRef.current?.close();
      }, 2500);
    }
    // Cleanup on unmount
    return () => {
      if (currentTimeout) {
        clearTimeout(currentTimeout);
      }
    };
  }, [popUpOpen]);

  return (
    <div className="ContactSection DisplayFlex FlexColumn">
      {/* Email Shortcut */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div>Get in touch with me:</div>
        <div className="Btn ContactLink">
          <Link
            href={EMAIL_LINK_FULL}
            style={{ textDecoration: "none" }}
            hoverable={false}
          >
            Contact Me
          </Link>
        </div>
      </div>
      {/* Email */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div className="DisplayFlex SmallGap">
          <AiOutlineMail className="LargeText Icon" />
          Email:
        </div>
        <div className="TextLink DisplayFlex SmallGap">
          {EMAIL_ADDRESS}
          <Popup
            ref={popupRef}
            onOpen={() => {
              navigator.clipboard.writeText(EMAIL_ADDRESS);
              console.debug("Copied!");
              setPopUpOpen(true);
            }}
            trigger={
              <span className="Btn NoBorder LargeText">
                <HiOutlineClipboardCopy className={"Icon"} />
              </span>
            }
            position={["bottom center", "top center"]}
            repositionOnResize
            closeOnDocumentClick
          >
            <span>Copied!</span>
          </Popup>
        </div>
      </div>
      {/* GitHub */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div className="DisplayFlex SmallGap">
          <BsGithub className="LargeText Icon" />
          GitHub:
        </div>
        <div>
          <Link href="https://github.com/hraybould">harrisonr</Link>
        </div>
      </div>
      {/* LinkedIn */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div className="DisplayFlex SmallGap">
          <BsLinkedin className="LargeText Icon" />
          LinkedIn:
        </div>
        <div>
          <Link href="https://www.linkedin.com/in/harrison-raybould/">
            harrison-raybould
          </Link>
        </div>
      </div>
      {/* Stack Overflow */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div className="DisplayFlex SmallGap">
          <BsStackOverflow className="LargeText Icon" />
          Stack Overflow:
        </div>
        <div>
          <Link href="https://stackoverflow.com/users/15291770/harrison">
            harrison
          </Link>
        </div>
      </div>
      {/* <div> */}
      <Link href="https://stackoverflow.com/users/15291770/harrison">
        <img
          className="MarginAuto"
          src={`https://stackoverflow.com/users/flair/15291770.png?theme=${
            isDarkMode ? "dark" : "light"
          }`}
          width="208"
          height="58"
          alt="Profile for Harrison at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
          title="Profile for Harrison at Stack Overflow, Q&amp;A for professional and enthusiast programmers"
        />
      </Link>

      {/* </div> */}
    </div>
  );
};
