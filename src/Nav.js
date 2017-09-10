import React from 'react';
import { Link } from 'react-router-dom';

const Tab = ({ tab, path })=> {
  return (
    <li className={ path === tab.path ? 'active': null }>
      <Link to={ tab.path }>
        { tab.title }
        {
          tab.count === undefined ? null : ( <span> ({ tab.count })</span>)
        }
      </Link>
    </li>
  );
}

const Nav = ({ router, users, things})=> {
  const path = router.location.pathname;
  const tabs = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'Things',
      path: '/things',
      count: things.length
    },
    {
      title: 'Users',
      path: '/users',
      count: users.length
    }

  ];
  return (
    <ul className='nav nav-tabs' style={ { marginBottom: '10px' } }>
      {
        tabs.map( tab => <Tab key={ tab.path } tab={ tab } path={ path }/>)
      }
    </ul>
  );
};

export default Nav;
