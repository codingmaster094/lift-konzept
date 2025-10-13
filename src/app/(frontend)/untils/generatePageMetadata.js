export default async function generatePageMetadata(params , fallback ={}) {
  try {
    const metadata = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL ||
      "https://lift-konzept.vercel.app//my-route?slug="
      }${params}`,
      { next: { revalidate: 60 } }
    );

    if (!metadata) {
      throw new Error(`Failed to fetch data: ${metadata.statusText}`);
    }

    const data = await metadata.json();
    const seo = data?.data?.seo || {};

    const title = seo.meta.title != undefined ? seo.meta.title : "Default title"
    const description = seo.meta.description || fallback.description || "Default Description";

    const canonical =
      seo.meta.canonicalUrl && seo.meta.canonicalUrl !== ""
        ? seo.meta.canonicalUrl
        : ``;

    const robots = `${seo.meta.indexing},${seo.meta.following}`
        ||  "noindex,nofollow";

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots,
      openGraph: {
        type: "article",
        title: seo.social?.facebook?.title || title,
        description: seo.social?.facebook?.description || description,
        url: canonical,
      },
    };


  } catch (error) {
    console.error("Error in Alldata:", error);
    throw error; // Rethrow the error to be caught in the calling component
  }
}
