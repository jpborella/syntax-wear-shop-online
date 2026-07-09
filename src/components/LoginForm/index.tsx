import { useContext, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../contexts/AuthContext/AuthContext";
import { useNavigate } from "@tanstack/react-router";


export const LoginForm = () => {
    const [ error, setError ] = useState<string | null>(null);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const signInFormSchema = z.object({
        email: z.email("Email inválido"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    });

    type SignInFormData = z.infer<typeof signInFormSchema>;

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignInFormData>({
        resolver: zodResolver(signInFormSchema),
    });

    const onSubmit = async (data: SignInFormData) => {

        try {
            await signIn(data);
            navigate({ to: "/"});
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Ocorreu um erro desconhecido.");
            }
        }
    }

    return (
        <form className='flex flex-col gap-3.5' onSubmit={handleSubmit(onSubmit)}>
            <input type='email' placeholder='Email' className='border rounded-[1px] border-gray-200 w-full text-black p-3' {...register("email")} />

            {errors.email && <span className='text-red-500 text-sm'>{errors.email.message}</span>}

            <input type='password' placeholder='Password' className='border rounded-[1px] border-gray-200 w-full text-black p-3' {...register("password")} />

            {errors.password && <span className='text-red-500 text-sm'>{errors.password.message}</span>}

            {error && <span className='text-red-500 text-sm text-center'>{error}</span>}

            <button
                type='submit'
                disabled={isSubmitting}
                className='bg-[#212A2F] w-full p-3.5 rounded-[1px] cursor-pointer text-white disabled:opacity-70 disabled:cursor-not-allowed'
            >
                {isSubmitting ? 'Enviando...' : 'Continue'}
            </button>
        </form>
    );
}