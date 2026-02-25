const brand = {
  name: process.env.VUE_APP_BRAND_NAME || 'Izing',
  description:
    process.env.VUE_APP_BRAND_DESCRIPTION ||
    'Bot Multi-atendimento Whatsapp, Instagram e Facebook',
  logo: process.env.VUE_APP_BRAND_LOGO || '/logo_izing.png'
}

export default brand
