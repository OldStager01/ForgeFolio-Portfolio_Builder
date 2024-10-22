import { NavLink } from "react-router-dom";
const tabs = [
  "Personal",
  "Projects",
  "Education",
  "Certifications",
  "Competitions",
  "Courses",
  "Extracurricular",
];

const TABS = tabs.map((tab) => ({
  name: tab,
  link: `/profile/${tab.toLowerCase()}`,
}));

export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <ul className="flex justify-center space-x-4 bg-background text-foreground p-4">
      {TABS.map((tab, index) => (
        <li key={tab.name}>
          <NavLink
            to={`${tab.link}`}
            className={({ isActive }) =>
              `px-3 py-2 rounded-md text-md font-medium border border-slate-400 border-t-0 border-b-0 ${
                isActive
                  ? "bg-black dark:bg-white text-white dark:text-black"
                  : " text-slate-600 hover:bg-gray-100 hover:text-black  "
              }`
            }
            onClick={() => setActiveTab(tab)}
          >
            {tab.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
}
