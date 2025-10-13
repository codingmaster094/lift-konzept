import React from 'react'
import Alldata from '../untils/AllDataFatch';
import Footer from '../components/Footer';

const page = async() => {
     let FooterData;
      try {
        FooterData = await Alldata("footer");
      } catch (error) {
        console.error("Error fetching data:", error);
        return <div>Error loading data.</div>;
      }
    
      if (!FooterData) {
        return <div>No data available.</div>;
      }

  return (
    <Footer FooterData={FooterData}/>
  )
}

export default page