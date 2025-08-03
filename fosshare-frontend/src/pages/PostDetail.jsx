// src/pages/PostDetailPage.jsx
import Header from "../components/Header";
import MainLayout from "../layouts/MainLayout";
import SidebarLeft from "../components/SidebarLeft";
import SidebarRight from "../components/SidebarRight";
import PostDetail from "../components/PostDetail"; // Tu componente de detalle de post

export default function PostDetailPage() {
  return (
    <MainLayout>
      <main className="flex w-full min-h-screen bg-gray-900 text-white ">
        {/* Sidebar Izquierdo */}
        <aside className="w-1/5 p-4 border-r border-gray-700 hidden lg:block">
          <SidebarLeft />
        </aside>

        {/* Detalle del post */}
        <section className="flex-1 p-4">
          <PostDetail />
        </section>

        {/* Sidebar Derecho */}
        <aside className="w-1/4 p-4 border-l border-gray-700 hidden xl:block">
          <SidebarRight />
        </aside>
      </main>
    </MainLayout>
  );
}
