import { Fragment, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Menu, Transition } from "@headlessui/react";
import { 
  HeartIcon,
  HomeIcon,
  LogoutIcon,
  PlusIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/24/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import PropTypes from "prop-types";


const MenuItems = [
  {
    label: 'List a new home',
    icon: PlusIcon,
    href: '/list',
  },
  {
    label: 'My homes',
    icon: HomeIcon,
    href: '/homes',
  },
  {
    label: 'Favorites',
    icon: HeartIcon,
    href: '/favorites',
  },
  {
    label: 'Logout',
    icon: LogoutIcon,
    onClick: () => null,
  },
];

const Layout = ({ children = null }) => {
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);

  const user = null;
  const isLoadingUser = false;

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  return (
    <>
      <Head>
        <title>SupaVacation | The Modern Dev</title>
        <meta
          name="title"
          content="Learn how to build a fullstack app with Next.js, PlanetScele & Prisma | The Modern Dev"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen flex flex-col">
        <header className="h-16 w-full shadow-md">
          <div className="h-full container mx-auto">
            <div className="h-full px-4 flex justify-between items-center space-x-4">
              <Link href="/" className="flex items-center space-x-1">
                  <SparklesIcon className="shrink-0 w-8 h-8 text-rose-500" />
                  <span className="text-xl font-semibold tracking-wide">
                    Supa<span className="text-rose-600">Vacation</span>
                  </span>
              </Link>
              <div className="flex items-center space-x-4">
                <Link href="/create" className="hidden sm:block hover:bg-gray-200 transition px-3 py-1 rounded-md">
                  List your home
                </Link>
                {isLoadingUser ? (
                  <div className="h-8 w-[75px] bg-gray-200 animate-pulse rounded-md" />
                ) : user ? (
                  <div>
                    //TODO: Menu
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={openModal}
                    className="ml-4 px-4 py-1 rounded-md bg-rose-600 hover:bg-rose-500 focus:outline-none focus:ring-4 focus:ring-rose-500 focus:ring-opacity-50 text-white transition"
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-grow container mx-auto">
          <div className="px-4 py-12">
            {typeof children === 'function' ? children(openModal) : children}
          </div>

          //TODO: AuthModal
        </main>
      </div>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
}

export default Layout;
