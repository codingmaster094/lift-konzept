// components/SEO_schema.jsx
import React from "react";
import dynamic from "next/dynamic";
import Alldata from "../untils/AllDataFatch";

const SchemaInjector = dynamic(() => import("../components/SchemaInjector"), {
  ssr: true,
});

const SEO_schema = async ({ slug, faqs }) => {
  try {
    const metadata =  await Alldata(slug);
    const schemaJSON = metadata || null;
    console.log('metadata', metadata)

    if (!schemaJSON && (!faqs || faqs.length === 0)) return null;

    // The base URL for the page, which is currently used in mainEntityOfPage
    const pageUrl = "https://lift-konzept.vercel.app/"; // Define once
    // Build FAQ Schema
    const Schema =
      schemaJSON 
        ? {
          "@context": "https://schema.org",
          "@type": "Article",
          "url": pageUrl,
          "mainEntityOfPage": {
            "@id": pageUrl
          },
          "name": "FAQ – Psychotherapie",
          "headline": schemaJSON.seo.meta.title,
          "description": schemaJSON.seo.meta.description,
          "datePublished":schemaJSON.publishedAt,
          "dateModified": schemaJSON.updatedAt,
          "author":{
            "@type":"Person",
            "name": schemaJSON.author.email
          },
        }
        : null;

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
            "name": faq.title,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": faq.richText.root.children[0].children[0].text.replace(/<\/?p>/g, "")
            }
          }))
        }
        : null;

    return <SchemaInjector schemaJSON={Schema} faqSchema={faqSchema} />;
  } catch (error) {
    console.error("Error fetching SEO schema:", error);
    return null;
  }
};

export default SEO_schema;
