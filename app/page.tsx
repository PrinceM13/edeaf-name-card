"use client";

import CardFrame from "@/components/CardFrame";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   router.push("/name-cards");
  // }, []);

  return (
    <>
      <CardFrame>
        <button
          onClick={() => router.push("/name-cards")}
          className="bg-[#cbe9f6] text-2xl px-2 py-1 rounded-lg text-center"
        >
          Go To Name Cards Page
        </button>
      </CardFrame>
    </>
  );
}
