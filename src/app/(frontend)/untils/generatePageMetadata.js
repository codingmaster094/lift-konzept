export default async function generatePageMetadata(params, fallback = {}) {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL ||
      "https://lift-konzept.vercel.app/my-route?slug=";

    const res = await fetch(`${baseUrl}${params}`, {
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch SEO data: ${res.statusText}`);
    }

    const json = await res.json();

    // ✅ Ensure data structure exists
    const seo = json?.data?.seo ?? {};
    const meta = seo?.meta ?? {};

    const title =
      meta?.title || fallback.title || "Default Title";
    const description =
      meta?.description || fallback.description || "Default Description";

    const canonical =
      meta?.canonicalUrl || "";

    const robots =
      meta?.indexing && meta?.following
        ? `${meta.indexing},${meta.following}`
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
        title: title,
        description: description,
        url: canonical,
      },
    };
  } catch (error) {
    console.error("Error in generatePageMetadata:", error);

    // ✅ Never throw during build, always return fallback
    return {
      title: fallback.title || "Default Title",
      description: fallback.description || "Default Description",
    };
  }
}
