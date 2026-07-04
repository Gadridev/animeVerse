import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import RightRail from "./RightRail";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="flex justify-center p-2 md:p-6 min-h-screen">
      <div className="flex w-full max-w-[1680px] bg-ink rounded-3xl overflow-hidden border border-white/5 shadow-2xl min-h-[92vh]">
        <Sidebar />

        <div className="flex-1 min-w-0 flex flex-col">
          <Topbar />
          <div key={location.pathname} className="flex-1 overflow-y-auto">
            <main className="px-5 md:px-9 py-7">
              <Outlet />
            </main>
          </div>
        </div>

        <RightRail />
      </div>
    </div>
  );
}
