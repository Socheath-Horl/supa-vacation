import Image from 'next/image';
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/router';

import Layout from '../../components/layout';

const prisma = new PrismaClient();

export async function getStaticPaths() {
  // get all the homes IDs from the database
  const homes = await prisma.home.findMany({
    select: { id: true },
  });

  return {
    paths: homes.map(home => ({
      params: { id: home.id },
    })),
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  // get the current home from the database
  const home = await prisma.home.findUnique({
    where: { id: params.id },
  });

  if (home) {
    return {
      props: JSON.parse(JSON.stringify(home)),
    };
  }

  return {
    redirect: {
      description: '/',
      permanent: false,
    },
  };
}

const ListedHome = (home = null) => {
  // retrieve the next js router
  const router = useRouter();

  // fallback version
  if (router.isFallback) {
    return 'Loading...';
  }

  return (
    <Layout>
      <div className='max-w-screen-lg mx-auto'>
        <div className='flex flex-col sm:flex-row sm:justify-between sm:space-x-4 space-y-4'>
          <div>
            <h1 className='text-2xl font-semibold truncate'>
              {home?.title ?? ''}
            </h1>
            <ol className='inline-flex items-center space-x-1 text-gray-500'>
              <li>
                <span>{home?.guests ?? 0} guests</span>
                <span aria-hidden="true"> . </span>
              </li>
              <li>
                <span>{home?.beds ?? 0} beds</span>
                <span aria-hidden="true"> . </span>
              </li>
              <li>
                <span>{home?.baths ?? 0} baths</span>
              </li>
            </ol>
          </div>
        </div>

        <div className='mt-6 relative aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg shadow-md overflow-hidden'>
          {home?.image ? (
            <img
              src={home.image}
              alt={home.title}
              className="object-cover"
            />
          ): null}
        </div>

        <p className=''>{home?.description ?? ''}</p>
      </div>
    </Layout>
  );
};

export default ListedHome;
