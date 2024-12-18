import { MetadataRoute } from "next";

export default function sitemap():MetadataRoute.Sitemap {
    return [
        {
            url:"https://orgafile.com/",
            changeFrequency:"daily",
            priority:1
        },
        {
            url:"https://orgafile.com/pricing",
            changeFrequency:"daily",
            priority:0.9
        },
        {
            url:"https://orgafile.com/auth/signin",
            changeFrequency:"daily",
            priority:0.7
        },
        {
            url:"https://orgafile.com/auth/signup",
            changeFrequency:"daily",
            priority:0.7
        },
        {
            url:"https://orgafile.com/legal",
            changeFrequency:"daily",
            priority:0.5
        },
    ]
}