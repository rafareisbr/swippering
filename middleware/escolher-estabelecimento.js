export default function ({ app, redirect }) {
  const estabelecimentoId = app.$cookies.get('estabelecimento_id')

  console.log('fuiChamado')
  if (!estabelecimentoId) {
    return redirect('/escolhe_loja')
  }
}
