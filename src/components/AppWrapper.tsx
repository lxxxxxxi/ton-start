import React from "react";
import TNavBar from "./TNavBar";

export default function AppWrapper({
    title,
    children,
}: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <TNavBar title={title} /> {children}
        </div>
    );
}
