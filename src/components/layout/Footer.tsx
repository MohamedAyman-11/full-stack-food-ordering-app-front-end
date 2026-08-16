import { GithubIcon, LinkedInIcon } from "@/svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
        <div className="text-sm text-muted-foreground">
          <div>
            <span>&lt;</span>
            <span>Developed by="</span>

            <a
              href="https://linkedin.com/in/mohamedayman-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary transition-colors duration-300 hover:text-black"
            >
              Mohamed Ayman
            </a>

            <span>" at="{new Date().getFullYear()}"</span>
            <span> /&gt;</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/MohamedAyman-11"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <GithubIcon className="size-5 transition-all duration-300 hover:-translate-y-1 hover:fill-black" />
          </a>

          <a
            href="https://linkedin.com/in/mohamedayman-dev"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-muted-foreground transition-colors duration-300 hover:text-foreground"
          >
            <LinkedInIcon className="size-5 transition-all duration-300 hover:-translate-y-1 hover:fill-blue-600" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
