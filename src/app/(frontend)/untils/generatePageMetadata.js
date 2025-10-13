export default async function generatePageMetadata(params, fallback = {}) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "https://lift-konzept.vercel.app/my-route?slug="}${params}`,
      { next: { revalidate: 60 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.statusText}`);
    }

    const data = await res.json();

    const seo = data?.data?.seo || {};
    const meta = seo?.meta || {};
    const social = seo?.social || {};

    const title = meta?.title || fallback?.title || "Default title";
    const description = meta?.description || fallback?.description || "Default description";
    const canonical = meta?.canonicalUrl || "";
    const robots = `${meta?.indexing || "noindex"},${meta?.following || "nofollow"}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots,
      openGraph: {
        type: "article",
        title: social?.facebook?.title || title,
        description: social?.facebook?.description || description,
        url: canonical,
      },
    };
  } catch (error) {
    console.error("Error in Alldata:", error);
    return {
      title: fallback?.title || "Default title",
      description: fallback?.description || "Default description",
      robots: "noindex,nofollow",
    };
  }
}
