"use client";

import NameCard from "@/components/NameCard";

export default function NameCardById({ params }: any) {
  console.log("-----> ", params.id);
  return <NameCard />;
}
