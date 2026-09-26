import { Shield, type LucideIcon } from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface Props {
  items: {
    id: string;
    title: string;
    path: string;
    icon: LucideIcon;
  }[];
}
const SideBar = ({ items }: Props) => {
  return (
    <div className="lg:pr-8 w-full lg:w-auto hidden lg:block rounded-2xl bg-card shadow-[0_10px_30px_rgba(0,0,0,0.05)] p-5">
      <div className="text-center flex items-center justify-center gap-1 pb-5 border-b border-border text-primary">
        <Shield />
        <h3 className="text-lg font-semibold ">Admin Panel</h3>
      </div>
      <aside className="overflow-y-hidden overflow-x-auto pt-5">
        <ul className="pb-3 lg:pb-0 flex flex-row items-center lg:flex-col lg:items-start gap-2 flex-nowrap w-full ">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id} className="w-full">
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `justify-center lg:justify-start whitespace-nowrap flex-nowrap mb-2 rounded-lg flex gap-2 items-center
                    transition-all duration-300 font-medium text-sm px-3 lg:px-5 py-2
                    ${isActive ? 'text-white bg-primary' : 'text-accent hover:text-white hover:bg-primary'}`
                  }
                >
                  <Icon className="h-5 w-5 " />
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
