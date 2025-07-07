import Header from "./common/header"
import Footer from "./common/footer"

export default function LayoutDash({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}