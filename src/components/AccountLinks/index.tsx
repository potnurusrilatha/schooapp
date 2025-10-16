import { createClient } from "@/utils/supabase/server-client";
import Link from "next/link";
import LogOutButton from "./LogOut"

const AccountLinks = async () => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  console.log('user:', user, 'Error:', error);

  return (
    <div>
      {user ? (
        <div className="flex items-center gap-2">
          <Link className="button-tertiary mr-4" href="/create">
            Create Post
          </Link>
          <LogOutButton />
        </div>
      ) : (
        <Link className="button-secondary" href="/auth/login">
          Log In
        </Link>
      )}
    </div>
  );
};

export default AccountLinks;
