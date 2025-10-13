import React from "react";
import Alldata from "../untils/AllDataFatch";
import generatePageMetadata from "../untils/generatePageMetadata";
import SEO_schema from "../components/SEO_schema";

const page = async () => {
  let datenschutzerklarungPageData;
  try {
    datenschutzerklarungPageData = await Alldata("datenschutzerklarung");
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data.</div>;
  }

  if (!datenschutzerklarungPageData) {
    return <div>No data available.</div>;
  }
  console.log('datenschutzerklarungPageData', datenschutzerklarungPageData)
  return (
    <>
    <SEO_schema slug="datenschutzerklarung" faqs={""} />
    <section className="policy_content term-policy">
      <div className="py-32 md:py-50 xl:py-[70px] bg-[#0065a3] text-white">
        <div className="container mx-auto px-[15px] ">
          <h1 className="text-h2" dangerouslySetInnerHTML={{__html:datenschutzerklarungPageData.title}}></h1>
        </div>
      </div>
      <div className="h-[clamp(2.5rem,-1.5789rem+6.5789vw,5rem)]"></div>
      <div className="container">
        <div
          dangerouslySetInnerHTML={{
            __html: datenschutzerklarungPageData.contents.Gutenberg_html,
          }}
          ></div>
      </div>
      <div className="h-[clamp(2.5rem,-1.5789rem+6.5789vw,5rem)]"></div>
    </section>
          </>
  );
};

export default page;

export async function generateMetadata() {
  return generatePageMetadata("datenschutzerklarung", {
    title: "Datenschutzerklarung",
    description: "datenschutzerklarung",
  });
}