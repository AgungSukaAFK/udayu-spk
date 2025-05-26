import { Helmet } from "react-helmet";
import PMTemplate from "@/components/PMTemplate.tsx";
import WPCreate from "@/components/Sections/WPCreate";
import WPOverview from "@/components/Sections/WPOverview";
import { useState } from "react";
import type { WeightedProductData } from "@/services/weighted-product";
import WPDetail from "@/components/Sections/WPDetail";

export default function WeightedProduct() {
  const [wp, setWp] = useState<WeightedProductData>();
  return (
    <>
      <Helmet>
        <title>UDAYU - WP</title>
        <meta name="description" content="Weighted Product | udayu-spk" />
        <meta
          name="keywords"
          content="Weighted Product, udayu, udayu-spk, pengambilan keputusan"
        />
        <link
          rel="canonical"
          href="https://udayu-spk.vercel.app/weighted-product"
        />
      </Helmet>
      <PMTemplate>
        <WPOverview setWp={setWp} />
        <WPDetail wp={wp} setWp={setWp} />
        <WPCreate />
      </PMTemplate>
    </>
  );
}
