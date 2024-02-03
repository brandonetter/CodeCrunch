import { Button } from "@/components/ui/button";
import {
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";

export default function UserPopup() {
  return (
    <div className="h-screen w-[100%] border flex flex-col">
      <DrawerHeader>
        <DrawerTitle>Username</DrawerTitle>
        <DrawerDescription>username@email.com</DrawerDescription>
      </DrawerHeader>
      <div className="p-4 pb-0">
        <div className="mt-3 h-[120px]">
          <Button variant="default" className="w-full">
            Logout
          </Button>
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
