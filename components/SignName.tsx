"use client";

import { ChangeEvent, useRef, useState } from "react";

export default function SignName({ children }: any) {
  const [file, setFile] = useState<File | null>(null);
  const inputVideo = useRef<HTMLInputElement>(null);

  const handleVideoChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div className="relative">
      <img
        src="https://res.cloudinary.com/dhr35jlbz/image/upload/v1681792641/edeaf/name-card/frames/edeaf-frame_k1y5kx.png"
        className="rounded-lg"
      />
      <div className="absolute top-[75px] left-[44px] flex flex-col items-center gap-3">
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
              className="h-[200px] w-[200px] rounded-lg"
              autoPlay
              loop
              muted
            />
          )}
        </div>
        {file && <div className="text-4xl text-[#5384ed] rounded-lg px-2 py-1">{children}</div>}
      </div>
    </div>
  );
}
