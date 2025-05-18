import {Helmet} from "react-helmet";
import PMTemplate from "@/components/PMTemplate.tsx";

export default function ProfileMatching() {
    return (
        <>
            <Helmet>
                <title>UDAYU - PM</title>
                <meta name="description" content="Profile Matching | udayu-spk" />
                <meta name="keywords" content="Profile Matching, udayu-spk, pengambilan keputusan" />
                <link rel="canonical" href="https://udayu-spk.vercel.app/profile-matching" />
            </Helmet>
            <PMTemplate></PMTemplate>
        </>
    )
}