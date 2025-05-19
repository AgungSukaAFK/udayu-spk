import { Helmet } from "react-helmet";
import PMTemplate from "@/components/PMTemplate.tsx";
// import PMOverview from "@/components/Sections/PMOverview";
// import PMDetail from "@/components/Sections/PMDetail";
// import { useState } from "react";
// import type { ProfileMatchingData } from "@/services/profile-matching";
// import PMCreate from "@/components/Sections/PMCreate";

export default function WeightedProduct() {
  //   const [pm, setPm] = useState<ProfileMatchingData>();
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
        <div className="mt-4 text-xl font-bold font-lexend">Coming soon...</div>
        {/* <PMOverview setPm={setPm} />
        <PMDetail pm={pm} setPm={setPm} />
        <PMCreate /> */}
      </PMTemplate>
    </>
  );
}
