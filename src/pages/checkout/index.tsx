import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useCallback, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FiAlertCircle, FiCheck } from "react-icons/fi";
import { z } from "zod";
import { CartContext } from "../../contexts/CartContext/CartContext";
import { useAuth } from "../../contexts/AuthContext/AuthContext";
import { formatCurrency } from "../../utils/format-currency";
import { formatCellphone } from "../../utils/format-validator";
import Logo from "../../assets/images/logo.png";

const API_BASE_URL = "http://localhost:3000";

const SHIPPING_BY_REGION: Record<string, number> = {
	Norte: 39.9,
	Nordeste: 29.9,
	"Centro-Oeste": 24.9,
	Sudeste: 14.9,
	Sul: 19.9,
};

const checkoutSchema = z.object({
	cep: z.string().trim().min(1, "Informe o CEP").regex(/^\d{5}-?\d{3}$/, "Informe um CEP válido"),
	street: z.string().trim().min(1, "Informe a rua"),
	number: z.string().trim().min(1, "Informe o número"),
	complement: z.string().trim().optional(),
	neighborhood: z.string().trim().min(1, "Informe o bairro"),
	city: z.string().trim().min(1, "Informe a cidade"),
	state: z.string().trim().length(2, "Use a sigla do estado"),
	paymentMethod: z.enum(["PIX", "CARD", "BOLETO"], "Escolha uma forma de pagamento"),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const checkoutDefaultValues: CheckoutFormData = {
	cep: "",
	street: "",
	number: "",
	complement: "",
	neighborhood: "",
	city: "",
	state: "",
	paymentMethod: "PIX",
};

const inputClassName = (hasError: boolean) =>
	`mt-2 w-full rounded-md border bg-white px-4 py-3.5 text-base text-text outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 ${
		hasError ? "border-error" : "border-border"
	}`;

const CheckoutHeader = () => (
	<header className="flex h-12 items-center justify-between bg-white px-8 md:px-12">
		<Link to="/" aria-label="SyntaxWear">
			<img src={Logo} alt="SyntaxWear" className="h-auto w-32" />
		</Link>
		<div className="flex items-center gap-2 text-sm font-medium text-[#333333]">
			<img src="/images/lock-icon.png" alt="" aria-hidden="true" className="h-5 w-5 object-contain" />
			<span>100% seguro</span>
		</div>
	</header>
);

const CheckoutFooter = () => (
	<footer className="flex min-h-16 items-center justify-center bg-[#f1f2f6] px-8 py-3 text-center text-[10px] leading-4 text-[#596274]">
		<p>
			Preços e condições exclusivos para o site www.iplace.com.br e para o televendas, podendo sofrer alterações sem prévia notificação. Global Distribuição de Bens de Consumo LTDA / www.iplace.com.br / BR 116, km 223,5, Nº
			<br className="hidden md:block" />
			7350 / Dois Irmãos - RS / CEP 93950-000 / CNPJ: 89.237.911/0001-40
		</p>
	</footer>
);

export const Route = createFileRoute("/checkout/")({
	component: CheckoutPage,
	head: () => ({ meta: [{ title: "Checkout - SyntaxWear" }] }),
});

function CheckoutPage() {
	const navigate = useNavigate();
	const { cart, removeFromCart } = useContext(CartContext);
	const { isAuthenticated, updatePhone, user } = useAuth();
	const [addressMessage, setAddressMessage] = useState<string | null>(null);
	const [isLoadingAddress, setIsLoadingAddress] = useState(false);
	const [submitError, setSubmitError] = useState<string | null>(null);
	const [isCompleted, setIsCompleted] = useState(false);
	const [shippingCost, setShippingCost] = useState<number | null>(null);
	const [isEditingPhone, setIsEditingPhone] = useState(false);
	const [contactPhone, setContactPhone] = useState(user?.phone ?? "");
	const [isSavingPhone, setIsSavingPhone] = useState(false);
	const [phoneError, setPhoneError] = useState<string | null>(null);

	const {
		register,
		setValue,
		reset,
		watch,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<CheckoutFormData>({
		resolver: zodResolver(checkoutSchema),
		mode: "onBlur",
		defaultValues: checkoutDefaultValues,
	});

	const cepValue = watch("cep");

	const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
	const shipping = shippingCost ?? 0;
	const total = subtotal + shipping;
	const customerName = [user?.firstName, user?.lastName].filter(Boolean).join(" ") || "Cliente";
	const customerPhone = contactPhone ? formatCellphone(contactPhone) : "Telefone não informado";

	useEffect(() => {
		setContactPhone(user?.phone ?? "");
		setIsEditingPhone(false);
		setPhoneError(null);
	}, [user?.phone]);

	const handleEditPhone = async () => {
		if (!isAuthenticated) {
			await navigate({ to: "/sign-in" });
			return;
		}

		if (!isEditingPhone) {
			setPhoneError(null);
			setIsEditingPhone(true);
			return;
		}

		const phone = contactPhone.replace(/\D/g, "");
		if (!/^\d{10,11}$/.test(phone)) {
			setPhoneError("Informe um telefone válido com DDD.");
			return;
		}

		setIsSavingPhone(true);
		setPhoneError(null);
		try {
			await updatePhone(phone);
			setContactPhone(phone);
			setIsEditingPhone(false);
		} catch (error) {
			setPhoneError(error instanceof Error ? error.message : "Não foi possível salvar o telefone.");
		} finally {
			setIsSavingPhone(false);
		}
	};

	const findAddress = useCallback(async () => {
		const cep = cepValue?.replace(/\D/g, "") ?? "";
		if (!/^\d{8}$/.test(cep)) {
			setShippingCost(null);
			setAddressMessage("Digite um CEP válido para buscar o endereço.");
			return;
		}

		setIsLoadingAddress(true);
		setAddressMessage(null);
		setShippingCost(null);
		try {
			const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
			const data = await response.json();
			if (!response.ok || data.erro) throw new Error("CEP não encontrado.");

			const cost = SHIPPING_BY_REGION[data.regiao];
			if (cost === undefined) throw new Error("Região não suportada para entrega.");

			setValue("street", data.logradouro ?? "", { shouldValidate: true });
			setValue("neighborhood", data.bairro ?? "", { shouldValidate: true });
			setValue("city", data.localidade ?? "", { shouldValidate: true });
			setValue("state", data.uf ?? "", { shouldValidate: true });
			setShippingCost(cost);
			setAddressMessage("Endereço encontrado. Confira os dados antes de continuar.");
		} catch (error) {
			setAddressMessage(error instanceof Error ? error.message : "Não foi possível buscar o CEP.");
		} finally {
			setIsLoadingAddress(false);
		}
	}, [cepValue, setValue]);

	useEffect(() => {
		if (cepValue.replace(/\D/g, "").length !== 8) {
			setShippingCost(null);
			return;
		}

		void findAddress();
	}, [cepValue, findAddress]);

	const onSubmit = async (data: CheckoutFormData) => {
		if (!isAuthenticated) {
			await navigate({ to: "/sign-in" });
			return;
		}
		if (cart.length === 0) return;

		setSubmitError(null);
		try {
			const response = await fetch(`${API_BASE_URL}/orders`, {
				method: "POST",
				credentials: "include",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					paymentMethod: data.paymentMethod,
					shippingAddress: {
						cep: data.cep.replace(/\D/g, ""),
						street: data.street,
						number: data.number,
						complement: data.complement || undefined,
						neighborhood: data.neighborhood,
						city: data.city,
						state: data.state,
						country: "Brasil",
					},
					items: cart.map((item) => ({ productId: item.id, quantity: item.quantity })),
				}),
			});

			if (!response.ok) {
				const responseBody = await response.json().catch(() => null);
				throw new Error(responseBody?.message ?? "Não foi possível finalizar o pedido.");
			}

			cart.forEach((item) => removeFromCart(item.id));
			setIsCompleted(true);
		} catch (error) {
			setSubmitError(error instanceof Error ? error.message : "Não foi possível finalizar o pedido.");
		}
	};

	if (isCompleted) {
		return (
			<>
				<CheckoutHeader />
				<main className="flex min-h-[calc(100vh-168px)] items-center justify-center bg-[#eeece7] px-5 py-12 text-center text-[#222]">
					<section className="rounded bg-white p-10 shadow-sm">
						<FiCheck className="mx-auto mb-4 text-[#5726d9]" size={32} />
						<h1 className="text-xl font-medium">Pedido realizado com sucesso</h1>
						<p className="mt-2 text-sm text-[#666]">Recebemos seu pedido e vamos avisar você quando ele avançar.</p>
						<Link to="/products" className="mt-6 inline-flex rounded bg-black px-6 py-3 text-sm text-white">Continuar comprando</Link>
					</section>
				</main>
				<CheckoutFooter />
			</>
		);
	}

	if (cart.length === 0) {
		return (
			<>
				<CheckoutHeader />
				<main className="flex min-h-[calc(100vh-168px)] flex-col items-center justify-center bg-[#eeece7] px-5 py-12 text-center text-[#222]">
					<h1 className="text-xl font-medium">Seu carrinho está vazio</h1>
					<p className="mt-2 text-sm text-[#666]">Adicione produtos antes de continuar.</p>
					<Link to="/products" className="mt-6 rounded bg-black px-6 py-3 text-sm text-white">Ver produtos</Link>
				</main>
				<CheckoutFooter />
			</>
		);
	}

	return (
		<div className="min-h-screen bg-[#eeece7] text-[#222]">
			<CheckoutHeader />
			<main className="mx-auto grid max-w-7xl gap-12 px-8 py-8 md:grid-cols-[minmax(0,1fr)_320px] md:gap-16">
				<form id="checkout-form" onSubmit={handleSubmit(onSubmit)} noValidate className="min-w-0">
					<section className="rounded bg-white p-6 shadow-sm md:max-w-190">
						<h1 className="text-xl font-medium">Identificação</h1>
						<p className="mt-2 text-sm text-[#aaa]">{user?.email}</p>
						<p className="text-sm text-[#aaa]">{customerName}</p>
						<div className="mt-3 rounded-md bg-[#f4f4f6] px-4 py-3 text-sm">
							<p className="flex items-center gap-2 text-[#222]"><FiAlertCircle className="shrink-0" size={18} aria-hidden="true" /> Antes de continuar, verifique se o telefone para contato está correto.</p>
							{isEditingPhone ? (
								<div className="ml-6 mt-3 max-w-xs">
									<label htmlFor="contact-phone" className="text-xs font-medium text-[#596274]">Telefone para contato</label>
									<input
										id="contact-phone"
										type="tel"
										value={formatCellphone(contactPhone)}
										onChange={(event) => setContactPhone(event.target.value.replace(/\D/g, "").slice(0, 11))}
										placeholder="(00) 00000-0000"
										inputMode="tel"
										className="mt-1 w-full rounded-md border border-[#c9cbd1] bg-white px-3 py-2 font-medium text-[#222] outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
										autoFocus
									/>
									<p className="mt-1 text-xs text-[#777]">Usaremos este número para falar sobre o pedido.</p>
								</div>
							) : (
								<strong className="ml-6 mt-2 block text-base">{customerPhone}</strong>
							)}
							{phoneError && <p className="ml-6 mt-2 text-xs text-error">{phoneError}</p>}
						</div>
						<button
							type="button"
							onClick={handleEditPhone}
							disabled={isSavingPhone}
							className="mt-3 cursor-pointer text-sm text-[#4391df] underline disabled:cursor-not-allowed disabled:opacity-60"
						>
							{isSavingPhone ? "Salvando..." : isEditingPhone ? "Salvar telefone" : "Editar telefone"}
						</button>
					</section>

					<section className="mt-8 md:max-w-190">
						<div className="flex items-center justify-between gap-4">
							<h2 className="text-lg font-medium">Informe seu endereço</h2>
							<button
								type="button"
								onClick={() => {
									reset();
									setAddressMessage(null);
									setShippingCost(null);
								}}
								className="cursor-pointer text-sm text-[#4391df] underline"
							>
								Limpar formulário
							</button>
						</div>
						<div className="mt-4 grid grid-cols-[1fr_auto] gap-2">
							<input {...register("cep")} placeholder="zipCode" inputMode="numeric" className={inputClassName(Boolean(errors.cep))} />
							<button type="button" onClick={findAddress} disabled={isLoadingAddress} className="mt-2 h-13.5 cursor-pointer self-start rounded bg-black px-6 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50">{isLoadingAddress ? "Buscando" : "Buscar"}</button>
						</div>
						{errors.cep && <p className="mt-1 text-sm text-error">{errors.cep.message}</p>}
						<label className="mt-4 block text-sm">Endereço<input {...register("street")} placeholder="street" className={inputClassName(Boolean(errors.street))} />{errors.street && <span className="text-error">{errors.street.message}</span>}</label>
						<div className="mt-4 grid gap-4 md:grid-cols-2">
							<label className="block text-sm">Número<input {...register("number")} placeholder="number" className={inputClassName(Boolean(errors.number))} />{errors.number && <span className="text-error">{errors.number.message}</span>}</label>
							<label className="block text-sm">Complemento<input {...register("complement")} placeholder="complement" className={inputClassName(false)} /></label>
						</div>
						<label className="mt-5 block text-sm">Bairro<input {...register("neighborhood")} placeholder="neighborhood" className={inputClassName(Boolean(errors.neighborhood))} />{errors.neighborhood && <span className="text-error">{errors.neighborhood.message}</span>}</label>
						<div className="mt-4 grid gap-4 md:grid-cols-2">
							<label className="block text-sm">Cidade<input {...register("city")} placeholder="city" className={inputClassName(Boolean(errors.city))} />{errors.city && <span className="text-error">{errors.city.message}</span>}</label>
							<label className="block text-sm">Estado<input {...register("state")} maxLength={2} placeholder="state" className={inputClassName(Boolean(errors.state))} />{errors.state && <span className="text-error">{errors.state.message}</span>}</label>
						</div>
						{addressMessage && <p className="mt-2 text-xs text-[#777]">{addressMessage}</p>}
					</section>

					<section className="mt-8 md:max-w-190">
						<h2 className="text-lg font-medium">Escolha a forma de entrega</h2>
						<label className="mt-5 flex items-start gap-3 text-sm">
							<input type="radio" defaultChecked name="delivery" className="mt-0.5 accent-black" />
							<span><strong>Entrega rápida</strong><small className="block text-[#8b8b8b]">Receba em até 5 dias úteis</small></span>
							<span className="ml-auto">{shippingCost === null ? "A calcular" : formatCurrency(shippingCost)}</span>
						</label>
					</section>
				</form>

				<aside className="h-fit rounded bg-white p-6 shadow-sm md:sticky md:top-6">
					<h2 className="text-lg font-medium">Resumo do pedido</h2>
					<div className="mt-5 space-y-4">
						{cart.map((item) => (
							<div key={item.id} className="flex gap-3 border-b border-[#ddd] pb-4 text-xs">
								<img src={item.images[0]} alt="" className="h-14 w-14 object-cover" />
								<div><p>{item.name}</p><p>Quantidade: {item.quantity}</p><strong>{formatCurrency(item.price)} à vista</strong></div>
							</div>
						))}
					</div>
					<div className="mt-44 space-y-2 text-sm">
						<div className="flex justify-between"><span>Subtotal</span><span>{formatCurrency(subtotal)}</span></div>
						<div className="flex justify-between"><span>Frete</span><span>{shippingCost === null ? "A calcular" : formatCurrency(shippingCost)}</span></div>
						<div className="flex justify-between"><strong>Total</strong><strong>{formatCurrency(total)} à vista</strong></div>
					</div>
					{submitError && <p className="mt-3 rounded bg-red-50 p-2 text-xs text-error">{submitError}</p>}
					<button type="submit" form="checkout-form" disabled={isSubmitting} className="mt-5 w-full cursor-pointer rounded bg-black py-3 text-sm text-white disabled:cursor-not-allowed disabled:opacity-50">{isSubmitting ? "Processando..." : "Fechar pedido"}</button>
				</aside>
			</main>
			<CheckoutFooter />
		</div>
	);
}
