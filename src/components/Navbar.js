import React, { useState, Fragment } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
'data:image/png;base64,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'
};
const navigation = [
    { name: 'Dashboard', href: '/', current: true },
    { name: 'About', href: '/about', current: false },
    { name: 'FileUpload', href: '/upload', current: false },
  ];
  
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', action: 'signout' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Navbar({ handleSignout }) {
    const [currentTab, setCurrentTab] = useState('Dashboard');
  
    const signout = () => {
      handleSignout();
    };
  
    const handleUserAction = (action) => {
      if (action === 'signout') {
        signout();
      }
    };
  
    const handleTabClick = (name) => {
      setCurrentTab(name);
    };
  
    return (
      <>
        <div className="min-h-full">
          <Disclosure as="nav" className="bg-sky-600">
            {({ open }) => (
              <>
                {/* Navbar content */}
                <div className="mx-auto px-4 sm:px-6 lg:px-8">
                  {/* Navbar header */}
                  <div className="flex h-16 items-center justify-between">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <img
                          className="h-8 w-10"
                          src="logo-white Background Removed.png"
                          alt="Your Company"
                        />
                      </div>
                      <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={() => handleTabClick(item.name)}
                              className={classNames(
                                currentTab === item.name
                                  ? 'bg-sky-700 text-white'
                                  : 'text-white hover:bg-sky-500 hover:text-white',
                                'rounded-md px-3 py-2 text-sm font-medium'
                              )}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      {/* User menu */}
                      <div className="ml-4 flex items-center md:ml-6">
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="sr-only">Open user menu</span>
                              <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt={user.name} />
                            </Menu.Button>
                          </div>
                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                              {userNavigation.map((item) => (
                                <Menu.Item key={item.name}>
                                  {({ active }) => (
                                    <a
                                      href={item.href}
                                      onClick={() => handleUserAction(item.action)} // Handle user actions
                                      className={classNames(
                                        active ? 'bg-gray-100' : '',
                                        'block px-4 py-2 text-sm text-gray-700'
                                      )}
                                    >
                                      {item.name}
                                    </a>
                                  )}
                                </Menu.Item>
                              ))}
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                      {/* Mobile menu button */}
                      <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                        ) : (
                          <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                        )}
                      </Disclosure.Button>
                    </div>
                  </div>
                </div>
  
                {/* Mobile menu */}
                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => handleTabClick(item.name)}
                        className={classNames(
                          currentTab === item.name ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'block rounded-md px-3 py-2 text-base font-medium'
                        )}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                      <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt={user.name} />
                      <div className="ml-3">
                        <div className="text-base font-medium leading-none text-white">{user.name}</div>
                        <div className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                      {userNavigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          onClick={() => handleUserAction(item.action)} // Handle user actions
                          className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </Disclosure>
        </div>
      </>
    );
  }
  
  Navbar.propTypes = {
    handleSignout: PropTypes.func.isRequired,
  };
  