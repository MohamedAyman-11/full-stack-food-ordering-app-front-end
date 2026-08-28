import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Pages, Routes } from "@/constants";
import { NavLink, useLocation } from "react-router-dom";
const DATA: Record<string, string> = {
  "account-details": "Account Details",
  password: "Password",
  orders: "Orders",
  sizes: "Sizes",
  dashboard: "Dashboard",
  extras: "Extras",
  categories: "Categories",
};
const CustomBreadcrumb = () => {
  const { pathname } = useLocation();
  const pathArr = pathname.split("/");
  const el = pathArr[pathArr.length - 1];
  return (
    <div className="bg-primary/5 py-12.5">
      <div className="container">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <NavLink
                to={`${Routes.ROOT}`}
                className={"text-[15px] font-medium"}
              >
                Home
              </NavLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <NavLink to={pathname} className={"text-[15px] font-medium"}>
                {DATA[el]}
              </NavLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};
export default CustomBreadcrumb;
