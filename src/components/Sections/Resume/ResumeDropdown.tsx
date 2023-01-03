import { useState } from "react";
import ReactSelect from "react-select";

type DropdownOption<ValueType = any, IdType = string> = {
  id: IdType;
  label: string | React.ReactNode;
  value: ValueType;
};

type ResumeOrdering = "asc" | "desc";

const OPTIONS: DropdownOption<ResumeOrdering, string>[] = [
  {
    id: "asc",
    value: "asc",
    label: "Ascending",
  },
  { id: "desc", value: "desc", label: "Descending" },
];

interface ResumeDropdownProps {
  value: DropdownOption | undefined;
  options: DropdownOption[];
  callback: (newValue: DropdownOption | null) => void;
}

export const ResumeDropdown: React.FC<ResumeDropdownProps> = ({
  value,
  options,
  callback,
}) => {
  return (
    <ReactSelect
      className="CustomReactSelectContainer NotForPrinting"
      classNamePrefix="CustomReactSelect"
      isSearchable={false}
      value={value}
      options={options}
      onChange={callback}
    />
  );
};

export function useResumeDropdown<T extends { start: Date }[]>(
  arr: T,
  initialValue: ResumeOrdering = "desc"
): [T, React.ReactNode] {
  const [roleOrder, setRoleOrder] = useState<ResumeOrdering>(initialValue);
  const sortedArray = arr.sort((a, b) =>
    roleOrder === "asc"
      ? a.start.valueOf() - b.start.valueOf()
      : b.start.valueOf() - a.start.valueOf()
  );
  return [
    sortedArray,
    <ResumeDropdown
      value={OPTIONS.find((option) => option.value === roleOrder)}
      options={OPTIONS}
      callback={(newValue) => {
        if (newValue) {
          setRoleOrder(newValue.value);
        }
      }}
    />,
  ];
}
