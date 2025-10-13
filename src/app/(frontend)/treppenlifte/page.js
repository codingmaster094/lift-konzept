import CtaSection from '../components/CtaSection'
import HeroBanner from '../components/HeroBanner'
import Logos from '../components/Logos'
import TreppenliftAdvisor from '../components/TreppenliftAdvisor'
import TreppenliftGallery from '../components/TreppenliftGallery'
import React from 'react'
import Alldata from '../untils/AllDataFatch'
import generatePageMetadata from '../untils/generatePageMetadata'
import SEO_schema from '../components/SEO_schema'

const page = async () => {
  let treppenlifteData;
  try {
    treppenlifteData = await Alldata("treppenlifte");
  } catch (error) {
    console.error("Error fetching data:", error);
    return <div>Error loading data.</div>;
  }

  if (!treppenlifteData) {
    return <div>No data available.</div>;
  }
  return (
    <>
      <SEO_schema slug="treppenlifte" faqs={""} />
      <HeroBanner
        image="/images/home_hero-bg.png"
        images_1="/images/hero-btm-bg.png"
        heroData={treppenlifteData?.hero}
      />

      <Logos CompanyLogo={treppenlifteData.companyLogo.logos} />
      <TreppenliftAdvisor TreppenliftAdvisorData={treppenlifteData.TreppenliftAdvisor} />
      <TreppenliftGallery TreppenliftGalleryData={treppenlifteData.TreppenliftGallery} />
      <CtaSection CtaSectionData={treppenlifteData.CtaSection} />
    </>

  )
}

export default page

export async function generateMetadata() {
  return generatePageMetadata("treppenlifte", {
    title: "Treppenlifte",
    description: "treppenlifte",
  });
}