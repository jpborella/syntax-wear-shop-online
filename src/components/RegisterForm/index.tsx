import { formatCellphone, formatCpf } from "../../utils/format-validator"
import { useRegisterForm } from "./zod"

export const RegisterForm = () => {
    const {
        handleSubmit,
        register,
        errors,
        isSubmitting,
        reset
    } = useRegisterForm()

    const onSubmit = async () => {
        reset()
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 text-black"
        >
            {/* Email */}
            <div>
                <label className="text-xs text-gray-600">Email*</label>
                <input
                    type="email"
                    {...register('email')}
                    className={`w-full border rounded-xs px-1  mt-1 focus:outline-none focus:ring-2 ${errors.email
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-border focus:ring-accent'
                        }`}
                />
                {errors.email && (
                    <p className="text-xs text-error mt-1">⚠ {errors.email.message}</p>
                )}
            </div>

            {/* Senha */}
            <div>
                <label className="text-xs text-gray-600">Senha*</label>
                <input
                    type="password"
                    {...register('password')}
                    className={`w-full border rounded-xs px-1  mt-1 focus:outline-none focus:ring-2 ${errors.password
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-border focus:ring-accent'
                        }`}
                />
                {errors.password && (
                    <p className="text-xs text-error mt-1">⚠ {errors.password.message}</p>
                )}
            </div>

            {/* Confirmar Senha */}
            <div>
                <label className="text-xs text-gray-600">Confirmar senha*</label>
                <input
                    type="password"
                    {...register('confirmPassword')}
                    className={`w-full border rounded-xs px-1  mt-1 focus:outline-none focus:ring-2 ${errors.confirmPassword
                        ? 'border-red-500 focus:ring-red-400'
                        : 'border-border focus:ring-accent'
                        }`}
                />
                {errors.confirmPassword && (
                    <p className="text-xs text-error mt-1">
                        ⚠ {errors.confirmPassword.message}
                    </p>
                )}
            </div>

            {/* Nome */}
            <div>
                <label className="text-xs text-gray-600">Nome*</label>
                <input
                    type="text"
                    {...register('firstName')}
                    className="w-full border border-border rounded-xs px-1  mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {errors.firstName && (
                    <p className="text-xs text-error mt-1">⚠ {errors.firstName.message}</p>
                )}
            </div>

            {/* Sobrenome */}
            <div>
                <label className="text-xs text-gray-600">Sobrenome*</label>
                <input
                    type="text"
                    {...register('lastName')}
                    className="w-full border border-border rounded-xs px-1 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {errors.lastName && (
                    <p className="text-xs text-error mt-1">⚠ {errors.lastName.message}</p>
                )}
            </div>

            {/* CPF */}
            <div>
                <label className="text-xs text-gray-600">CPF*</label>
                <input
                    type="text"
                    inputMode="numeric"
                    {...register('cpf', {
                        onChange: (event) => {
                            event.target.value = formatCpf(event.target.value)
                        },
                    })}
                    placeholder="000.000.000-00"
                    className="w-full border border-border rounded-xs px-1  mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {errors.cpf && (
                    <p className="text-xs text-error mt-1">⚠ {errors.cpf.message}</p>
                )}
            </div>

            {/* Data de nascimento */}
            <div>
                <label className="text-xs text-gray-600">Data de nascimento*</label>
                <input
                    type="date"
                    {...register('dateBirth')}
                    className="w-full border border-border rounded-xs px-1 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {errors.dateBirth && (
                    <p className="text-xs text-error mt-1">
                        ⚠ {errors.dateBirth.message}
                    </p>
                )}
            </div>

            {/* Celular */}
            <div>
                <label className="text-xs text-gray-600">Celular*</label>
                <input
                    type="tel"
                    inputMode="numeric"
                    {...register('cellphone', {
                        onChange: (event) => {
                            event.target.value = formatCellphone(event.target.value)
                        },
                    })}
                    placeholder="(00) 00000-0000"
                    className="w-full border border-border rounded-xs px-1 mt-1 focus:outline-none focus:ring-2 focus:ring-accent"
                />
                {errors.cellphone && (
                    <p className="text-xs text-error mt-1">⚠ {errors.cellphone.message}</p>
                )}
            </div>

            {/* Botão */}
            <button
                disabled={isSubmitting}
                className="bg-accent text-white font-medium uppercase rounded-md py-3 transition-all hover:bg-accent-hover disabled:opacity-50 cursor-pointer"
            >
                {isSubmitting ? 'Carregando...' : 'Continuar'}
            </button>
        </form>
    )
}