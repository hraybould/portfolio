import { BsGithub, BsStackOverflow, BsLinkedin } from "react-icons/bs";
import { AiOutlineMail } from "react-icons/ai";

const emailAddres = "h_c_raybould@hotmail.com";
const emailSubject = "Hi";
const emailBody = `Hi Harrison,%0D%0A%0D%0AI just came across your website and I wanted to you regarding`;

const emailLinkHref = `mailto:${emailAddres}`;
const emailLinkFull = `${emailLinkHref}?subject=${emailSubject}&body=${emailBody}`;

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
  return (
    <div className="ContactSection DisplayFlex FlexColumn">
      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div>Feel free to get in touch:</div>
        <div className="TextLink ContactLink">
          <a className="Link" href={emailLinkFull}>
            Contact Me
          </a>
        </div>
      </div>

      <div className="DisplayFlex FlexRow SmallGap JustifySpaceBetween FullWidth">
        <div className="DisplayFlex SmallGap">
          <AiOutlineMail />
          Email:
        </div>
        <div className="TextLink">{emailAddres}</div>
      </div>

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
    </div>
  );
};
