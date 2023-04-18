"use client";

import axios from "axios";
import { useEffect, useState } from "react";

import NameCard from "@/components/NameCard";
import {
  EMAIL,
  FACEBOOK,
  FIRST_NAME,
  INSTAGRAM,
  LAST_NAME,
  LINE_ID,
  MOBILE,
  NICK_NAME,
  TIMESTAMP
} from "@/config/constant";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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

export default function NameCardById({ params }: any) {
  const [info, setInfo] = useState<Info>();
  useEffect(() => {
    const fetchAllInfos = async () => {
      const res = await axios.get(`${API_URL}/google-sheet/name-cards/${params.id}`);
      setInfo(res.data);
    };
    fetchAllInfos();
  }, []);
  return <NameCard>{info}</NameCard>;
}
