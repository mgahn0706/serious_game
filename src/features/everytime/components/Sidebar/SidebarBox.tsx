// components/Sidebar/SidebarBox.tsx
export function SidebarBox({
  title,
  rightText,
  children,
}: {
  title: string;
  rightText?: string;
  onRightClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-gray-200">
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-blue-600">{title}</span>
        {rightText && (
          <button className="text-xs text-gray-400 hover:underline">
            {rightText}
          </button>
        )}
      </div>
      <div className="border-t border-gray-200">{children}</div>
    </div>
  );
}
