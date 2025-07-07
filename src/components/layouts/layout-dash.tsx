import Header from "./common/header"
import Footer from "./common/footer"
import ButtonWhatsapp from "./components/button-whatsapp"
import BiblePhrase from "./components/bible-phrase"
import Clock from "./components/clock"
//import axios from "axios";

export default function LayoutDash({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
                <div className="flex justify-between mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
                    <BiblePhrase />
                    <Clock/>
                </div>
                {children}
                <div className="fixed bottom-10 right-10 z-50 flex items-center transition-all duration-300">
                    <ButtonWhatsapp />
                </div>
            </main>
            <Footer />
        </div>
    )
}