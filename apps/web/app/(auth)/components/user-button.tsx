import Form from "next/form";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/ui/components/avatar";
import { LogOutIcon } from "@repo/ui/components/icons";
import { signOut } from "../auth";
import { Button } from "@repo/ui/components/button";

function UserButton({ user }: { user?: any }) {
  const initials = user?.name
    ?.split(" ")
    .map((name: string) => name[0])
    .join("");

  return (
    <Form
      action={async () => {
        "use server";

        await signOut({
          redirectTo: "/",
        });
      }}
    >
      <Button variant="ghost" type="submit">
        <Avatar>
          <AvatarImage src={user?.image} />
          <AvatarFallback>{initials || "U"}</AvatarFallback>
        </Avatar>
        Logg ut
        <LogOutIcon className="mr-2 h-4 w-4" />
      </Button>
    </Form>
  );
}

export { UserButton };
