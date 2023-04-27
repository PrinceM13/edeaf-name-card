"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import QRcode from "qrcode";

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

  const [email, setEmail] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [nickName, setNickName] = useState("");

  const handleGenerateQR = async (e: any) => {
    e.preventDefault();

    // find info from email
    const [selectedInfo] = infos.filter(
      (el) => el[EMAIL].toLocaleLowerCase() === email.toLocaleLowerCase()
    );

    // set nick name
    setNickName(selectedInfo[NICK_NAME]);

    // set QR code url if info exist
    let selectedPath;
    if (selectedInfo) {
      // set path from firstName-lastName
      selectedPath = `${selectedInfo[FIRST_NAME].toLocaleLowerCase()}-${selectedInfo[
        LAST_NAME
      ].toLocaleLowerCase()}`;

      // create QR code url
      const url = await QRcode.toDataURL(
        `https://edeaf-name-card.vercel.app/name-cards/${selectedPath}`
      );
      setQrUrl(url);
    } else {
      alert("invalid email");
      setEmail("");
    }
  };

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
      {infos.length !== 0 && (
        <>
          {qrUrl ? (
            <>
              <img src={qrUrl} className="rounded-lg" />
              <div className="text-center text-3xl bg-[#cbe9f6] py-1 rounded-lg">{nickName}</div>
            </>
          ) : (
            <form onSubmit={handleGenerateQR} className="flex flex-col font-mono text-xs gap-4">
              <input
                className="text-center py-2 rounded-lg bg-[#cbe9f6]"
                placeholder="Please type your e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button>Get QR code</button>
            </form>
          )}
        </>
      )}
      {
        infos.length === 0 ? <div className="text-center text-2xl">Loading...</div> : null
        // infos.map((el: Info, idx: number) => (
        //   <div
        //     key={idx}
        //     onClick={() =>
        //       router.push(
        //         `/name-cards/${el[FIRST_NAME].toLocaleLowerCase()}-${el[
        //           LAST_NAME
        //         ].toLocaleLowerCase()}`
        //       )
        //     }
        //     className="bg-[#cbe9f6] text-2xl px-2 py-1 rounded-lg text-center cursor-pointer"
        //   >
        //     {el[NICK_NAME]}
        //   </div>
        // ))
      }
    </CardFrame>
  );
}
