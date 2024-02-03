import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

import UserPopup from "./UserPopup";
export default function UserIcon() {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className="rounded-full flex flex-shrink-0 size-10"
        ></Button>
      </DrawerTrigger>

      <DrawerContent className="max-sm:w-full sm:w-80">
        <UserPopup />
      </DrawerContent>
    </Drawer>
  );
}
