export default async function generatePageMetadata(slug, fallback = {}) {
  try {
    const metadata = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL ||
        "https://lift-konzept-backend.vercel.app/api/globals"
      }${params}`,
      { next: { revalidate: 0 } }
    );

    const seo = metadata?.seo || {};

    const title = seo.meta.title || fallback.title || "Default Title";
    const description = seo.meta.description || fallback.description || "Default Description";

    const canonical =
      seo.meta.canonicalUrl && seo.meta.canonicalUrl !== ""
        ? seo.meta.canonicalUrl
        : ``;

    const robots =
      seo.robots && (seo.robots.index || seo.robots.follow)
        ? `${seo.robots.index ? "index" : "noindex"},${seo.robots.follow ? "follow" : "nofollow"}`
        : "noindex,nofollow";

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
        images: seo.social?.facebook?.image ? [seo.social.facebook.image] : [],
        publishedTime: post?.date,
        modifiedTime: post?.modified,
      },
      twitter: {
        card: "summary_large_image",
        title: seo.social?.twitter?.title || title,
        description: seo.social?.twitter?.description || description,
        images: seo.social?.twitter?.image ? [seo.social.twitter.image] : [],
      },
    };
  } catch (err) {
    console.error("Metadata fetch failed:", err);
    return {
      title: fallback.title || "Default Title",
      description: fallback.description || "Default Description",
    };
  }
}
