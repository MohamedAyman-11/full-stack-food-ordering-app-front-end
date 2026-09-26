import { Pages, Routes } from '@/constants';
import { GithubIcon, InstagramInIcon, LinkedInIcon } from '@/svg';
import { Separator } from '@base-ui/react';
import { ChevronRight, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const myAccounts = [
  {
    id: crypto.randomUUID(),
    name: 'linkedin' as const,
    icon: LinkedInIcon,
    color: '#0a66c2',
    path: 'https://www.linkedin.com/in/mohamedayman-dev/',
  },
  {
    id: crypto.randomUUID(),
    name: 'github' as const,
    icon: GithubIcon,
    color: '#333',
    path: 'https://github.com/MohamedAyman-11',
  },
];

const socialLinks = [
  {
    id: crypto.randomUUID(),
    name: 'instagram' as const,
    icon: InstagramInIcon,
    color: '#e1306c',
    path: 'https://www.instagram.com/mo7amedaymann/',
  },
  {
    id: crypto.randomUUID(),
    name: 'linkedin' as const,
    icon: LinkedInIcon,
    color: '#0a66c2',
    path: 'https://www.linkedin.com/in/mohamedayman-dev/',
  },
  {
    id: crypto.randomUUID(),
    name: 'github' as const,
    icon: GithubIcon,
    color: '#333',
    path: 'https://github.com/MohamedAyman-11',
  },
];

const quickLinks = [
  {
    id: crypto.randomUUID(),
    label: 'Home',
    path: `${Routes.ROOT}`,
  },
  {
    id: crypto.randomUUID(),
    label: 'Menu',
    path: `${Routes.MENU}`,
  },
  {
    id: crypto.randomUUID(),
    label: 'Delivery Partner',
    path: `${Routes.DELIVERY_AUTH}/${Pages.LOGIN}`,
  },
];

const contact = [
  {
    id: crypto.randomUUID(),
    icon: Phone,
    label: '+1 202 555 0123',
    path: '/',
  },
  {
    id: crypto.randomUUID(),
    icon: MapPin,
    label: 'New York, USA',
    path: '/',
  },
  {
    id: crypto.randomUUID(),
    icon: Mail,
    label: 'hello@craveo.com',
    path: '/',
  },
];
const Footer = () => {
  return (
    <>
      <footer className="bg-primary/5">
        <Info />
        <Separator className={'bg-primary/7 h-0.5'} />
        <Developer />
      </footer>
    </>
  );
};

export default Footer;

const Developer = () => {
  return (
    <div className="container">
      <div className="flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
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

        <div className="flex items-center gap-1">
          {myAccounts.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.id}
                href={item.path}
                target="_blank"
                className={`group p-2 rounded-full duration-400 transition-all
                    ${item.name === 'linkedin' ? 'hover:bg-linkedin' : item.name === 'github' ? 'hover:bg-github' : null} `}
              >
                <Icon className="group-hover:fill-white! w-5 h-5 duration-400 transition-all" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Info = () => {
  return (
    <>
      <div className="container py-10">
        <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3  gap-10">
          {/* INFO  */}
          <div className="space-y-3">
            <img src="/images/brand.png" alt="Brand Logo" className="w-60" />
            <p className="text-gray-400 leading-[1.7] ">
              Delicious food made with passion. Fresh ingredients, great flavors, and a meal worth remembering.
            </p>
            <div className="flex items-center gap-1">
              {socialLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.id}
                    target="_blank"
                    href={item.path}
                    rel="noopener noreferrer"
                    className={`group p-2 rounded-full duration-400 transition-all
                    ${item.name === 'instagram' ? 'hover:bg-instagram' : item.name === 'linkedin' ? 'hover:bg-linkedin' : item.name === 'github' ? 'hover:bg-github' : null} `}
                  >
                    <Icon className="group-hover:fill-white! w-5 h-5 duration-400 transition-all" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <div
              className={`relative  
            after:absolute after:content-[''] after:bottom-0 after:left-0 after:bg-primary after:h-1 after:w-8 after:rounded-full`}
            >
              <h4 className="text-3xl font-semibold py-3 ">Quick Links</h4>
            </div>
            <div className="space-y-5 mt-5">
              {quickLinks.map((item) => (
                <Link
                  key={item.id}
                  to={item.path}
                  className="flex items-center justify-between text-gray-400 transition-all font-medium duration-300 hover:text-primary"
                >
                  {item.label}
                  <ChevronRight className="size-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* CONTACT US */}

          <div>
            <div
              className={`relative  
            after:absolute after:content-[''] after:bottom-0 after:left-0 after:bg-primary after:h-1 after:w-8 after:rounded-full`}
            >
              <h4 className="text-3xl font-semibold py-3 ">Contact Us</h4>
            </div>
            <div className="space-y-5 mt-5">
              {contact.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.id} className="flex items-center gap-3 group">
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={item.path}
                      className="p-2.5 rounded-full transition-all duration-300 bg-primary/20"
                    >
                      <Icon className="size-5 text-primary stroke-2 font-bold" />
                    </a>
                    <p className="text-gray-400 font-medium transition-all duration-300 group-hover:text-gray-500">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
