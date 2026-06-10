"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { syncUser } from "@/lib/api";

export default function Home() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUser = async () => {
      const { data } = await supabase.auth.getUser();

      if (!data.user) return;

      setUser(data.user);

      await syncUser(
        data.user.user_metadata.full_name,
        data.user.email!
      );
    };

    loadUser();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>

      {user && (
        <>
          <p>{user.user_metadata.full_name}</p>
          <p>{user.email}</p>
        </>
      )}
    </div>
  );
}