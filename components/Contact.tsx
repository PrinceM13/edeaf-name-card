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
        <div className="text-sm">
          <div>
            Name : {children[FIRST_NAME]} {children[LAST_NAME]}
          </div>
          <div>Email : {children[EMAIL]}</div>
          {/* <div>Mobile : {children[MOBILE]}</div> */}
          {/* <div>Line Id : {children[LINE_ID]}</div> */}
          {/* <div>Facebook : {children[FACEBOOK]}</div> */}
          <div>Instagram : {children[INSTAGRAM]}</div>
        </div>
      )}
    </>
  );
}
