import {
  Duration,
  Interval,
  formatDuration,
  intervalToDuration,
} from "date-fns";

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
  if (!beSpecific && format && format.includes("years") && duration.years) {
    if (duration.years >= 10) {
      // More than 10 Years, do not specify
      return "10+ years";
    } else if (duration.years >= 5) {
      // More than 5 years, don't specify months
      return formatDuration(duration, { format: ["years"], delimiter });
    } else if (duration.years >= 3 && duration.months && duration.months >= 6) {
      // More than 3.5 years, round up and don't specify months
      return formatDuration(
        {
          years: duration.years + 1,
        },
        { format: ["years"], delimiter }
      );
    }
  }
  // Return fallback
  return formatDuration(duration, { format, delimiter });
};
