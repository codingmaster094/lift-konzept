export default async function generatepostMetadata(params , fallback ={}) {
  try {
    const metadata = await fetch(
      `${process.env.NEXT_RATGEBER_SINGLE_BASE_URL ||
      "https://lift-konzept.vercel.app/api/ratgeber?where[slug][equals]="
      }${params}`,
      { next: { revalidate: 60 } }
    );

    if (!metadata) {
      throw new Error(`Failed to fetch data: ${metadata.statusText}`);
    }
    const data = await metadata.json();
    const seo = data?.docs[0]?.seo || {};

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
        // images: seo.social?.facebook?.image ? [seo.social.facebook.image] : [],
        // publishedTime: post?.date,
        // modifiedTime: post?.modified,
      },
      // twitter: {
      //   card: "summary_large_image",
      //   title: seo.social?.twitter?.title || title,
      //   description: seo.social?.twitter?.description || description,
      //   images: seo.social?.twitter?.image ? [seo.social.twitter.image] : [],
      // },
    };


  } catch (error) {
    console.error("Error in Alldata:", error);
    throw error; // Rethrow the error to be caught in the calling component
  }

  // try {
  //   const metadata = await fetch(
  //     `${process.env.NEXT_PUBLIC_BASE_URL ||
  //     "https://lift-konzept.vercel.app/api/globals/home"
  //     }${params}`,
  //     { next: { revalidate: 0 } }
  //   );

  //   console.log('metadata', metadata)
  //   const seo = metadata?.seo || {};
  //   let title
  //   let description
  //   let canonical
  //   let robots
  //   if (seo) {

  //     title = seo.meta.title !=undefined  ? seo.meta.title : "Default title"
  //     description = seo.meta.description || fallback.description || "Default Description";

  //     canonical =
  //       seo.meta.canonicalUrl && seo.meta.canonicalUrl !== ""
  //         ? seo.meta.canonicalUrl
  //         : ``;

  //     robots =
  //       seo.robots && (seo.robots.index || seo.robots.follow)
  //         ? `${seo.robots.index ? "index" : "noindex"},${seo.robots.follow ? "follow" : "nofollow"}`
  //         : "noindex,nofollow";
  //   }


  //   return {
  //     title,
  //     description,
  //     alternates: {
  //       canonical,
  //     },
  //     robots,
  //     openGraph: {
  //       type: "article",
  //       title: seo.social?.facebook?.title || title,
  //       description: seo.social?.facebook?.description || description,
  //       url: canonical,
  //       images: seo.social?.facebook?.image ? [seo.social.facebook.image] : [],
  //       publishedTime: post?.date,
  //       modifiedTime: post?.modified,
  //     },
  //     twitter: {
  //       card: "summary_large_image",
  //       title: seo.social?.twitter?.title || title,
  //       description: seo.social?.twitter?.description || description,
  //       images: seo.social?.twitter?.image ? [seo.social.twitter.image] : [],
  //     },
  //   };
  // } catch (err) {
  //   console.error("Metadata fetch failed:", err);
  //   return {
  //     title: fallback.title || "Default Title",
  //     description: fallback.description || "Default Description",
  //   };
  // }
}
