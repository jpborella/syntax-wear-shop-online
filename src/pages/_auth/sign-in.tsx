import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { LoginForm } from "../../components/LoginForm";
import { Logo } from "../../components/Logo";
import { Separator } from "../../components/Separator";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { useAuth } from "../../contexts/AuthContext/AuthContext";

export const Route = createFileRoute("/_auth/sign-in")({
    component: RouteComponent,
    head: () => ({
        meta: [
            { title: 'Entrar - SyntaxWear' }
        ]
    })
});

function RouteComponent() {

    const { signInWithGoogle } = useAuth();
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        const googleToken = credentialResponse.credential;
        console.log("Google Token:", googleToken);

        if (!googleToken) return;

        signInWithGoogle(googleToken);
        await navigate({ to: "/" });
    }

    const handleGoogleError = () => {
        throw new Error("Function not implemented.");
    }

    return (
        <section className="text-black bg-surface h-screen w-full flex justify-center items-center p-5">
            <div className="w-112.5 bg-white rounded-[18px] p-10 shadow-md">
                <div className="flex flex-col">
                    <Logo />

                    <h2 className="text-black font-bold text-[21px] mb-2">Entrar</h2>

                    <p className="mb-3.5">Escoha como você gostaria de fazer login</p>

                    <GoogleLogin onSuccess={handleGoogleSuccess} onError={handleGoogleError} />

                    <Separator />

                    <LoginForm />

                    <p className="mt-3.5">
                        Ainda não possui conta? <Link to="/sign-up" className="ml-1 text-accent hover:underline">Cadastre-se</Link>
                    </p>
                </div>
            </div>
        </section>
    );
}
