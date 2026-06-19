import meta_seo from "@/lib/meta_seo";
import dynamic from "next/dynamic";
import Head from "next/head";
import { memo } from "react";

const AdvertisingPage = dynamic(
  () => import("@/components/advertising/AdvertisingPage"),
  {
    ssr: false,
  }
);

function Page() {
  return (
    <>
      <Head>
        <title>{meta_seo.pages.advertising.title}</title>
        <meta name="author" content={meta_seo.author} />
        <meta name="description" content={meta_seo.pages.advertising.desc} />
        <meta name="keywords" content={meta_seo.keywords} />
        {/* facebook */}
        <meta property="og:title" content={meta_seo.pages.advertising.title} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={meta_seo.pages.advertising.image} />

        {/* twitter */}
        <meta name="twitter:title" content={meta_seo.pages.advertising.title} />
        <meta
          name="twitter:description"
          content={meta_seo.pages.advertising.desc}
        />
        <meta name="twitter:image" content={meta_seo.pages.advertising.image} />
        <meta name="twitter:card" content="summary_large_image" />
        {/* favicon */}
        <link
          rel="shortcut icon"
          href="/assets/meta/favicon.ico"
          type="image/x-icon"
        />
      </Head>

      <AdvertisingPage />
    </>
  );
}

export default memo(Page);
