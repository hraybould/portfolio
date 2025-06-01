import { BsGithub, BsStackOverflow, BsLinkedin } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { Link } from "components/Link";
import { useState, useEffect, useRef } from "react";
import { TimeoutRef } from "topLevelModels";
import Popup from "reactjs-popup";
import { PopupActions } from "reactjs-popup/dist/types";
import { StackExchangeFlair } from "./StackExchangeFlair";
// import { TopTags } from "./TopTags";

const EMAIL_ADDRESS = "h_c_raybould@hotmail.com";
const EMAIL_SUBJECT = "Hi";
const EMAIL_BODY = `Hi Harrison,%0D%0A%0D%0AI just came across your website and wanted to contact you regarding`;

const EMAIL_LINK = `mailto:${EMAIL_ADDRESS}`;
const EMAIL_LINK_FULL = `${EMAIL_LINK}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
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
            additionalClassNames="NoTextDecoration"
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
                <HiOutlineClipboardCopy className="Icon" />
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
            // printableLink
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
            // printableLink
          >
            harrison-raybould
          </Link>
        </div>
      </div>
      {/* Stack Exchange / Stack Overflow */}
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
            // printableLink
          >
            harrison
          </Link>
        </div>
      </div>
      <div className="DisplayFlex FlexColumn SmallGap">
        <StackExchangeFlair combined />
        {/*
          NOTE: Tag Leagues is currently down, disabled until this is back up
          SEE: https://github.com/johannchopin/stackoverflow-readme-profile/issues/31 

          Different Question: https://meta.stackexchange.com/questions/361001/get-your-position-in-tag-league-top-x
          Working Query?      https://data.stackexchange.com/stackoverflow/query/50844/what-percentile-am-i-in-for-a-given-tag
        */}
        {/* <TopTags /> */}
      </div>
    </div>
  );
};
