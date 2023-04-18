"use client";

import { ChangeEvent, useRef, useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const inputVideo = useRef<HTMLInputElement>(null);

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      console.log(e.target.files[0]);
      setFile(e.target.files[0]);
    }
  };

  return (
    <>
      {/* picture */}
      <div className="p-4 mx-auto mt-20 w-[300px] rounded-xl bg-[#ebf6fc] shadow-gray-800 shadow-lg flex flex-col gap-4">
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dhr35jlbz/image/upload/v1681792641/edeaf/name-card/frames/edeaf-frame_k1y5kx.png"
            className="rounded-lg"
          />
          <div className="absolute top-[75px] left-[34px] flex flex-col items-center gap-3">
            <input
              type="file"
              ref={inputVideo}
              className="hidden"
              onChange={(e) => handleVideoChange(e)}
            />
            <div
              className="h-[200px] w-[200px] rounded-lg cursor-pointer"
              onClick={() => inputVideo.current?.click()}
            >
              {!file ? (
                <img
                  src="https://res.cloudinary.com/dhr35jlbz/image/upload/v1681801901/edeaf/name-card/profile-videos/edeaf-sl-hello_oaui6l.png"
                  className="h-[200px] w-[200px] rounded-lg"
                />
              ) : (
                <video
                  src={file && URL.createObjectURL(file)}
                  // src="https://res.cloudinary.com/dhr35jlbz/video/upload/v1681792559/edeaf/name-card/profile-videos/ink-1_h7g6e3.mov"
                  className="h-[200px] w-[200px] rounded-lg"
                  autoPlay
                  loop
                  muted
                />
              )}
            </div>
            {file && <div className="text-xl text-[#5384ed] rounded-lg px-2 py-1">Inksy</div>}
          </div>
        </div>

        {/* contact */}
        <div className="text-sm">
          <div>Name : Waruntorn Paonil</div>
          <div>Email : Ink.Waruntorn@Paonil.com</div>
          <div>Mobile : 089-999-9999</div>
          <div>Line Id : Inksy1994</div>
        </div>
      </div>
    </>
  );
}
