import { Metadata, MetadataRoute } from "next";
import { userAgent } from "next/server";

export default function robots():MetadataRoute.Robots {
    return {
        rules:[
            {
                userAgent:"*",
                allow:"/",
                disallow:"/dashboard",
            }
        ],
        sitemap:"https://orgafile.com/sitemap.xml"
    }
}

