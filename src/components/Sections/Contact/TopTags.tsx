import { PREFERS_DARK_MODE } from "appHelpers";
import { Link } from "components/Link";
import useMedia from "use-media";

const TOP_TAGS: string[][] = [
  ["javascript", "reactjs", "typescript"],
  ["css", "html"],
];

interface TopTagsProps {}

export const TopTags: React.FC<TopTagsProps> = () => {
  const isDarkMode = useMedia(PREFERS_DARK_MODE);

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
