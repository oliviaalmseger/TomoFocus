import { Link } from "react-router";
import logo from "../assets/logo.png";

export const Header = () => {
    return (
        <>
        <header className="w-full py-4 px-6 border-b border-border bg-background flex items-center justify-center">
            <Link to="/" className="inline-block">
                <img src={logo} alt="TomoFocus logotype with the slogan 'Hocus Pocus, Super Focus'" className="h-32 min-h-28"/>
            </Link>
        </header>
        </>
    )
}
