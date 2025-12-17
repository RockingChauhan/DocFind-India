import { FaSearch, FaUserMd } from 'react-icons/fa';

const EmptyState = ({ title, message, actionLabel, onAction }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <FaUserMd className="text-gray-400 text-3xl" />
      </div>
      <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-500 mb-4 max-w-md">{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn-primary flex items-center">
          <FaSearch className="mr-2" />
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
