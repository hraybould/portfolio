import { formatDuration, intervalToDuration } from "date-fns";

type DurationFormatterArgs = {
  start: Interval["start"];
  end?: Interval["end"];
  format?: (keyof Duration)[];
  delimiter?: string;
};
type DurationFormatterFunc = (args: DurationFormatterArgs) => string;
export const durationFormatter: DurationFormatterFunc = ({
  start,
  end = new Date(),
  format,
  delimiter,
}) =>
  formatDuration(
    intervalToDuration({
      start,
      end,
    }),
    { format, delimiter }
  );
