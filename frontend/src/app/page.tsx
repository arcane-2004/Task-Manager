"use client"
import Image from 'next/image'
import React from 'react'
import { useRouter } from "next/navigation";
import { useEffect, } from "react";
import { supabase } from "@/lib/supabase";



const LandingPage = () => {

  const router = useRouter();
  useEffect(() => {
    const checkAuth = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        router.push("/dashboard");
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://task-manager-chi-gold-91.vercel.app"
      }
    });
  }

  const features = [
    {
      title: "Create Tasks",
      description: "Quickly create and organize tasks.",
    },
    {
      title: "Assign Members",
      description: "Delegate work to your teammates.",
    },
    {
      title: "Track Progress",
      description: "Monitor pending and completed tasks.",
    },
    {
      title: "Email Notifications",
      description: "Stay updated with automatic emails.",
    },
  ];

  return (
    <div>
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="max-w-3xl text-5xl font-bold text-gray-900">
          Manage Tasks
          <span className="text-purple-600"> Efficiently</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg text-gray-600">
          Create tasks, assign teammates, track progress and
          receive email notifications—all in one place.
        </p>

        <button
          onClick={handleLogin}
          className="mt-8 flex items-center justify-center gap-4 rounded-lg bg-purple-600 ring-2 ring-purple-700 px-6 py-3 font-medium text-white transition hover:bg-purple-700 cursor-pointer"
        >
          <span className='relative h-10'>
            <Image src='/googleLogo.png' alt='' width={20} height={20} className='h-10 w-10' />
          </span>

          Sign In with Google
        </button>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center text-3xl font-bold">
          Features
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border bg-white p-6"
            >
              <h3 className="font-semibold">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default LandingPage
