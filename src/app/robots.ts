import { FRONTEND_BASE_URL } from "@/config/urls";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: new URL("sitemap.xml", FRONTEND_BASE_URL).toString(),
  };
}
