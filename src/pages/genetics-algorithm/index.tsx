import { Helmet } from "react-helmet";
import PMTemplate from "@/components/PMTemplate.tsx";
import GA from "@/components/Sections/GA";
// import PMOverview from "@/components/Sections/PMOverview";
// import PMDetail from "@/components/Sections/PMDetail";
// import { useState } from "react";
// import type { ProfileMatchingData } from "@/services/profile-matching";
// import PMCreate from "@/components/Sections/PMCreate";

export default function GeneticsAlgorithm() {
  //   const [pm, setPm] = useState<ProfileMatchingData>();
  return (
    <>
      <Helmet>
        <title>UDAYU - GA</title>
        <meta name="description" content="Genetics Algorithm | udayu-spk" />
        <meta
          name="keywords"
          content="Genetics Algorithm, udayu, udayu-spk, pengambilan keputusan"
        />
        <link
          rel="canonical"
          href="https://udayu-spk.vercel.app/genetics-algorithm"
        />
      </Helmet>
      <PMTemplate>
        <GA />
      </PMTemplate>
    </>
  );
}
