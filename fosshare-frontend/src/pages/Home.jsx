import MainLayout from "../layouts/MainLayout";
import SidebarLeft from "../components/SidebarLeft";
import PostFeed from "../components/PostFeed";
import SidebarRight from "../components/SidebarRight";

export default function Home() {
  return (
    <MainLayout>
      <main className="flex w-full min-h-screen bg-gray-900 text-white ">
        {/* Sidebar Izquierdo */}
        <aside className="w-1/5 p-4 border-r border-gray-700 hidden lg:block">
          <SidebarLeft />
        </aside>

        {/* Feed Principal */}
        <section className="flex-1 p-4">
          <PostFeed />
        </section>

        {/* Sidebar Derecho */}
        <aside className="w-1/4 p-4 border-l border-gray-700 hidden xl:block">
          <SidebarRight />
        </aside>
      </main>
    </MainLayout>
  );
}
