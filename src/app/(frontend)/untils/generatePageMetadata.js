// src/app/(frontend)/untils/generatePageMetadata.js
export default async function generatePageMetadata(params, fallback = {}) {
  // Determine slug safely (params might be a string or an object like { slug: '...' })
  const slug =
    typeof params === "string"
      ? params
      : params && (params.slug ?? params?.params?.slug ?? "");
  const base =
    process.env.NEXT_PUBLIC_BASE_URL ??
    "https://lift-konzept.vercel.app/my-route?slug=";

  // Build final URL (ensure slug is encoded)
  const url =
    base.endsWith("=") || base.includes("?")
      ? `${base}${encodeURIComponent(slug)}`
      : `${base}${encodeURIComponent(slug)}`;

  try {
    const res = await fetch(url, { next: { revalidate: 60 } });

    // If fetch failed (network or server error), log helpful info and return defaults
    if (!res.ok) {
      // Read text (HTML error page) for debugging
      let text;
      try {
        text = await res.text();
      } catch (readErr) {
        text = `<failed to read response body: ${readErr.message}>`;
      }
      console.error(
        `generatePageMetadata: fetch to ${url} returned HTTP ${res.status}. Body (truncated):\n`,
        text.slice(0, 1200)
      );

      // Return safe default metadata so build/page generation doesn't crash
      const title = fallback.title || "Default title";
      const description = fallback.description || "Default description";
      return {
        title,
        description,
        alternates: { canonical: "" },
        robots: "noindex,nofollow",
        openGraph: {
          type: "article",
          title,
          description,
          url: "",
        },
      };
    }

    // Validate content-type
    const contentType = res.headers.get("content-type") || "";
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.error(
        `generatePageMetadata: expected JSON but got content-type "${contentType}" from ${url}. Body (truncated):\n`,
        text.slice(0, 1200)
      );
      // fallback as above
      const title = fallback.title || "Default title";
      const description = fallback.description || "Default description";
      return {
        title,
        description,
        alternates: { canonical: "" },
        robots: "noindex,nofollow",
        openGraph: {
          type: "article",
          title,
          description,
          url: "",
        },
      };
    }

    // Safe parse
    const data = await res.json();
    const seo = data?.data?.seo || {};

    const title =
      seo?.meta?.title !== undefined ? seo.meta.title : fallback.title || "Default title";
    const description =
      seo?.meta?.description || fallback.description || "Default Description";

    const canonical =
      seo?.meta?.canonicalUrl && seo.meta.canonicalUrl !== ""
        ? seo.meta.canonicalUrl
        : "";

    const robots = `${seo?.meta?.indexing ?? "noindex"},${seo?.meta?.following ?? "nofollow"}`;

    return {
      title,
      description,
      alternates: {
        canonical,
      },
      robots,
      openGraph: {
        type: "article",
        title: seo?.social?.facebook?.title || title,
        description: seo?.social?.facebook?.description || description,
        url: canonical,
      },
    };
  } catch (error) {
    // Network or unexpected error — log and return safe defaults
    console.error("generatePageMetadata: unexpected error:", error);
    const title = fallback.title || "Default title";
    const description = fallback.description || "Default description";
    return {
      title,
      description,
      alternates: { canonical: "" },
      robots: "noindex,nofollow",
      openGraph: {
        type: "article",
        title,
        description,
        url: "",
      },
    };
  }
}
