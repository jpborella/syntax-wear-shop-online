import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { isValidCPF } from "../../utils/cpf-validator"

const registerUserFormSchema = z.object({
    email: z
        .string()
        .nonempty('Campo obrigatório.'),
    password: z
        .string().nonempty('Campo obrigatorio.')
        .min(8, 'Verifique se a senha tem pelo menos 8 caracteres.'),
    confirmPassword: z
        .string()
        .nonempty('Informe a senha novamente.'),
    firstName: z
        .string()
        .nonempty('Campo obrigatório.')
        .transform((name) => {
            return name.trim().replace(/^\w/, (c) => c.toLocaleUpperCase())
        }),
    lastName: z
        .string()
        .nonempty('Campo obrigatório.').transform((name) => {
            return name.trim().replace(/^\w/, (c) => c.toLocaleUpperCase())
        }),
    cpf: z
        .string()
        .nonempty('Campo obrigatório.')
        .refine((cpf) => isValidCPF(cpf), {
            message: 'CPF inválido.',
            path: ['cpf'],
        }),
    dateBirth: z
        .string()
        .nonempty('Campo obrigatório.')
        .refine((value) => /^\d{4}-\d{2}-\d{2}$/.test(value), {
            message: 'Data de nascimento inválida.',
        }),
    cellphone: z
        .string()
        .trim()
        .nonempty('Campo obrigatório.')
        .refine((value) => {
            const digits = value.replace(/\D/g, '')
            return digits.length >= 10 && digits.length <= 11
        }, {
            message: 'Informe um celular válido.',
        }),
}).refine(
    ({ password, confirmPassword }) => password === confirmPassword,
    {
        message: 'As senhas informadas não correspondem. Tente novamente.',
        path: ['confirmPassword'],
    }
);

type registerUserFormData = z.infer<typeof registerUserFormSchema>

export const useRegisterForm = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        setError,
        reset
    } = useForm<registerUserFormData>({
        defaultValues: {
            email: '',
            password: '',

        },
        mode: 'onBlur',
        criteriaMode: 'all',
        resolver: zodResolver(registerUserFormSchema)
    })

    return {
        handleSubmit,
        register,
        errors,
        isSubmitting,
        setError,
        reset
    }
}
