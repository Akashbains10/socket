type SidebarHeaderProps = {
  title: string;
  onActionClick?: () => void;
  actionIcon?: React.ReactNode;
};

const SidebarHeader = ({ title, onActionClick, actionIcon }: SidebarHeaderProps) => {
  return (
    <div className="p-4 border-b border-gray-300 flex justify-between">
      <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      {actionIcon && (
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full shadow-md cursor-pointer transition-colors"
          onClick={onActionClick}
        >
          {actionIcon}
        </button>
      )}
    </div>
  );
};

export default SidebarHeader;
