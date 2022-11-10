const emailAddres = "h_c_raybould@hotmail.com";
const emailSubject = "Hi";
const emailBody = `Hi Harrison,%0D%0A%0D%0AI just came across your website and I wanted to you regarding`;

const emailLinkHref = `mailto:${emailAddres}`;
const emailLinkFull = `${emailLinkHref}?subject=${emailSubject}&body=${emailBody}`;

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
  return (
    <div className="ContactSection">
      <div className="DisplayFlex JustifySpaceBetween">
        <div>Feel free to get in touch:</div>
        <div className="TextLink">
          <a className="Link ContactLink" href={emailLinkFull}>
            Contact Me
          </a>
        </div>
      </div>

      <div className="DisplayFlex JustifySpaceBetween">
        <div>Email:</div>
        <div className="TextLink">{emailAddres}</div>
      </div>
    </div>
  );
};
