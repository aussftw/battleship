import { FaGithub, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { FC } from 'react';

import Icon from '../Icon/Icon';

type IconData = {
  platform: string;
  url: string;
  IconComponent: FC;
};

const iconData: IconData[] = [
  {
    platform: 'Github',
    url: 'https://github.com/aussftw',
    IconComponent: FaGithub,
  },
  {
    platform: 'LinkedIn',
    url: 'https://www.linkedin.com/in/alexander-kaminskiy',
    IconComponent: FaLinkedinIn,
  },
  {
    platform: 'Instagram',
    url: 'https://www.instagram.com/auscapulet',
    IconComponent: FaInstagram,
  },
];

const Contacts: FC = () => {
  return (
    <div className="bg-white py-12 px-6">
      <p className="text-2xl font-semibold mb-4 text-center">
        Get in touch with me
      </p>
      <div className="flex flex-col space-y-8 md:space-y-0 md:flex-col md:space-x-8">
        <div className="flex-shrink-0 mb-4 md:mb-0">
          <div className="flex space-x-4 justify-center m-4">
            {iconData.map((data) => (
              <Icon key={data.platform} {...data} />
            ))}
          </div>
        </div>
        <div className="flex-grow text-center">
          <p className="text-xl">
            <span className="text-blue-300">Email</span>:
            kaminskiy.alexander@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
