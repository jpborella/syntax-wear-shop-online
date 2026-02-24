import { Copyright } from "../Copyright";
import { SubscriptionForm } from "../SubscriptionForm";
import { SocialLinks } from "../SocialLinks";
import { MenuItens } from "../MenuItens";

export const Footer = () => {
    return (
        <footer className="bg-footer-bg">
            <div className="container">
                <div className="flex flex-col lg:flex-row justify-between py-10 px-2 gap-2">
                    <div className="flex flex-col gap-8 min-w-[344px]">
                        <SubscriptionForm />
                        <SocialLinks />
                    </div>
                    <MenuItens />
                </div>
                <Copyright />
            </div>
        </footer>
    );
}