import { buttonVariants } from "@/components/ui/button";
import { Pages, Routes } from "@/constants";
import { ArrowRightCircle } from "lucide-react";
import { Link, NavLink } from "react-router-dom";

const Text = () => {
  return (
    <div>
      <h1 className="text-4xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
        Slice into Happiness
      </h1>
      <p className="text-accent my-8 leading-[1.7] text-lg">
        Craving pizza? We've got you covered with fresh ingredients, endless
        flavors, and the fastest delivery. Your perfect slice is just a tap
        away!
      </p>
      <div className="flex items-center gap-3">
        <NavLink
          to={`${Routes.MENU}/${Pages.MENU_ITEMS}`}
          className={`${buttonVariants({ size: "lg" })} rounded-full! space-x-2 px-4! py-4! uppercase font-semibold`}
        >
          Order now
          <ArrowRightCircle className="size-5" />
        </NavLink>
        <Link
          to={`${Routes.ABOUT}`}
          className="flex gap-2 items-center text-black hover:text-primary duration-200 transition-colors font-semibold"
        >
          Learn more
          <ArrowRightCircle className="size-5" />
        </Link>
      </div>
    </div>
  );
};

export default Text;
