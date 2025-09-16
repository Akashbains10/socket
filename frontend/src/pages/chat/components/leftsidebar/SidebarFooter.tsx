type FooterAction = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color?: string;
  hoverColor?: string;
};

type SidebarFooterProps = {
  actions: FooterAction[];
};

const SidebarFooter = ({ actions }: SidebarFooterProps) => {
  return (
    <div className="p-4 border-t border-gray-200 mt-auto">
      <div className="flex justify-between items-center">
        {actions.map((action, idx) => (
          <button
            key={idx}
            onClick={action.onClick}
            className={`flex gap-2 ${action.color || "text-gray-700"} px-3 py-2 rounded-lg hover:${action.hoverColor || "bg-gray-300"} transition-colors`}
          >
            {action.icon}
            <span className="text-sm font-medium">{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default SidebarFooter;
