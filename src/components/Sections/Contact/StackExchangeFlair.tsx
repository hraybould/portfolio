import useMedia from "use-media";
import { PREFERS_DARK_MODE } from "appHelpers";
import { Link } from "components/Link";

interface StackExchangeFlairProps {
  combined?: boolean;
}

export const StackExchangeFlair: React.FC<StackExchangeFlairProps> = ({
  combined = false,
}) => {
  const isDarkMode = useMedia(PREFERS_DARK_MODE);

  const linkHref = combined
    ? "https://stackexchange.com/users/20819824/harrison"
    : "https://stackoverflow.com/users/15291770/harrison";

  const imgSrc = `${
    combined
      ? "https://stackexchange.com/users/flair/20819824.png"
      : "https://stackoverflow.com/users/flair/15291770.png"
  }?theme=${isDarkMode ? "dark" : "light"}`;

  const imgAlt = combined
    ? "Profile for Harrison on Stack Exchange, a network of free, community-driven Q&amp;A sites"
    : "Profile for Harrison Raybould on Stack Overflow, Q&amp;A for professional and enthusiast programmers";

  const imgTitle = combined
    ? "Profile for Harrison on Stack Exchange, a network of free, community-driven Q&amp;A sites"
    : "Profile for Harrison Raybould on Stack Overflow, Q&amp;A for professional and enthusiast programmers";

  return (
    <Link
      // className="NotForPrinting"
      href={linkHref}
    >
      <img
        className="MarginAuto StackOverflowFlair"
        src={imgSrc}
        width="208"
        height="58"
        alt={imgAlt}
        title={imgTitle}
      />
    </Link>
  );
};
