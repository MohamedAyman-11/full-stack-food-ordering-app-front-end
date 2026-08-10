import { Pages, Routes } from "@/constants";
import { NavLink } from "react-router-dom";
import { Button, buttonVariants } from "../ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const NAVBAR_DATA = [
  {
    id: crypto.randomUUID(),
    title: "Menu",
    path: Routes.MENU,
  },
  {
    id: crypto.randomUUID(),
    title: "About",
    path: Routes.ABOUT,
  },
  {
    id: crypto.randomUUID(),
    title: "Contact",
    path: Routes.CONTACT,
  },
  {
    id: crypto.randomUUID(),
    title: "Login",
    path: `${Routes.AUTH}/${Pages.LOGIN}`,
  },
];

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <>
      <Button
        variant="secondary"
        size="lg"
        className="lg:hidden cursor-pointer"
        onClick={() => setOpenMenu(true)}
      >
        <Menu className="w-6! h-6!" />
      </Button>
      <ul
        className={`fixed lg:static ${
          openMenu ? "left-0 z-50" : "-left-full"
        } top-0 px-10 py-20 lg:p-0 bg-background lg:bg-transparent transition-all
         duration-200 h-full lg:h-auto flex-col lg:flex-row w-full lg:w-auto flex items-start lg:items-center gap-10`}
      >
        {openMenu && (
          <Button
            variant="secondary"
            size="lg"
            className="lg:hidden z-60 cursor-pointer absolute top-10 right-10"
            onClick={() => setOpenMenu(false)}
          >
            <X className="w-6! h-6!" />
          </Button>
        )}
        {NAVBAR_DATA.map((link) => (
          <li key={link.id}>
            <NavLink
              to={link.path}
              onClick={() => setOpenMenu(false)}
              className={`${
                link.path === `${Routes.AUTH}/${Pages.LOGIN}`
                  ? `${buttonVariants({ size: "lg" })} rounded-full! px-8! py-5.5!`
                  : "block font-semibold text-accent hover:text-primary transition-colors"
              } font-semibold text-xl`}
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Navbar;
