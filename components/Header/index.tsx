import Navbar from "./Navbar";
import UserIcon from "./UserIcon";
export default function Header() {
  return (
    <header className="flex items-center justify-between w-full px-2 border-b shadow-lg shadow-blue-500/30 border-blue-500/20">
      <Navbar />
      <UserIcon />
    </header>
  );
}
