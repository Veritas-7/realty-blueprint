import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeMeta, notFoundMeta, generateBreadcrumbJsonLd, generateWebSiteJsonLd, SITE_URL } from "@/data/seo-config";

interface SEOHeadProps {
  is404?: boolean;
}

export const SEOHead = ({ is404 }: SEOHeadProps) => {
  const location = useLocation();
  const path = location.pathname;
  const meta = is404 ? notFoundMeta : routeMeta[path];

  useEffect(() => {
    if (!meta) return;

    document.title = meta.title;

    const setMeta = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const canonicalPath = meta.canonicalPath ?? path;
    const absoluteUrl = `${SITE_URL}${canonicalPath}`;
    const absoluteOgImage = meta.ogImage ? `${SITE_URL}${meta.ogImage}` : `${SITE_URL}/og-image.svg`;

    setMeta("description", meta.description);
    setMeta("og:title", meta.title, true);
    setMeta("og:description", meta.description, true);
    setMeta("og:url", absoluteUrl, true);
    setMeta("og:image", absoluteOgImage, true);
    setMeta("og:type", "website", true);
    setMeta("twitter:title", meta.title);
    setMeta("twitter:description", meta.description);
    setMeta("twitter:image", absoluteOgImage);
    setMeta("twitter:card", "summary_large_image");

    if (meta.robots) {
      setMeta("robots", meta.robots);
    } else {
      const robotsEl = document.querySelector('meta[name="robots"]');
      if (robotsEl) robotsEl.remove();
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", absoluteUrl);

    // JSON-LD
    const existingLd = document.querySelectorAll('script[data-seo-jsonld]');
    existingLd.forEach((el) => el.remove());

    // BreadcrumbList
    const breadcrumbScript = document.createElement("script");
    breadcrumbScript.type = "application/ld+json";
    breadcrumbScript.setAttribute("data-seo-jsonld", "true");
    breadcrumbScript.textContent = JSON.stringify(generateBreadcrumbJsonLd(canonicalPath, meta.title));
    document.head.appendChild(breadcrumbScript);

    // WebSite on home
    if (path === "/") {
      const wsScript = document.createElement("script");
      wsScript.type = "application/ld+json";
      wsScript.setAttribute("data-seo-jsonld", "true");
      wsScript.textContent = JSON.stringify(generateWebSiteJsonLd());
      document.head.appendChild(wsScript);
    }

    return () => {
      document.querySelectorAll('script[data-seo-jsonld]').forEach((el) => el.remove());
    };
  }, [path, meta]);

  return null;
};
