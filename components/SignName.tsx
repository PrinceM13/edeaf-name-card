import { useEffect, useRef, useState } from "react";

import axios from "axios";

import { CldUploadWidget } from "next-cloudinary";

import { AdvancedVideo } from "@cloudinary/react";
import { CloudinaryVideo, Actions, Transformation } from "@cloudinary/url-gen";

import { Position } from "@cloudinary/url-gen/qualifiers";

import { video, text } from "@cloudinary/url-gen/qualifiers/source";
import { compass } from "@cloudinary/url-gen/qualifiers/gravity";
import { center } from "@cloudinary/url-gen/qualifiers/compass";
import { scale, fill } from "@cloudinary/url-gen/actions/resize";

import { trim } from "@cloudinary/transformation-builder-sdk/actions/videoEdit";
import { useRouter } from "next/navigation";
import { DURATION, FIRST_NAME, LAST_NAME, VIDEO } from "@/config/constant";

const { source } = Actions.Overlay;
const { byRadius } = Actions.RoundCorners;

const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function SignName({ children, info }: any) {
  const [publicId, setPublicId] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [duration, setDuration] = useState(1);

  const uploadButton = useRef<HTMLButtonElement>(null);

  const handleUpload = async (result: any) => {
    const id = `${info[FIRST_NAME].toLocaleLowerCase()}-${info[LAST_NAME].toLocaleLowerCase()}`;
    const newInfo = {
      ...info,
      [VIDEO]: result.info.public_id,
      [DURATION]: String(result.info.duration)
    };

    // update google sheet
    await axios.patch(`${API_URL}/google-sheet/name-cards/info/${id}`, newInfo);

    setPublicId(result.info.public_id);
    setDuration(result.info.duration);
  };

  // const cloudinaryVideo = new CloudinaryVideo("edeaf/name-card/frames/frame_8sec_mjvh7x", {
  const cloudinaryVideo = new CloudinaryVideo("edeaf/name-card/frames/thsl-frames-8s_dswymn", {
    apiKey,
    apiSecret,
    cloudName
  })
    .videoEdit(trim().duration(duration))
    .overlay(
      source(
        video(publicId).transformation(
          // new Transformation().resize(fill().width(620).height(620)).roundCorners(byRadius(20))
          new Transformation().resize(fill().width(620).height(620)).roundCorners(byRadius(20))
          // new Transformation().resize(scale().width(620).height(620)).roundCorners(byRadius(20)) // change ratio
        )
        // ).position(new Position().offsetY(-0.05).gravity(compass(center())))
      ).position(new Position().offsetY(-0.02).gravity(compass(center())))
    )
    .overlay(
      source(text(children, "Itim_80").textColor("#5384ed")).position(
        // new Position().offsetY(0.3).gravity(compass(center()))
        new Position().offsetY(0.33).gravity(compass(center()))
      )
    )
    .format("mp4");

  const router = useRouter();
  const handleDownload = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = ("0" + (now.getMonth() + 1)).slice(-2); // add leading zero if needed
    const day = ("0" + now.getDate()).slice(-2); // add leading zero if needed
    const hour = ("0" + now.getHours()).slice(-2); // add leading zero if needed
    const minute = ("0" + now.getMinutes()).slice(-2); // add leading zero if needed
    const second = ("0" + now.getSeconds()).slice(-2); // add leading zero if needed
    const formattedDate = `${month}${day}${year}-h${hour}m${minute}s${second}`;

    const downloadLinkWithName = videoUrl.replace(
      "/upload/fl_attachment/",
      `/upload/fl_attachment:edeaf-sign-name-${formattedDate}/`
    ); // assign name from date-time
    router.push(downloadLinkWithName);
  };

  useEffect(() => {
    const downloadLink = cloudinaryVideo.toURL().replace("/upload/", "/upload/fl_attachment/"); // change to download link using /fl_attachment/
    setVideoUrl(downloadLink);
  }, [cloudinaryVideo.toURL()]);

  useEffect(() => {
    if (info[VIDEO]) {
      setDuration(info[DURATION]);
      setPublicId(info[VIDEO]);
    }
  }, [info[VIDEO]]);

  return (
    <div className="relative">
      {publicId ? (
        <AdvancedVideo
          onClick={handleDownload}
          className="rounded-lg cursor-pointer"
          cldVid={cloudinaryVideo}
          autoPlay
          loop
          muted
        />
      ) : (
        <>
          <img
            // src="https://res.cloudinary.com/dhr35jlbz/image/upload/v1681792641/edeaf/name-card/frames/edeaf-frame_k1y5kx.png"
            src="https://res.cloudinary.com/dhr35jlbz/image/upload/v1682781762/edeaf/name-card/frames/thsl-frame_iemevu.png"
            className="rounded-lg"
          />
          {/* <div className="absolute top-[75px] left-[44px] flex flex-col items-center"> */}
          <div className="absolute top-[85px] left-[44px] flex flex-col items-center gap-7">
            <div
              className="h-[200px] w-[200px] rounded-lg cursor-pointer"
              onClick={() => uploadButton.current?.click()}
            >
              <img
                src="https://res.cloudinary.com/dhr35jlbz/image/upload/v1681801901/edeaf/name-card/profile-videos/edeaf-sl-hello_oaui6l.png"
                className="h-[200px] w-[200px] rounded-lg"
              />
            </div>
            <div className="text-3xl text-[#5384ed] rounded-lg px-2">{children}</div>
          </div>
        </>
      )}

      <div className="hidden">
        <CldUploadWidget uploadPreset="edeaf-name-card" onUpload={handleUpload}>
          {({ open }) => {
            function handleOnClick(e: any) {
              e.preventDefault();
              open();
            }
            return (
              <button ref={uploadButton} onClick={handleOnClick}>
                Upload an Image
              </button>
            );
          }}
        </CldUploadWidget>
      </div>
    </div>
  );
}
