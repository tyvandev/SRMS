import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const ROUTES = [
  {
    title: 'Home',
    path: '/',
  },
  {
    title: 'Add New Students',
    path: '/students/new',
  },
  {
    title: 'Students List',
    path: '/students',
  },
  {
    title: 'Add New Courses',
    path: '/courses/new',
  },
  {
    title: 'Courses List',
    path: '/courses',
  },
  {
    title: 'Add New Results',
    path: '/results/new',
  },
  {
    title: 'Results List',
    path: '/results',
  },
];

export default function Sidebar() {
  const router = useRouter();

  return (
    <nav className="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6">
      <div className="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto">
        {/* Brand */}
        <Link href="/">
          <div className="text-3xl">SRMS</div>
        </Link>
        {/* Collapse */}
        <div
          className={
            'md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded'
          }
        >
          <ul className="md:flex-col md:min-w-full flex flex-col list-none">
            {ROUTES.map(menu => (
              <li key={menu.path} className="items-center">
                <Link href={menu.path}>
                  <span
                    className={
                      'text-sm uppercase py-3 font-bold block cursor-pointer ' +
                      (router.pathname === menu.path
                        ? 'text-blue-500 hover:text-blue-600'
                        : 'text-gray-700 hover:text-gray-500')
                    }
                  >
                    {menu.title}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
