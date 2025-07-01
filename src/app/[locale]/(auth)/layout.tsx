"use client"
import LayoutAuth from "@/components/layouts/layout-auth"
type Props = {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
};

export default function AppLayout({ children }: Props) {
    
    return (
        <LayoutAuth>
            <>
                {children}
            </>
        </LayoutAuth>
    )
}