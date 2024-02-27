import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import SignUpButton from "./SignUpButton";
import UserPopup from "./UserPopup";
import { getSession } from "@/lib/auth";
export default async function UserIcon() {
  const session = await getSession();

  if (!session) {
    return <SignUpButton />;
  }

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <button>
          <img
            src={session.user?.image || "/user.svg"}
            alt="user profile"
            className="rounded-full w-10 h-10 object-cover"
          />
        </button>
      </DrawerTrigger>

      <DrawerContent className="max-sm:w-full sm:w-80">
        <UserPopup user={session.user as any} />
      </DrawerContent>
    </Drawer>
  );
}
