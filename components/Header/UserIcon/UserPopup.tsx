import { Button } from "@/components/ui/button";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import SignOutButton from "./SignOutButton";
export default function UserPopup({
  user,
}: {
  user: { name: string; email: string; image: string };
}) {
  return (
    <div className="h-screen w-[100%] border flex flex-col">
      <DrawerHeader className="focus:outline-none select-none">
        <DrawerTitle>{user.name}</DrawerTitle>
        <DrawerDescription>{user.email}</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="mt-3 h-[120px]">
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
