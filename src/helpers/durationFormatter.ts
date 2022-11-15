import { formatDuration, intervalToDuration } from "date-fns";

type DurationFormatterArgs = {
  start: Interval["start"];
  end?: Interval["end"];
  format?: (keyof Duration)[];
  delimiter?: string;
  beSpecific?: boolean;
};

type DurationFormatterFunc = (args: DurationFormatterArgs) => string;

export const durationFormatter: DurationFormatterFunc = ({
  start,
  end = new Date(),
  format,
  delimiter,
  beSpecific = false,
}) => {
  const duration = intervalToDuration({
    start,
    end,
  });
  // More than 10 Years, do not specify
  if (
    !beSpecific &&
    format &&
    format.includes("years") &&
    duration.years &&
    duration.years > 9
  ) {
    return "10 + years";
  }
  // More than 5 years, only specify months
  if (
    !beSpecific &&
    format &&
    format.includes("years") &&
    duration.years &&
    duration.years > 4
  ) {
    return formatDuration(duration, { format: ["years"], delimiter });
  }
  return formatDuration(duration, { format, delimiter });
};
