import CardFrame from "./CardFrame";
import Contact from "./Contact";
import SignName from "./SignName";

export default function NameCard() {
  return (
    <CardFrame>
      <SignName />
      <Contact />
    </CardFrame>
  );
}
