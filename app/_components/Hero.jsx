"use client";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Hero() {
  const { user, isSignedIn } = useUser();
  return (
    <section className="bg-gray-50 flex items-center flex-col">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
            Manage Your Expenses
            <strong className="font-extrabold text-primary sm:block">
              {" "}
              Control Your Spends{" "}
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
            Start Monitoring your spends and save penny for future
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {isSignedIn ? (
              <Link
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/dashboard"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                className="block w-full rounded bg-primary px-12 py-3 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
                href="/sign-in"
              >
                Get Started
              </Link>
            )}
          </div>
        </div>
      </div>
      <Image
        src={"/bg.png"}
        alt="hero"
        width={1000}
        height={700}
        className="mt-5 rounded-xl border-2"
      />
    </section>
  );
}

export default Hero;
