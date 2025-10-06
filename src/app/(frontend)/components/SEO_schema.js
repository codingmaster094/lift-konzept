// components/SEO_schema.jsx
import React from "react";
import dynamic from "next/dynamic";
import Alldata from "../untils/AllDataFatch";

const SchemaInjector = dynamic(() => import("../components/SchemaInjector"), {
  ssr: true,
});

const SEO_schema = async ({ slug, faqs }) => {
  try {
    const metadata = await Alldata(slug);
    const schemaJSON = metadata?.schema || null;
    console.log('metadata', metadata)

    if (!schemaJSON && (!faqs || faqs.length === 0)) return null;

    // The base URL for the page, which is currently used in mainEntityOfPage
    const pageUrl = "https://dr-marhenke-kollegen.vercel.app/"; // Define once

    // Build FAQ Schema
    const faqSchema =
      faqs && faqs.length > 0
        ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "url": pageUrl,
          "mainEntityOfPage": {
            "@id": pageUrl
          },
          "name": "FAQ – Psychotherapie",
          "headline": "Häufig gestellte Fragen zur Psychotherapie",
          "mainEntity": faqs.map((faq) => ({
            "@type": "Question",
            // ... (rest of the Question properties remain the same)
            "name": faq.faq_content_title,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.faq_content_description.replace(/<\/?p>/g, "")
            }
          }))
        }
        : null;

    return <SchemaInjector schemaJSON={schemaJSON} faqSchema={faqSchema} />;
  } catch (error) {
    console.error("Error fetching SEO schema:", error);
    return null;
  }
};

export default SEO_schema;
