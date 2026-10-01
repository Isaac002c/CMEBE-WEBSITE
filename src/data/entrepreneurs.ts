export type Entrepreneur = {
  name: string;
  category: string;
  image?: string;
  description: string;
  phone?: string;
  whatsappNumber?: string;
  contacts?: Array<{
    name: string;
    phone: string;
    whatsappNumber: string;
  }>;
  contactName?: string;
  email?: string;
  address?: string;
  mapsUrl?: string;
  instagram?: string;
  instagramUrl?: string;
  services?: string[];
  offer?: string;
  featured?: boolean;
};

export const entrepreneurs: Entrepreneur[] = [
  {
    name: "Espaço Martins Festas e Eventos",
    category: "Festas e eventos",
    image: "/images/empreendedor_CMEBE/espaco_martins.jpg",
    description:
      "Espaço preparado para celebrações, confraternizações e eventos institucionais.",
    phone: "(21) 96441-8167",
    whatsappNumber: "5521964418167",
    address: "Estrada Boa Esperança, 13A – Santa Cruz – RJ",
    instagram: "@martinsfestaseeventos_",
    instagramUrl: "https://www.instagram.com/martinsfestaseeventos_/",
    offer: "Descontos especiais para a comunidade CMEBE",
    featured: true,
  },
  {
    name: "Prime Motos",
    category: "Locação e serviços para motocicletas",
    image: "/images/empreendedor_CMEBE/prime_motos_destaque_v2.png",
    description:
      "Locação de motocicletas com suporte especializado para quem precisa de mobilidade no Rio de Janeiro.",
    phone: "(21) 96601-4841",
    whatsappNumber: "5521966014841",
    instagram: "@moto_prime_ofc",
    instagramUrl: "https://www.instagram.com/moto_prime_ofc/",
    services: ["Locação de motos", "Seguro e reboque 24h", "Manutenção"],
    featured: true,
  },
  {
    name: "21 Go! Proteção Patrimonial",
    category: "Proteção automotiva e patrimonial",
    image: "/images/empreendedor_CMEBE/021_go_destaque_v2.png",
    description:
      "Proteção completa para veículos e patrimônio, com assistência e atendimento 24 horas.",
    phone: "(21) 97037-8799",
    whatsappNumber: "5521970378799",
    contactName: "Fabrício da Silva",
    instagram: "@fabricio21go",
    instagramUrl: "https://www.instagram.com/fabricio21go/",
    services: ["Proteção veicular", "Assistência 24h", "Reboque e benefícios"],
    featured: true,
  },
  {
    name: "Maria Elegance Costureira",
    category: "Corte, costura e moda sob medida",
    image: "/images/empreendedor_CMEBE/maria_elegance.jpg",
    description:
      "Especialista em reformas, ajustes e confecção de roupas, com atendimento em Piracicaba.",
    phone: "(19) 99100-3462",
    whatsappNumber: "5519991003462",
    address: "Rua Aracaju, 20 – Jardim Parque Jupiá – Piracicaba/SP",
    instagram: "@mariaelegancecostureira",
    instagramUrl:
      "https://www.instagram.com/mariaelegancecostureira?igsh=eGx4c3RhYjFveTRz",
    services: ["Reformas", "Ajustes", "Confecção de roupas"],
    featured: true,
  },
  {
    name: "Gráfica Vida",
    category: "Serviços gráficos e papelaria",
    image: "/images/empreendedor_CMEBE/grafica_vida.png",
    description:
      "Produção gráfica para igrejas, empresas e profissionais, com atendimento mediante orçamento.",
    phone: "(19) 3433-8934",
    whatsappNumber: "5519991861541",
    email: "graficavida4@gmail.com",
    address:
      "Rua Monsenhor Manoel Francisco Rosa, 567 – Centro – Piracicaba/SP",
    mapsUrl:
      "https://www.google.com/maps/place/Gr%C3%A1fica+Vida+-+R.+Monsenhor+Manoel+Francisco+Rosa,+567+-+Centro,+Piracicaba+-+SP,+13400-270/@-22.719386,-47.6479198,17z",
    instagram: "@grafica_vida4",
    instagramUrl: "https://www.instagram.com/grafica_vida4/",
    services: ["Cartões e banners", "Adesivos e impressos", "Papelaria para igrejas"],
    offer: "Segunda a sexta, das 8h às 17h30",
    featured: true,
  },
  {
    name: "Any Martins Nutricionista",
    category: "Nutrição e consultoria de alimentos",
    image: "/images/empreendedor_CMEBE/any_martins.jpg",
    description:
      "Atendimento nutricional e consultoria de alimentos com foco em saúde, equilíbrio e qualidade de vida.",
    phone: "(21) 96919-7099",
    whatsappNumber: "5521969197099",
    contactName: "Any Martins",
    instagram: "@anyconsultoradealimentos",
    instagramUrl: "https://www.instagram.com/anyconsultoradealimentos/",
    featured: true,
  },
  {
    name: "AMOVE Stúdio de Pilates",
    category: "Pilates e bem-estar",
    image: "/images/empreendedor_CMEBE/amove_studio_pilates.jpg",
    description:
      "Estúdio dedicado à prática de Pilates, com atendimento conduzido pelas profissionais Ana Gonçalves e Micheli Scherrer.",
    contactName: "Dra. Ana Gonçalves e Micheli Scherrer",
    contacts: [
      {
        name: "Micheli",
        phone: "(21) 98896-3651",
        whatsappNumber: "5521988963651",
      },
      {
        name: "Ana Beatriz",
        phone: "(21) 97194-5263",
        whatsappNumber: "5521971945263",
      },
    ],
    instagram: "@amovestudiodepilates",
    instagramUrl: "https://www.instagram.com/amovestudiodepilates/",
    services: ["Pilates"],
    offer: "Consulte modalidades de atendimento e benefícios aceitos",
    featured: true,
  },
  {
    name: "Gerson Martins – Planos de Saúde",
    category: "Consultoria especializada em saúde",
    image: "/images/empreendedor_CMEBE/gerson_planos_saude.jpg",
    description:
      "Orientação especializada para contratação e comparação de planos de saúde.",
    phone: "(21) 96441-8167",
    whatsappNumber: "5521964418167",
    contactName: "Gerson Martins",
    instagram: "@_gersonsmartins",
    instagramUrl: "https://www.instagram.com/_gersonsmartins/",
    services: ["Planos individuais", "Planos familiares", "Planos empresariais"],
    featured: true,
  },
  {
    name: "Grupo Nacional Pax",
    category: "Serviços funerários",
    image: "/images/empreendedor_CMEBE/grupo_nacional_pax.jpg",
    description:
      "Cuidado e dignidade em todos os momentos, com atendimento acolhedor para famílias que precisam de orientação e assistência.",
    phone: "(21) 98556-1420",
    whatsappNumber: "5521985561420",
    email: "vendas@gruponacionalpax.com",
    instagram: "@gruponacionalpax",
    instagramUrl: "https://www.instagram.com/gruponacionalpax/",
    services: ["Assistência funerária", "Acolhimento familiar", "Atendimento humanizado"],
    featured: true,
  },
  {
    name: "La Petit Cestas by Grazi",
    category: "Cestas e café da manhã",
    image: "/images/empreendedor_CMEBE/la_petit_cestas.jpg",
    description: "Mais do que uma cesta: uma experiência afetiva.",
    phone: "(21) 98228-1398",
    whatsappNumber: "5521982281398",
    instagram: "@lapetitcestasrj",
    instagramUrl: "https://www.instagram.com/lapetitcestasrj/",
    services: ["Cestas personalizadas", "Café da manhã", "Presentes afetivos"],
    featured: true,
  },
  {
    name: "Anhanguera – Polo Sepetiba",
    category: "Educação e ensino superior",
    image: "/images/empreendedor_CMEBE/anhanguera_informacoes.jpg",
    description:
      "Polo educacional com oportunidades de graduação e condições de ingresso.",
    phone: "(21) 97549-4819",
    whatsappNumber: "5521975494819",
  },
  {
    name: "Dr. José Zaib",
    category: "Psicologia corporativa e NR1",
    image: "/images/empreendedor_CMEBE/dr_jose_zaib.jpg",
    description:
      "Saúde mental corporativa para ambientes de trabalho mais saudáveis e produtivos.",
    phone: "(21) 96461-8373",
    whatsappNumber: "5521964618373",
  },
  {
    name: "Sweet Martins",
    category: "Doceria gourmet e salgados finos artesanais",
    image: "/images/empreendedor_CMEBE/sweet_martins.jpg",
    description:
      "Bolos, doces gourmet e salgados finos produzidos artesanalmente para celebrações e momentos especiais.",
    phone: "(21) 96481-6021",
    whatsappNumber: "5521964816021",
    address: "Av. Brasil, 62001 – Santa Cruz – RJ",
    instagram: "@sweetmartinsrj",
    instagramUrl: "https://www.instagram.com/sweetmartinsrj/",
    services: ["Bolos artesanais", "Doces gourmet", "Salgados finos"],
  },
];
