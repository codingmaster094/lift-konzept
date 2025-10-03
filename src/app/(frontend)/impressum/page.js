import React from "react";
import Alldata from "../untils/AllDataFatch";
import generatePageMetadata from "../untils/generatePageMetadata";

const page = async () => {
  let impressumPageData;
  try {
    impressumPageData = await Alldata("impressum");
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data.</div>;
  }

  if (!impressumPageData) {
    return <div>No data available.</div>;
  }
  return (
    <section className="policy_content term-policy">
      <div className="py-32 md:py-50 xl:py-[70px] bg-[#0065a3] text-white">
        <div className="container mx-auto px-[15px] ">
          <h1 className="text-h2"dangerouslySetInnerHTML={{__html:impressumPageData.title}}></h1>
        </div>
      </div>
      <div className="h-[clamp(2.5rem,-1.5789rem+6.5789vw,5rem)]"></div>
      <div className="container">
        <div
          dangerouslySetInnerHTML={{
            __html: impressumPageData.contents.Gutenberg_html,
          }}
        ></div>
      </div>
      <div className="h-[clamp(2.5rem,-1.5789rem+6.5789vw,5rem)]"></div>
    </section>
  );
};

export default page;

export async function generateMetadata() {
  return generatePageMetadata("/impressum", {
    title: "Impressum",
    description: "impressum",
  });
}