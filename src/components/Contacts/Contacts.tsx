const iconData = [
  {
    platform: 'Github',
    url: 'https://github.com/aussftw',
    icon: 'FaGithub',
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alexander-kaminskiy',
    icon: 'FaLinkedinIn',
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/auscapulet',
    icon: 'FaInstagram',
  },
];

import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

interface IconProps {
  platform: string;
  url: string;
  icon: 'FaGithub' | 'FaLinkedinIn' | 'FaInstagram';
  key: string;
}

const IconComponents: any = {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
};

const Icon: React.FC<IconProps> = ({ platform, url, icon }) => {
  const IconComponent = IconComponents[icon];

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-white p-3 rounded-full transition transform hover:bg-red-800 hover:-rotate-45"
    >
      <IconComponent className="text-xl" />
    </a>
  );
};

const Contacts: React.FC = () => {
  return (
    <div className="bg-white py-12 px-6" id="contact">
      <h2 className="text-2xl font-semibold mb-4 text-center">Contact me</h2>
      <p className="mb-8 text-center">Get in touch with me</p>
      <div className="flex flex-col space-y-8 md:space-y-0 md:flex-col md:space-x-8">
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <div className="flex space-x-4 justify-center">
            {iconData.map((data) => (
              <Icon key={data.platform} {...data} />
            ))}
          </div>
        </div>
        <div className="flex-grow text-center">
          <p className="text-xl">
            <span className="text-red-800">Email</span>:
            kaminskiy.alexander@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
