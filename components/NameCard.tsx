import { DURATION, NICK_NAME, VIDEO } from "@/config/constant";
import CardFrame from "./CardFrame";
import Contact from "./Contact";
import SignName from "./SignName";

export default function NameCard({ children }: any) {
  return (
    <CardFrame>
      <SignName
        isVideoAvailable={children && children[VIDEO]}
        durationTime={children && children[DURATION]}
      >
        {children && children[NICK_NAME]}
      </SignName>
      {!children ? (
        <div className="text-center text-2xl">Loading...</div>
      ) : (
        <Contact>{children}</Contact>
      )}
    </CardFrame>
  );
}
