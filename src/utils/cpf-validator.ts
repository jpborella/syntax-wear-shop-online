export function isValidCPF(cpf: string): boolean {
  if (!cpf) return false;

  // Remove tudo que não é dígito
  const onlyDigits = String(cpf).replace(/\D/g, '');

  // Deve ter 11 dígitos
  if (onlyDigits.length !== 11) return false;

  // Rejeita sequências com todos os dígitos iguais (ex: 00000000000, 11111111111...)
  if (/^(\d)\1{10}$/.test(onlyDigits)) return false;

  const nums = onlyDigits.split('').map(Number);

  // Calcula dígito verificador (primeiro)
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += nums[i] * (10 - i);
  }
  let remainder = sum % 11;
  const dig1 = remainder < 2 ? 0 : 11 - remainder;
  if (nums[9] !== dig1) return false;

  // Calcula dígito verificador (segundo)
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += nums[i] * (11 - i);
  }
  remainder = sum % 11;
  const dig2 = remainder < 2 ? 0 : 11 - remainder;
  if (nums[10] !== dig2) return false;

  return true;
}
