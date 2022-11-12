import { BsGithub, BsStackOverflow, BsLinkedin } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";
import { useMediaQuery } from "hooks";

const EMAIL_ADDRESS = "h_c_raybould@hotmail.com";
const EMAIL_SUBJECT = "Hi";
const EMAIL_BODY = `Hi Harrison,%0D%0A%0D%0AI just came across your website and I wanted to you regarding`;

const EMAIL_LINK = `mailto:${EMAIL_ADDRESS}`;
const EMAIL_LINK_FULL = `${EMAIL_LINK}?subject=${EMAIL_SUBJECT}&body=${EMAIL_BODY}`;

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
  const isDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  return (
    <div className="ContactSection DisplayFlex FlexColumn">
      {/* Email Shortcut */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div>Feel free to get in touch:</div>
        <div className="TextLink ContactLink">
          <a className="Link" href={EMAIL_LINK_FULL}>
            Contact Me
          </a>
        </div>
      </div>
      {/* Email */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div className="DisplayFlex SmallGap">
          <AiOutlineMail />
          Email:
        </div>
        <div className="TextLink">{EMAIL_ADDRESS}</div>
      </div>
      {/* GitHub */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div className="DisplayFlex SmallGap">
          <BsGithub />
          GitHub:
        </div>
        <div>
          <a className="Link" href="https://github.com/hraybould">
            harrisonr
          </a>
        </div>
      </div>
      {/* LinkedIn */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div className="DisplayFlex SmallGap">
          <BsLinkedin />
          LinkedIn:
        </div>
        <div>
          <a
            className="Link"
            href="https://www.linkedin.com/in/harrison-raybould/"
          >
            harrison-raybould
          </a>
        </div>
      </div>
      {/* Stack Overflow */}
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div className="DisplayFlex SmallGap">
          <BsStackOverflow />
          Stack Overflow:
        </div>
        <div>
          <a
            className="Link"
            href="https://stackoverflow.com/users/15291770/harrison"
          >
            harrison
          </a>
        </div>
      </div>
      {/* <div> */}
      <a href="https://stackoverflow.com/users/15291770/harrison">
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
      </a>
      {/* </div> */}
    </div>
  );
};
