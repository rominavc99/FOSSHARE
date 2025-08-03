// src/components/RightSidebar.jsx
import React from "react";

const RightSidebar = () => {
  return (
    <aside className="w-full md:w-1/4 px-4 space-y-6">
      {/* Meetups */}
      <section className="bg-gray-800 p-4 rounded-xl sidebarSection">
        <h2 className="text-lg font-semibold text-white mb-4">Meetups</h2>
        <ul className="space-y-4">
          <li>
            <p className="text-sm text-white">FEB 7 - WHAT IS FOSS?</p>
            <p className="text-xs text-gray-400">
              Remote • CDMX • Part-time • Worldwide
            </p>
          </li>
          <li>
            <p className="text-sm text-white">FEB 3 - FOSS as PRAXIS</p>
            <p className="text-xs text-gray-400">
              Remote • CDMX • Part-time • Worldwide
            </p>
          </li>
          <li>
            <p className="text-sm text-white">FEB 5 - Living of FOSS</p>
            <p className="text-xs text-gray-400">
              Full-time • CDMX • Contract • Worldwide
            </p>
          </li>
        </ul>
      </section>

      {/* Most Recent */}
      <section className="bg-gray-800 p-4 rounded-xl sidebarSection">
        <h2 className="text-lg font-semibold text-white mb-4">Most Recent</h2>
        <ul className="space-y-4">
          <li className="text-sm text-white hover:underline cursor-pointer">
            Discover Bibliogram: A FOSS Alternative to Instagram
          </li>
          <li className="text-sm text-white hover:underline cursor-pointer">
            Open Source Replacements for Notion You Should Try
          </li>
          <li className="text-sm text-white hover:underline cursor-pointer">
            5 Terminal Tools That Make Your Workflow Smoother
          </li>
          <li className="text-sm text-white hover:underline cursor-pointer">
            Meet the Creator of Penpot: The FOSS Answer to Figma
          </li>
          <li className="text-sm text-white hover:underline cursor-pointer">
            FOSS Projects from Latin America You Should Know
          </li>
          <li className="text-sm text-white hover:underline cursor-pointer">
            What FOSS Tools Do You Use to Organize Your Life?
          </li>
        </ul>
      </section>
    </aside>
  );
};

export default RightSidebar;
