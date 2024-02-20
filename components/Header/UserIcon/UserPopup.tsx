import { Button } from "@/components/ui/button";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import SignOutButton from "./SignOutButton";
import IsAdmin from "@/components/shared/IsAdmin";
import Link from "next/link";
import { getUserByEmail } from "@/lib/actions/user.actions";
import { User } from "lucide-react";
import UserStats from "./UserStats";
export default async function UserPopup({
  user,
}: {
  user: { name: string; email: string; image: string };
}) {
  return (
    <div className="h-screen w-[100%] border flex flex-col">
      <DrawerHeader className="focus:outline-none select-none">
        <DrawerTitle>{user.name}</DrawerTitle>
        <DrawerDescription>{user.email}</DrawerDescription>
        <UserStats email={user.email} />
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="mt-3 h-[120px]">
          <IsAdmin>
            <Link href="/admin">
              <Button variant="secondary" className="w-full">
                Admin
              </Button>
            </Link>

            <div className="my-4 h-px bg-muted" />
          </IsAdmin>
          <SignOutButton />

          {/* divider */}
          <div className="my-4 h-px bg-muted" />
          {/* divider */}
          <div className="flex flex-col gap-2">
            <Button variant="outline" className="w-full">
              My Challenges
            </Button>
            <Button variant="outline" className="w-full">
              My Challenges
            </Button>
            <Button variant="outline" className="w-full">
              My Challenges
            </Button>
          </div>
        </div>
      </div>
      <DrawerFooter>
        <DrawerClose asChild>
          <Button variant="secondary">Close</Button>
        </DrawerClose>
      </DrawerFooter>
    </div>
  );
}
