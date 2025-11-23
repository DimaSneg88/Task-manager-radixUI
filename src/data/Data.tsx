import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleBackslashIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
  TimerIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "Backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "Todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "In progress",
    label: "In Progress",
    icon: TimerIcon,
  },
  {
    value: "Done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "Canceled",
    label: "Canceled",
    icon: CircleBackslashIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "Low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "Medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "High",
    icon: ArrowUpIcon,
  },
];
