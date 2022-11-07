const emailAddres = "h_c_raybould@hotmail.com";
const emailSubject = "Hi";
const emailBody = `Hi Harrison,%0D%0A%0D%0AI just came across your website and I wanted to you regarding`;

const emailLinkHref = `mailto:${emailAddres}`;
const emailLinkFull = `${emailLinkHref}?subject=${emailSubject}&body=${emailBody}`;

interface ContactProps {}

export const Contact: React.FC<ContactProps> = () => {
  return (
    <div className="ContactSection">
      <p>Fell free to get in touch, click the link below.</p>

      <a className="Link ContactLink" href={emailLinkFull}>
        Contact Me
      </a>

      <p>Email:</p>
      <p
      // className="TextLink"
      >
        {emailAddres}
      </p>
      {/* <a className="Link" href={emailLinkHref}>
        {emailAddres}
      </a> */}
    </div>
  );
};
