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
          <div>
            Mobile : <span className="font-mono text-xs">{children[MOBILE]}</span>
          </div>
          <div>
            Line Id : <span className="font-mono text-xs">{children[LINE_ID]}</span>
          </div>
          {/* <div>
            Facebook : <span className="font-mono text-xs">{children[FACEBOOK]}</span>
          </div> */}
          {/* <div>
            Instagram : <span className="font-mono text-xs">{children[INSTAGRAM]}</span>
          </div> */}
        </div>
      )}
    </>
  );
}
