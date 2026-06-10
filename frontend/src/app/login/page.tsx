"use client";
import { supabase } from '@/lib/supabase'
import React from 'react'

const page = () => {

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3001"
      }
    });
  };

  return (
    <div>
      <h1>Task Manager</h1>
      <button onClick={handleGoogleLogin}>
        Sign In With Google
      </button>
    </div>

  )
}

export default page
