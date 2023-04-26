import { DURATION, NICK_NAME, VIDEO } from "@/config/constant";
import CardFrame from "./CardFrame";
import Contact from "./Contact";
import SignName from "./SignName";

export default function NameCard({ children }: any) {
  return (
    <CardFrame>
      <SignName info={children || {}}>{children && children[NICK_NAME]}</SignName>
      {!children ? (
        <div className="text-center text-2xl">Loading...</div>
      ) : (
        <Contact>{children}</Contact>
      )}
    </CardFrame>
  );
}
