"use client";

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { CloudinaryImage, CloudinaryVideo, Actions, Transformation } from "@cloudinary/url-gen";
import { image, video, text } from "@cloudinary/url-gen/qualifiers/source";
import { Position } from "@cloudinary/url-gen/qualifiers";
import { compass, autoGravity, focusOn, xyCenter } from "@cloudinary/url-gen/qualifiers/gravity";
import { center } from "@cloudinary/url-gen/qualifiers/compass";
import { scale, fill, fillPad } from "@cloudinary/url-gen/actions/resize";
import { trim } from "@cloudinary/transformation-builder-sdk/actions/videoEdit";
import {
  lazyload,
  responsive,
  accessibility,
  placeholder,
  AdvancedImage,
  AdvancedVideo
} from "@cloudinary/react";

import { CldImage, CldOgImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const apiSecret = process.env.NEXT_PUBLIC_API_SECRET;
const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;

const { source } = Actions.Overlay;
const { byRadius } = Actions.RoundCorners;

const cloudinaryImage = new CloudinaryImage("samples/sheep", {
  apiKey,
  apiSecret,
  cloudName
}).overlay(source(image("sample")));

const cloudinaryVideo = new CloudinaryVideo("edeaf/test/trial-frame_nszad8", {
  apiKey,
  apiSecret,
  cloudName
})
  .videoEdit(trim().duration(1))
  .overlay(
    source(
      video("edeaf/test/nat_cw5wji").transformation(
        new Transformation().resize(scale().width(620)).roundCorners(byRadius(20))
      )
    ).position(new Position().offsetY(-0.05).gravity(compass(center())))
  )
  .overlay(
    source(text("Nat", "Itim_80").textColor("#5384ed")).position(
      new Position().offsetY(0.3).gravity(compass(center()))
    )
  )
  .roundCorners(byRadius(20))
  .format("mp4");

const cloudinaryVideoUnderray = new CloudinaryVideo("edeaf/test/nat_cw5wji", {
  apiKey,
  apiSecret,
  cloudName
})

  // .resize(fill().width(200).height(200))
  // .transformation(
  //   new Transformation().resize(scale().width(620)).roundCorners(byRadius(20))
  // )
  .underlay(
    source(
      video("edeaf/test/trial-frame_nszad8").transformation(
        new Transformation().resize(scale().width(2000)).roundCorners(byRadius(20))
      )
    ).position(new Position().offsetY(-0.05).gravity(compass(center())))
  )
  .overlay(
    source(text("Nat", "Itim_80").textColor("#5384ed")).position(
      new Position().offsetY(0.3).gravity(compass(center()))
    )
  )
  .roundCorners(byRadius(20))
  .format("mp4");

// const cloudinaryVideo = new CloudinaryVideo("samples/sea-turtle", {
//   apiKey,
//   apiSecret,
//   cloudName
// })
//   .overlay(
//     source(
//       video("samples/elephants").transformation(new Transformation().resize(scale().width(500)))
//     )
//   )
//   .format("mp4");
const cloudinaryVideoImage = new CloudinaryVideo("samples/sea-turtle", {
  apiKey,
  apiSecret,
  cloudName
}).underlay(source(image("sample")));

// console.log("url ----> ", cloudinaryVideo.toURL());

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

  const cloudinaryVideoXXX = new CloudinaryVideo("samples/sea-turtle", {
    apiKey,
    apiSecret,
    cloudName
  });

  const [videoUrl, setVideoUrl] = useState(cloudinaryVideoXXX);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchAllInfos = async () => {
      const res = await axios.get(`${API_URL}/google-sheet/name-cards/infos/dummy`);
      setInfos(res.data);
      setReload(false);
    };
    isReload && fetchAllInfos();
  }, [isReload]);

  const saveVideo = async (formData: FormData) => {
    const response = await axios.post("/api/video/dummy", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    return response.data;
  };

  const handleVideoChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
      console.log("dlfjs ----> ", e.target.files[0]);

      const formData = new FormData();
      formData.append("video", e.target.files[0]);
      const formDataArray = Array.from(formData.entries());
      console.log("wowww", formDataArray);
      console.log("sendddd ------>", formData);
      saveVideo(formData);

      // cloudinaryVideoXXX
      //   .overlay(
      //     source(
      //       video("samples/elephants").transformation(
      //         new Transformation().resize(scale().width(500))
      //       )
      //     )
      //   )
      //   .format("mp4");

      ///////////////////////////
      // cloudinaryVideoXXX
      //   .overlay(
      //     source(
      //       video(URL.createObjectURL(e.target.files[0])).transformation(
      //         new Transformation().resize(scale().width(500))
      //       )
      //     )
      //   )
      //   .format("mp4");
      // setVideoUrl(cloudinaryVideoXXX);
      ///////////////////////////

      // // gggggggggg
      // const result = await cloudinary.v2.uploader.upload(URL.createObjectURL(e.target.files[0]), {
      //   resource_type: "video"
      // });
      // console.log("ohhhhhhh ------> ", result);
    }
    // console.log("lolllllll ------> ", cloudinaryVideoXXX);
  };

  const onUploadCheck = async (result: any, widget: any) => {
    console.log("result --> ", result.info.public_id);
    console.log("widget --> ", widget);
  };

  // console.log("cldimg ---> ", cloudinaryImage);
  // console.log("cldvid ---> ", cloudinaryVideo);
  return (
    <>
      <div>Wawa</div>
      {/* <CldOgImage
        src="https://picsum.photos/200"
        text="My Social Card"
        alt="video"
        twitterTitle="My Social Card"
      /> */}
      <CldImage alt="wow" src="edeaf/name-card/cheer-up-lg_bwooam" width="200" height="200" />
      <CldUploadWidget uploadPreset="my-name-card" onUpload={onUploadCheck}>
        {({ open }) => {
          function handleOnClick(e: any) {
            e.preventDefault();
            console.log("hedo ??");
            open();
          }
          return <button onClick={handleOnClick}>Upload an Image</button>;
        }}
      </CldUploadWidget>
      <div>kkk</div>
      <AdvancedVideo cldVid={videoUrl} autoPlay loop muted />
      <CldUploadButton uploadPreset="/edeaf/test"></CldUploadButton>
      <div>hello xxx</div>
      <AdvancedImage
        cldImg={cloudinaryImage}
        // plugins={[lazyload(), responsive(), accessibility(), placeholder()]}
      />
      <AdvancedVideo cldVid={cloudinaryVideo} autoPlay loop muted />
      <AdvancedVideo cldVid={cloudinaryVideoUnderray} autoPlay loop muted />
      <AdvancedVideo cldVid={cloudinaryVideoImage} autoPlay loop muted />
      {/* <a href={cloudinaryVideo.toURL()} download>
        Click To Download
      </a> */}
      {/* <Link href={cloudinaryVideo.toURL()} download>
        Click To Download
      </Link> */}
      <input type="file" onChange={handleVideoChange} />
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
    </>
  );
}
