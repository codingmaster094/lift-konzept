
import Homepage from "./home/page";
import generatePageMetadata from "./untils/generatePageMetadata";
export default async function Home() {
  return (
    <>
      <Homepage />
    </>
  );
}

export async function generateMetadata() {
  return generatePageMetadata("/home", {
    title: "home",
    description: "home",
  });
}