import { Helmet } from "react-helmet";
import PMTemplate from "@/components/PMTemplate.tsx";
import PMOverview from "@/components/Sections/PMOverview";
import PMDetail from "@/components/Sections/PMDetail";
import { useState } from "react";
import type { ProfileMatchingData } from "@/services/profile-matching";
import PMCreate from "@/components/Sections/PMCreate";

export default function ProfileMatching() {
  const [pm, setPm] = useState<ProfileMatchingData>();
  return (
    <>
      <Helmet>
        <title>UDAYU - PM</title>
        <meta name="description" content="Profile Matching | udayu-spk" />
        <meta
          name="keywords"
          content="Profile Matching, udayu-spk, pengambilan keputusan"
        />
        <link
          rel="canonical"
          href="https://udayu-spk.vercel.app/profile-matching"
        />
      </Helmet>
      <PMTemplate>
        <PMOverview setPm={setPm} />
        <PMDetail pm={pm} setPm={setPm} />
        <PMCreate />
      </PMTemplate>
    </>
  );
}
