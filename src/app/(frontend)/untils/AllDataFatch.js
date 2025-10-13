export default async function Alldata(params) {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL ||
        "https://lift-konzept.vercel.app/my-route?slug="
      }${params}`,
      {  next: { revalidate: 60 }, }
    );

    if (!response) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error in Alldata:", error);
    throw error; // Rethrow the error to be caught in the calling component
  }
}
