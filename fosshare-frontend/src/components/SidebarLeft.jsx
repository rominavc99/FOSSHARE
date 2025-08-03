import { Star, Clock, Users, Hash, Bookmark } from "lucide-react";

export default function SidebarLeft() {
  return (
    <aside className="w-full space-y-6 text-sm text-white">
      {/* Secciones principales */}
      <div className="space-y-4">
        <Section
          title="Newest and Recent"
          icon={<Clock size={18} />}
          badge="New"
          description="Find the latest update"
        />
        <Section
          title="Popular of the day"
          icon={<Star size={18} />}
          description="Shots featured today by curators"
        />
        <Section
          title="Following"
          icon={<Users size={18} />}
          description="Explore from your favorite person"
          extraBadge="24"
        />
      </div>

      {/* Tags populares */}
      <div className="space-y-2">
        <h3 className="text-gray-400 uppercase text-xs font-semibold">
          Popular Tags
        </h3>
        <TagList
          tags={[
            { name: "#javascript", count: "82,645" },
            { name: "#finance", count: "65,523" },
            { name: "#design", count: "51,354" },
            { name: "#innovation", count: "48,029" },
            { name: "#tutorial", count: "51,354" },
            { name: "#business", count: "82,645" },
          ]}
        />
      </div>

      {/* Grupos destacados */}
      <div className="space-y-2">
        <h3 className="text-gray-400 uppercase text-xs font-semibold">
          Pinned Group
        </h3>
        <div className="space-y-2">
          {[
            "#javascript",
            "#livingOFFOSS",
            "#design",
            "#FOSSdiscussion",
            "#workingAround",
          ].map((group) => (
            <button
              key={group}
              className="w-full bg-[#2A2D3A] hover:bg-[#3A3D4A] text-left px-3 py-2 rounded-md text-white text-xs"
            >
              {group}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}

// Subcomponente reutilizable para secciones
function Section({ icon, title, description, badge, extraBadge }) {
  return (
    <div className="bg-[#2A2D3A] p-3 rounded-lg flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <span className="font-medium">{title}</span>
          {badge && (
            <span className="bg-green-600 text-white text-xs px-2 py-0.5 rounded-full">
              {badge}
            </span>
          )}
          {extraBadge && (
            <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
              {extraBadge}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-400">{description}</p>
      </div>
    </div>
  );
}

// Lista de tags populares
function TagList({ tags }) {
  return (
    <ul className="space-y-1">
      {tags.map((tag) => (
        <li
          key={tag.name}
          className="flex justify-between text-sm text-gray-300"
        >
          <span>{tag.name}</span>
          <span className="text-xs">{tag.count} Posted</span>
        </li>
      ))}
    </ul>
  );
}
