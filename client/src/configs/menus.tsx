import {
  ChartColumnIncreasing,
  CircleGauge,
  FileBox,
  FileText,
  ShieldX,
  Table2,
} from "lucide-react";

const menus = [
  {
    name: "sidebar.dashboard",
    icon: <CircleGauge className="h-[18px] w-[18px]" />,
    route: "/dashboard",
  },
  // {
  //   name: "sidebar.form",
  //   icon: <FileText className="h-[18px] w-[18px]" />,
  //   route: "/forms",
  // },
  {
    name: "sidebar.table",
    icon: <Table2 className="h-[18px] w-[18px]" />,
    route: "/table",
  },
  // {
  //   name: "sidebar.charts",
  //   icon: <ChartColumnIncreasing className="h-[18px] w-[18px]" />,
  //   route: "/charts",
  // },
  // {
  //   name: "sidebar.errPages",
  //   icon: <ShieldX className="h-[18px] w-[18px]" />,
  //   route: "error-pages",
  //   childs: [
  //     {
  //       name: "404 page",
  //       icon: <ShieldX className="h-[18px] w-[18px]" />,
  //       route: "404",
  //     },
  //     {
  //       name: "500 page",
  //       icon: <ShieldX className="h-[18px] w-[18px]" />,
  //       route: "500",
  //     },
  //   ],
  // },
  // {
  //   name: "sidebar.modals",
  //   icon: <FileBox className="h-[18px] w-[18px]" />,
  //   route: "/modals",
  // },
];

export default menus;
