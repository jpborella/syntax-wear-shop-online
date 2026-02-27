import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { useForm } from "react-hook-form"
import { isValidCPF } from "../../utils/cpf-validator"

//vamos criar o schema de validação com o zod 
const registerUserFormSchema = z.object({
    //definindo os campos e suas validações
    //por exemplo, o campo email deve ser uma string não vazia
    email: z
        .string()
        .nonempty('Campo obrigatório.'),
    //já o campo password deve ter no mínimo 8 caracteres
    password: z
        .string().nonempty('Campo obrigatorio.')
        .min(8, 'Verifique se a senha tem pelo menos 8 caracteres.'),
    //o campo confirmPassword deve ser uma string não vazia e deve ser igual ao campo password
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
    //validação de CPF 
    cpf: z
        .string()
        .nonempty('Campo obrigatório.')
        .refine((cpf) => isValidCPF(cpf), {
            message: 'CPF inválido.',
            path: ['cpf'],
        }),
    dateBirth: z
        .date(),
    cellphone: z
        .string()
        .nonempty('Campo obrigatório.'),
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
