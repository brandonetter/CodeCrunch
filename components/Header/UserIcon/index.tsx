import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { getServerSession } from "next-auth";
import SignUpButton from "./SignUpButton";
import UserPopup from "./UserPopup";

export default async function UserIcon() {
  const session = await getServerSession();

  if (!session) {
    return <SignUpButton />;
  }
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
