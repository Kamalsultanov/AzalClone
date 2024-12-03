import React from 'react';
import { GoDotFill } from "react-icons/go";
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const { pathname } = location;

  const segments = pathname.split('/').filter((segment) => segment !== '');

  let url = '';

  const breadCrumbLinks = segments.map((segment, i) => {
    url += `/${segment}`;

    return (
      <React.Fragment key={i}>
        {i > 0 && <GoDotFill size={10} className="mx-1" />}
        
        <Link to={url} className="text-[#2e3034] hover:underline">
          {segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ')}
        </Link>
      </React.Fragment>
    );
  });

  return (
    <nav aria-label="breadcrumb" className="p-3">
      <ul className="breadcrumb flex items-center">
        <li>
          <Link to="/" className="text-[#2e3034] hover:underline">
            Home
          </Link>
        </li>
        {segments.length > 0 && <GoDotFill size={10} className="mx-1" />}
        {breadCrumbLinks}
      </ul>
    </nav>
  );
};

export default Breadcrumb;
