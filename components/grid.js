import PropTypes from 'prop-types';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import Card from './card';

const Grid = ({ homes = []}) => {
  const isEmpty = homes.length === 0;

  const toggleFavorite = async id => {
    // TODO: Add/remove home from the authenticated user's favorites
  };

  return isEmpty ? (
    <p className='text-amber-700 bg-amber-100 px-4 rounded-md py-2 max-w-max inline-flex items-center space-x-1'>
      <ExclamationCircleIcon className="shrink-0 w-5 h-5 mt-x" />
      <span>Unfortunately, there is nothing to display yet.</span>
    </p>
  ) :(
    <div className='grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
      {homes.map(home => (
        <Card key={home.id} {...home} onClickFavorite={toggleFavorite} />
      ))}
    </div>
  );
};

Grid.propTypes = {
  homes: PropTypes.array,
};

export default Grid;
