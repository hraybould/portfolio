import { Link } from "components/Link";

interface ResumeHeadingProps {
  heading: string;
  subTitle?: string;
  link?: string;
  start: Date;
  end?: Date;
  smaller?: boolean;
  flexEvenly?: boolean;
}

export const ResumeHeading: React.FC<ResumeHeadingProps> = ({
  heading,
  subTitle,
  link,
  start,
  end,
  smaller = false,
  flexEvenly = false,
}) => {
  const headingContent = (
    <>
      {link ? (
        <Link href={link} noPrintDecoration>
          {heading}
        </Link>
      ) : (
        heading
      )}
      {subTitle && (
        <>
          {" "}
          {/* Breakable space needed above for a better look when wrapping */}
          <em className="XSmallText Italics DisplayInlinBlock">({subTitle})</em>
        </>
      )}
    </>
  );

  const datesContent = (
    // non-breaking-space before to keep " -" before breaking to a new line
    <div className="RoleDate">
      <span>{formatDate(start)}&nbsp;-</span>{" "}
      <span>{end ? formatDate(end) : "Present"}</span>
    </div>
  );

  return (
    <div
      className={`DisplayFlex SmallGap ${
        flexEvenly ? "FlexEvenly" : ""
      } JustifySpaceBetween`}
    >
      <div className="RoleTitle">
        {smaller ? headingContent : <h5>{headingContent}</h5>}
      </div>
      <div>{smaller ? datesContent : <h5>{datesContent}</h5>}</div>
    </div>
  );
};

const formatDate = (date: Date) =>
  date.toLocaleString("default", {
    month: "short",
    year: "numeric",
  });
