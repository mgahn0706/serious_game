import { Carrot } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function DanggeunHeader() {
  return (
    <header className="border-b border-gray-200 bg-white">
      {/* ================= TOP NAV ================= */}
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink to="/danggeun">
          <div className="flex items-center gap-2">
            {/* Carrot icon */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FF6602]">
              <Carrot className="h-4 w-4 text-white" />
            </div>

            {/* Text logo */}
            <span className="text-[22px] font-extrabold text-[#FF6602]">
              당근
            </span>
          </div>
        </NavLink>

        {/* App download */}
      </div>
    </header>
  );
}
