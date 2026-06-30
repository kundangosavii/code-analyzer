import {
  Folder,
  GitBranch,
  Shield,
  Settings,
  Layout,
  Plus,
  Lock,
} from "lucide-react";

export default function Sidebar() {
  const repos = [
    { name: "api-service", active: false },
    { name: "auth-module", active: true },
    { name: "frontend-ui", active: false },
    { name: "data-pipeline", active: false },
  ];

  const menuItems = [
    { icon: Folder, label: "Repositories" },
    { icon: GitBranch, label: "Branches" },
    { icon: Layout, label: "Code Flow" },
    { icon: Shield, label: "Security" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <div className="w-64 h-screen bg-[#080817] border-r border-gray-800 text-gray-300 flex flex-col justify-between p-4">

      <div>
        <div className="mb-6">
          <p className="text-xs text-gray-500 mb-2">REPOSITORIES</p>

          <div className="flex flex-col gap-2">
            {repos.map((repo, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 px-3 py-2 rounded-md cursor-pointer ${
                  repo.active
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-800"
                }`}
              >
                {repo.active && <Lock size={14} />}
                <span className="text-sm">{repo.name}</span>
              </div>
            ))}
          </div>
        </div>


        <div className="border-t border-gray-800 my-4" />

        <div className="flex flex-col gap-2">
          {menuItems.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-800 cursor-pointer"
            >
              <item.icon size={16} />
              <span className="text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md">
        <Plus size={16} />
        Analyze New Repo
      </button>
    </div>
  );
}