import Header from "../components/Header";

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen w-full bg-gray-900 text-white flex flex-col">
      <Header/>
      {children}
    </div>
  );
}
