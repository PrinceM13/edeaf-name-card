"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import CardFrame from "@/components/CardFrame";
import { useRouter } from "next/navigation";
import {
  TIMESTAMP,
  FIRST_NAME,
  LAST_NAME,
  NICK_NAME,
  EMAIL,
  MOBILE,
  LINE_ID,
  INSTAGRAM,
  FACEBOOK
} from "../../config/constant";

interface Info {
  [TIMESTAMP]: string;
  [FIRST_NAME]: string;
  [LAST_NAME]: string;
  [NICK_NAME]: string;
  [EMAIL]: string;
  [MOBILE]: string;
  [LINE_ID]: string;
  [INSTAGRAM]: string;
  [FACEBOOK]: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function NameCards() {
  const router = useRouter();
  const [infos, setInfos] = useState<Info[]>([]);
  const [isReload, setReload] = useState(true);

  useEffect(() => {
    const fetchAllInfos = async () => {
      const res = await axios.get(`${API_URL}/google-sheet/name-cards/infos/dummy`);
      setInfos(res.data);
      setReload(false);
    };
    isReload && fetchAllInfos();
  }, [isReload]);

  return (
    <CardFrame>
      <img
        className="rounded-lg"
        src="https://res.cloudinary.com/dhr35jlbz/image/upload/v1681845469/edeaf/name-card/cheer-up-lg_bwooam.png"
      />
      {infos.length === 0 ? (
        <div className="text-center text-2xl">Loading...</div>
      ) : (
        infos.map((el: Info, idx: number) => (
          <div
            key={idx}
            onClick={() =>
              router.push(
                `/name-cards/${el[FIRST_NAME].toLocaleLowerCase()}-${el[
                  LAST_NAME
                ].toLocaleLowerCase()}`
              )
            }
            className="bg-[#cbe9f6] text-2xl px-2 py-1 rounded-lg text-center cursor-pointer"
          >
            {el[NICK_NAME]}
          </div>
        ))
      )}
    </CardFrame>
  );
}
