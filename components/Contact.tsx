"use client";

import {
  EMAIL,
  FACEBOOK,
  FIRST_NAME,
  INSTAGRAM,
  LAST_NAME,
  LINE_ID,
  MOBILE
} from "@/config/constant";

export default function Contact({ children }: any) {
  return (
    <>
      {children && (
        <div className="text-xl">
          <div>
            Name :{" "}
            <span className="font-mono text-xs">
              {children[FIRST_NAME]} {children[LAST_NAME]}
            </span>
          </div>
          <div>
            Email : <span className="font-mono text-xs">{children[EMAIL]}</span>
          </div>
          {/* <div>Mobile : {children[MOBILE]}</div> */}
          {/* <div>Line Id : {children[LINE_ID]}</div> */}
          {/* <div>Facebook : {children[FACEBOOK]}</div> */}
          <div>
            Instagram : <span className="font-mono text-xs">{children[INSTAGRAM]}</span>
          </div>
        </div>
      )}
    </>
  );
}
