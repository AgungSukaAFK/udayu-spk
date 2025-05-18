import {Helmet} from "react-helmet";
import WPTemplate from "@/components/WPTemplate.tsx";

export default function WeightedProduct() {
    return (
        <>
            <Helmet>
                <title>UDAYU - WP</title>
                <meta name="description" content="Weighted Product | udayu-spk" />
                <meta name="keywords" content="Weighted Product, udayu-spk, pengambilan keputusan" />
                <link rel="canonical" href="https://udayu-spk.vercel.app/weighted-product" />
            </Helmet>
            <WPTemplate></WPTemplate>
        </>
    )
}