import { GithubIcon, LinkedInIcon } from "@/svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Built with ❤️ by{" "}
          <Link
            to={"https://linkedin.com/in/mohamedayman-dev"}
            className="font-medium text-foreground transition-all duration-300 hover:text-primary"
          >
            Mohamed Ayman
          </Link>
        </p>

        <div className="flex items-center gap-3">
          <Link
            to="https://github.com/MohamedAyman-11"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <GithubIcon className="size-5 transition-all duration-300 hover:fill-black hover:transform hover:-translate-y-1" />
          </Link>

          <Link
            to="https://linkedin.com/in/mohamedayman-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            <LinkedInIcon className="size-5 transition-all duration-300 hover:fill-blue-600 hover:transform hover:-translate-y-1" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
