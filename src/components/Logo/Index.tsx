import { Link } from "@tanstack/react-router";
import LogoImage from "@/assets/images/logo.png";

export const Logo = () => {
    const handleLogoClick = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    };

    return (
        <Link to="/" className="self-center" onClick={handleLogoClick}>
            <img src={LogoImage} alt="Logo SyntaxWear" className="w-40" />
        </Link>
    );
};
