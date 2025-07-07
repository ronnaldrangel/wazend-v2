
import LayoutDash from "@/components/layouts/layout-dash"
type Props = {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
};

export default function AppLayout({ children }: Props) {
    
    return (
        <LayoutDash>
            <>
                {children}
            </>
        </LayoutDash>
    )
}