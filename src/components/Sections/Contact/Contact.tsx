import { BsGithub, BsStackOverflow, BsLinkedin } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import useMedia from "use-media";
import { Link } from "components/Link";
import { useState, useEffect, useRef } from "react";
import { TimeoutRef } from "topLevelModels";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import { PREFERS_DARK_MODE } from "appHelpers";
// Not importing style as it doesn't work well with Dark Mode
// import "reactjs-popup/dist/index.css";

const EMAIL_ADDRESS = "h_c_raybould@hotmail.com";
const EMAIL_SUBJECT = "Hi";
const EMAIL_BODY = `Hi Harrison,%0D%0A%0D%0AI just came across your website and wanted to contact you regarding`;

const EMAIL_LINK = `mailto:${EMAIL_ADDRESS}`;
const EMAIL_LINK_FULL = `${EMAIL_LINK}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
  // Check if user prefers dark mode - for Stack Overflow flair
  const isDarkMode = useMedia(PREFERS_DARK_MODE);

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
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth NotForPrinting">
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
              <span className="Btn NoBorder LargeText NotForPrinting">
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
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth NotForPrinting">
        <div className="DisplayFlex SmallGap">
          <BsGithub
            className="LargeText Icon"
            title="A link to Harrison Raybould GitHub profile"
          />
          GitHub:
        </div>
        <div className="RightAligned">
          <Link
            href="https://github.com/hraybould"
            noPrintDecoration
            printableLink
          >
            harrisonr
          </Link>
        </div>
      </div>
      {/* LinkedIn */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div className="DisplayFlex SmallGap">
          <BsLinkedin
            className="LargeText Icon"
            title="Connect with Harrison Raybould's LinkedIn profile"
          />
          LinkedIn:
        </div>
        <div className="RightAligned">
          <Link
            href="https://www.linkedin.com/in/harrison-raybould/"
            noPrintDecoration
            printableLink
          >
            harrison-raybould
          </Link>
        </div>
      </div>
      {/* Stack Overflow */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth NotForPrinting">
        <div className="DisplayFlex SmallGap">
          <BsStackOverflow
            className="LargeText Icon"
            title="Harrison Raybould's Stack Overflow profile"
          />
          Stack Overflow:
        </div>
        <div className="RightAligned">
          <Link
            href="https://stackoverflow.com/users/15291770/harrison"
            noPrintDecoration
            printableLink
          >
            harrison
          </Link>
        </div>
      </div>
      <div className="DisplayFlex FlexColumn SmallGap NotForPrinting">
        {/* <Link href="https://stackoverflow.com/users/15291770/harrison">
        <img
        className="MarginAuto StackOverflowFlair"
          src={`https://stackoverflow.com/users/flair/15291770.png?theme=${
            isDarkMode ? "dark" : "light"
          }`}
          width="208"
          height="58"
          alt="Profile for Harrison Raybould on Stack Overflow, Q&amp;A for professional and enthusiast programmers"
          title="Profile for Harrison Raybould on Stack Overflow, Q&amp;A for professional and enthusiast programmers"
          />
        </Link> */}
        <Link href="https://stackexchange.com/users/20819824/harrison">
          <img
            className="MarginAuto StackOverflowFlair"
            src={`https://stackexchange.com/users/flair/20819824.png?theme=${
              isDarkMode ? "dark" : "light"
            }`}
            width="208"
            height="58"
            alt="Profile for Harrison on Stack Exchange, a network of free, community-driven Q&amp;A sites"
            title="Profile for Harrison on Stack Exchange, a network of free, community-driven Q&amp;A sites"
          />
        </Link>
        <TopTags isDarkMode={isDarkMode} />
      </div>
    </div>
  );
};

const TOP_TAGS: string[][] = [
  ["javascript", "reactjs", "typescript"],
  ["css", "html"],
];

interface TopTagsProps {
  isDarkMode: boolean;
}
const TopTags: React.FC<TopTagsProps> = ({ isDarkMode }) => {
  return (
    <>
      {TOP_TAGS.map((group, i) => (
        <div
          key={`TOP_TAGS_GROUP_${i}`}
          className="DisplayFlex FlexRow SmallGap"
        >
          {group.map((tag, j) => (
            <div key={`TOP_TAGS_${i}_${tag}_${j}`}>
              <Link href="https://stackoverflow-readme-profile.vercel.app/tags-league/css/users/15291770">
                <img
                  className="TopTagImg"
                  // style={{ height: 34, padding: 1 }}
                  src={`https://stackoverflow-readme-profile.johannchopin.fr/tags-league-ranking/${tag}/15291770?theme=${
                    isDarkMode ? "dark" : "graywhite"
                  }`}
                  alt={`Harrison's SO ranking for ${tag}`}
                />
              </Link>
            </div>
          ))}
        </div>
      ))}
    </>
  );
};
