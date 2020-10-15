import 'intl/locale-data/jsonp/pt-BR'

export default function formatToReal(value: number): string {
  return Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}
