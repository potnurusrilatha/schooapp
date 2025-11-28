import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AuthLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default AuthLayout;