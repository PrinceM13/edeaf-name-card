import { NICK_NAME } from "@/config/constant";
import CardFrame from "./CardFrame";
import Contact from "./Contact";
import SignName from "./SignName";

export default function NameCard({ children }: any) {
  return (
    <CardFrame>
      <SignName>{children && children[NICK_NAME]}</SignName>
      <Contact>{children}</Contact>
    </CardFrame>
  );
}
