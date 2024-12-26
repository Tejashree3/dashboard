import { ChartColumn, Home, NotepadText, Package, PackagePlus, Settings, ShoppingBag, UserCheck, UserPlus, Users } from "lucide-react";

import ProfileImage from "@/assets/profile-image.jpg";
import ProductImage from "@/assets/product-image.jpg";

export const navbarLinks = [
    {
        title: "Dashboard",
        links: [
            {
                label: "Blog",
                icon: Home,
                path: "/blogfront",
            },
            {
                label: "Services",
                icon: ChartColumn,
                path: "/servicesfront",
            },
            
            {
                label: "Client reviews",
                icon: NotepadText,
                path: "/clientfront",
            },
            {
                label: "Feature",
                icon: NotepadText,
                path: "/featurefront",
            },
            {
                label: "Investment",
                icon: NotepadText,
                path: "/investmentfront",
            },
        ],
    },
,


    {
        title: "Settings",
        links: [
            {
                label: "Settings",
                icon: Settings,
                path: "/settings",
            },
        ],
    },
];
