import React from 'react'
import GetSinglePosts from '../../untils/GetSinglePost'
import HeroBanner from '../../components/HeroBanner';
import SingleDetails from '../../components/SingleDetails';
import generatepostMetadata from '../../untils/generatepostMetadata';
import SEO_schema from '../../components/SEO_schema';

const page = async({params}) => {
    const { slug } = await params;
    let RatgeberSingleData
    try {
        RatgeberSingleData = await GetSinglePosts(slug);
      } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading data.</div>;
      }
    
      if (!RatgeberSingleData) {
        return <div>No data available.</div>;
      }

  return (
    <>
    <SEO_schema slug={slug} faqs={""} />
     <HeroBanner
        image="/images/home_hero-bg.png"
        images_1="/images/hero-btm-bg.png"
        heroData={RatgeberSingleData?.hero}
      />
      <SingleDetails title={RatgeberSingleData.title} SingleData={RatgeberSingleData}/>

    </>
  )
}

export default page

export async function generateMetadata({params}) {
  const {slug} = await params
  return generatepostMetadata(`${slug}`, {
    title: `${slug}`,
    description: `${slug}`,
  });
}