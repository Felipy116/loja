import { Product, Category, FAQItem, Coupon } from "./types";

export const CATEGORIES: Category[] = [
  { id: "1", name: "Eletrônicos", slug: "eletronicos", iconName: "Smartphone", color: "bg-blue-100 text-blue-800" },
  { id: "2", name: "Informática", slug: "informatica", iconName: "Laptop", color: "bg-teal-100 text-teal-800" },
  { id: "3", name: "Eletrodomésticos", slug: "eletrodomesticos", iconName: "ChefHat", color: "bg-orange-100 text-orange-800" },
  { id: "4", name: "Áudio & Som", slug: "audio", iconName: "Headphones", color: "bg-purple-100 text-purple-800" },
  { id: "5", name: "Casa & Conforto", slug: "casa", iconName: "Home", color: "bg-emerald-100 text-emerald-800" },
  { id: "6", name: "Games", slug: "games", iconName: "Gamepad2", color: "bg-pink-100 text-pink-800" },
];

export const BRANDS = [
  { name: "Samsung", logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=200&auto=format&fit=crop" },
  { name: "Apple", logo: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?q=80&w=200&auto=format&fit=crop" },
  { name: "Philips", logo: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=200&auto=format&fit=crop" },
  { name: "Logitech", logo: "https://images.unsplash.com/photo-1625842268584-8f3290416979?q=80&w=200&auto=format&fit=crop" },
  { name: "Sony", logo: "https://images.unsplash.com/photo-1598331668826-20cecc596b86?q=80&w=200&auto=format&fit=crop" },
  { name: "Dell", logo: "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=200&auto=format&fit=crop" },
];

export const REF_REVIEWS = [
  {
    id: "rev1",
    author: "Ricardo M.",
    rating: 5,
    date: "12 Mar 2026",
    title: "Entrega super rápida!",
    comment: "Comprei o celular na segunda e chegou na quarta à tarde. Produto original, lacrado, excelente serviço da Novari.",
    verified: true
  },
  {
    id: "rev2",
    author: "Juliana K.",
    rating: 5,
    date: "05 Abr 2026",
    title: "Parabéns pelo suporte",
    comment: "Tive uma dúvida na hora de parcelar, entrei em contato com o atendimento pelo chat e resolveram em minutos. Recomendo muito!",
    verified: true
  },
  {
    id: "rev3",
    author: "Carlos E.",
    rating: 4,
    date: "28 Mai 2026",
    title: "Ótima experiência de compra",
    comment: "Loja muito confiável, o preço estava melhor que nos concorrentes directos. Interface super fácil de mexer tanto no PC quanto no celular.",
    verified: true
  }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq1",
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Na Novari, você pode pagar suas compras em até 10x sem juros no cartão de crédito, por Pix (com 5% de desconto adicional) ou via boleto bancário à vista."
  },
  {
    id: "faq2",
    question: "Como funciona a política de frete grátis?",
    answer: "Oferecemos frete grátis para compras acima de R$ 199 para todas as capitais do Sudeste e Sul, e acima de R$ 349 para as demais regiões do Brasil. Verifique o prazo digitando o seu CEP diretamente no carrinho de compras."
  },
  {
    id: "faq3",
    question: "O site é seguro? Meus dados estão protegidos?",
    answer: "Sim! A Novari utiliza protocolos de criptografia SSL de última geração (padrão bancário), garantindo que todos os dados de pagamento e informações pessoais sejam transmitidos e armazenados de maneira totalmente segura e sigilosa."
  },
  {
    id: "faq4",
    question: "Como faço para rastrear o meu pedido?",
    answer: "Assim que o pagamento for aprovado e seu pedido postado, enviaremos um código de rastreamento com link direto por e-mail. Você também pode acompanhar o status completo acessando a área 'Meus Pedidos' no topo do site."
  },
  {
    id: "faq5",
    question: "Qual é a política de trocas e devoluções?",
    answer: "Você pode solicitar a troca ou devolução do produto em até 7 dias corridos após o recebimento, sem nenhum custo extra, conforme o Código de Defesa do Consumidor. O reembolso ou troca é processado rapidamente."
  }
];

export const COUPONS: Coupon[] = [
  { code: "BEMVINDO5", discountPercent: 5, minPurchase: 100 },
  { code: "CLIENTEESPECIAL10", discountPercent: 10, minPurchase: 500 },
  { code: "NOVARI15", discountPercent: 15, minPurchase: 1500 },
];

export const PRODUCTS: Product[] = [
  {
    id: "nov-1",
    title: "Smartphone Galaxy S24 Ultra 5G Space Gray",
    tagline: "O poder do zoom de 100x e Inteligência Artificial integrada ao seu dia a dia.",
    description: "Equipado com o novíssimo processador Snapdragon 8 Gen 3, tela AMOLED dinâmica de 6.8 polegadas, 512GB de armazenamento e a revolucionária IA para tradução, fotos e transcrições em tempo real.",
    detailedDescription: "Redefina o que um smartphone de última geração pode fazer. O novo Galaxy S24 Ultra combina a potência da inteligência artificial para elevar suas fotos, otimizar sua bateria de 5.000mAh e oferecer performance em jogos inimaginável com Ray Tracing. Acompanha a caneta S-Pen para máxima produtividade, anotações de aula e controle remoto de fotos à distância.",
    price: 6499.00,
    originalPrice: 8499.00,
    discount: 23,
    rating: 4.9,
    ratingCount: 1240,
    installments: { count: 10, value: 649.90, interest: false },
    images: [
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=600&auto=format&fit=crop"
    ],
    category: "eletronicos",
    isLightning: true,
    isBestSeller: true,
    isRecommended: false,
    stock: 24,
    shipping: { free: true, cost: 0, days: 2 },
    brand: "Samsung",
    specs: [
      { label: "Bateria", value: "5000 mAh com Super Fast Charging" },
      { label: "Câmera Principal", value: "Quadrupla de 200MP + 50MP + 12MP + 10MP" },
      { label: "Processador", value: "Snapdragon 8 Gen 3 for Galaxy" },
      { label: "Tela", value: "6.8\" Quad HD+ AMOLED" },
      { label: "Armazenamento", value: "512 GB NVMe" },
      { label: "Memória RAM", value: "12 GB LPDDR5X" }
    ],
    reviews: [
      { id: "r1", author: "Felipe A.", rating: 5, date: "02 Mai 2026", title: "Celular incrível!", comment: "A inteligência artificial para tradução é sensacional, uso para trabalho todos os dias. Câmera absurda no escuro.", verified: true },
      { id: "r2", author: "Marcia G.", rating: 5, date: "24 Abr 2026", title: "Bateria dura muito", comment: "Estava receosa com o tamanho mas a caneta ajuda muito nas tarefas diárias. Tela espetacular e muito nítida sob o sol.", verified: true },
      { id: "r3", author: "Bruno S.", rating: 4, date: "15 Abr 2026", title: "Um monstro, mas caro", comment: "Desempenho espetacular em emulação e jogos. Único contra é o preço elevado, mas vale cada centavo pelo nível Premium.", verified: true }
    ]
  },
  {
    id: "nov-2",
    title: "Fone de Ouvido Noise Cancelling ANC Elite 1000",
    tagline: "O isolamento acústico supremo e fidelidade sonora em áudio Hi-Res.",
    description: "Som cristalino com cancelamento de ruído ativo adaptativo (ANC), conexões sem fio Bluetooth 5.3 estáveis de multiponto e duração extraordinária de até 40 horas de reprodução contínua.",
    detailedDescription: "Ouça apenas o que importa com a nova engenharia acústica do Headphone Elite 1000. Desfrute de graves profundos e frequências médias perfeitamente equilibradas. Com as almofadas viscoelásticas ultra macias, você desfruta de conforto estendido por várias horas seguidas no escritório, em voos ou em transporte coletivo.",
    price: 1199.00,
    originalPrice: 1599.00,
    discount: 25,
    rating: 4.8,
    ratingCount: 840,
    installments: { count: 10, value: 119.90, interest: false },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1481207604374-8356ce11850d?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=600&auto=format&fit=crop"
    ],
    category: "audio",
    isLightning: true,
    isBestSeller: false,
    isRecommended: true,
    stock: 45,
    shipping: { free: true, cost: 0, days: 3 },
    brand: "Sony",
    specs: [
      { label: "Autonomia", value: "Até 40 horas com ANC desligado / 30h ligado" },
      { label: "Alto-falantes", value: "Drivers de neodímio de 40 mm dome" },
      { label: "Conexões", value: "Bluetooth 5.3 + Cabo P2 3.5mm" },
      { label: "Pesos", value: "250g ultra ergonômico" }
    ],
    reviews: [
      { id: "r4", author: "Thiago O.", rating: 5, date: "15 Abr 2026", title: "Cancelamento de ruído sem igual", comment: "No escritório eu não escuto nem o ar condicionado nem a digitação das pessoas. Vale muito a pena para foco.", verified: true },
      { id: "r5", author: "Beatriz L.", rating: 4, date: "29 Mar 2026", title: "Som limpo e equilibrado", comment: "Não tem aquele grave exagerado que distorce o som. É flat e excelente para Jazz, Rock e podcasts. Muito confortável.", verified: true }
    ]
  },
  {
    id: "nov-3",
    title: "Relógio Inteligente Chronos Watch Active Pro v4",
    tagline: "O assistente de bem-estar corporal e monitor ativo de frequência e sono.",
    description: "Mantenha o controle do seu condicionamento físico diário. Conta com monitoramento avançado de frequência cardíaca de alta precisão, sensor de nível de oxigênio no sangue (SpO2), GPS independente integrado e tela AMOLED de 1,43 polegadas vibrante.",
    detailedDescription: "A companheira ideal para as suas corridas, treinos na academia ou para monitorar seu estresse diário. O Chronos Watch Active Pro v4 resiste à água em até 50 metros (5 ATM), oferecendo análise de mais de 120 esportes, cálculo de calorias gastas, registros precisos de sono profundo e pareamento instantâneo via APP próprio compatível com iOS e Android.",
    price: 499.00,
    originalPrice: 899.00,
    discount: 44,
    rating: 4.7,
    ratingCount: 2310,
    installments: { count: 5, value: 99.80, interest: false },
    images: [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517502884422-41eaaced0168?q=80&w=600&auto=format&fit=crop"
    ],
    category: "eletronicos",
    isLightning: true,
    isBestSeller: true,
    isRecommended: true,
    stock: 80,
    shipping: { free: true, cost: 0, days: 4 },
    brand: "Apple",
    specs: [
      { label: "Bateria", value: "Até 12 dias de uso típico contínuo" },
      { label: "Resistência Física", value: "Resistência à água 5 ATM (50m)" },
      { label: "Sensores", value: "Acelerômetro, Giroscópio, Cardíaco, Oxímetro" },
      { label: "Tela", value: "1.43 polegadas AMOLED Always-on" }
    ],
    reviews: [
      { id: "r6", author: "Daniel C.", rating: 5, date: "10 Jan 2026", title: "Bateria absurda!", comment: "Fiquei surpreso que dura quase duas semanas inteiras. O app do celular é muito bem feito e sincroniza com o Strava.", verified: true },
      { id: "r7", author: "Carla P.", rating: 4, date: "03 Fev 2026", title: "Lindo e funcional", comment: "Combina com qualquer roupa e as pulseiras são fáceis de trocar. Uso muito para medir meu pilates e caminhadas diárias.", verified: true }
    ]
  },
  {
    id: "nov-4",
    title: "Notebook Gamer Legion Pro-16 1TB SSD",
    tagline: "Desempenho gráfico em nível extremo com RTX 4070 e overclock automático.",
    description: "Projetado para entusiastas de jogos pesados e criadores de conteúdo digitais exigentes. Equipado com processador Intel Core i7, 16GB de RAM de ultra frequência, SSD NVMe de 1TB de carregamento imediato e placa gráfica NVIDIA GeForce RTX 4070 de última geração.",
    detailedDescription: "Domine todas as arenas virtuais e acelere suas renderizações 3D. O Notebook Gamer Legion traz tela com incríveis 165Hz de taxa de atualização para fluidez ultra suave, além do sistema duplo de resfriamento inteligente Coldfront com fluxo quádruplo de ar, mantendo o equipamento estável mesmo após horas intensivas de gameplay.",
    price: 8999.00,
    originalPrice: 11999.00,
    discount: 25,
    rating: 4.9,
    ratingCount: 312,
    installments: { count: 10, value: 899.90, interest: false },
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop"
    ],
    category: "informatica",
    isLightning: false,
    isBestSeller: true,
    isRecommended: false,
    stock: 12,
    shipping: { free: true, cost: 0, days: 3 },
    brand: "Dell",
    specs: [
      { label: "Vídeo Dedicado", value: "NVIDIA GeForce RTX 4070 8GB GDDR6" },
      { label: "Processador", value: "Intel Core i7-14700HX (up to 5.2 GHz)" },
      { label: "Memória RAM", value: "16 GB DDR5 5600 MHz" },
      { label: "Tela", value: "16\" WQXGA IPS de alta fidelidade" }
    ],
    reviews: [
      { id: "r8", author: "Gustavo H.", rating: 5, date: "30 Mar 2026", title: "Excelente máquina de trabalho/jogos", comment: "Excelente velocidade. Edito vídeos em 4k sem travamento algum, além de rodar os últimos lançamentos em gráficos no ultra.", verified: true },
      { id: "r9", author: "Aline V.", rating: 5, date: "12 Mar 2026", title: "A tela é um show à parte!", comment: "Resolução brilhante e cores vivas reais. Teclado mecânico retroiluminado muito macio para programar e jogar.", verified: true }
    ]
  },
  {
    id: "nov-5",
    title: "Fritadeira Elétrica Air Fryer Digital Touch 5.5L",
    tagline: "Receitas saudáveis, rápidas e deliciosas, sem usar uma gota de óleo.",
    description: "Prepare batatas crocantes, carnes e doces de forma uniforme com a potência de 1700W, cesto quadrado antiaderente espaçoso de 5.5 Litros, painel digital inteligente com 8 funções pré-programadas de preparo.",
    detailedDescription: "A fritadeira inteligente revolucionará seu método de alimentação saudável. Graças à tecnologia HotAir 3D de circulação contínua e turbinada, as receitas ficam incrivelmente crocantes por fora e macias por dentro em minutos. Perfeita para almoços e jantares completos de famílias brasileiras.",
    price: 389.00,
    originalPrice: 599.00,
    discount: 35,
    rating: 4.8,
    ratingCount: 1450,
    installments: { count: 8, value: 48.62, interest: false },
    images: [
      "https://images.unsplash.com/photo-1621972750749-0fbb1abb7736?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=600&auto=format&fit=crop"
    ],
    category: "eletrodomesticos",
    isLightning: true,
    isBestSeller: true,
    isRecommended: true,
    stock: 58,
    shipping: { free: true, cost: 0, days: 5 },
    brand: "Philips",
    specs: [
      { label: "Capacidade Útil", value: "5.5 Litros real" },
      { label: "Controle de Temperatura", value: "80°C a 200°C digital" },
      { label: "Potência Elétrica", value: "1700W de alta entrega" },
      { label: "Revestimento", value: "Duplo antiaderente ultra durável" }
    ],
    reviews: [
      { id: "r10", author: "Rosana M.", rating: 5, date: "22 Mai 2026", title: "Superou minhas expectativas!", comment: "Cesto enorme, cabe um frango inteiro de tamanho médio. Fácil de limpar por causa do material antiaderente de verdade.", verified: true },
      { id: "r11", author: "Eduardo T.", rating: 4, date: "15 Mai 2026", title: "Muito prática", comment: "Painel touchscreen muito fácil de operar. A batata frita parece feita em óleo, mas sem a gordura. Ótima compra.", verified: true }
    ]
  },
  {
    id: "nov-6",
    title: "Cafeteira Espresso Italiana Automática Pro",
    tagline: "Moedor de grãos integrado e bico vaporizador para cappuccino barista.",
    description: "Desfrute de cafés espressos cremosos na temperatura certa. Possui bomba italiana de pressão constante de 15 bar, reservatório de água de 1.8 Litros, moedor cônico em cerâmica regulável em 5 níveis.",
    detailedDescription: "A experiência premium de cafeteria no conforto do seu lar. A máquina mói grãos de café segundos antes da infusão para garantir o máximo aroma e sabor genuíno. Acompanha bico vaporizador profissional para preparar seu leite aerado cremoso para lattes deliciosos.",
    price: 1999.00,
    originalPrice: 2899.00,
    discount: 31,
    rating: 4.7,
    ratingCount: 380,
    installments: { count: 10, value: 199.90, interest: false },
    images: [
      "https://images.unsplash.com/photo-1517256064527-09c53b2d0bc6?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop"
    ],
    category: "eletrodomesticos",
    isLightning: false,
    isBestSeller: false,
    isRecommended: true,
    stock: 15,
    shipping: { free: true, cost: 0, days: 4 },
    brand: "Philips",
    specs: [
      { label: "Pressão", value: "15 Bar de bombeamento profissional" },
      { label: "Moedor", value: "Cerâmica cônica ajustável com 5 níveis" },
      { label: "Capacidade Caixa Grãos", value: "250g com vedação aromática" },
      { label: "Voltagem", value: "220V ou 110v selecionáveis" }
    ],
    reviews: [
      { id: "r12", author: "Maurício L.", rating: 5, date: "12 Abr 2026", title: "Espresso com espuma densa", comment: "O café sai quente e super aromatizado. A limpeza das peças de descarte é incrivelmente simples.", verified: true },
      { id: "r13", author: "Helena F.", rating: 4, date: "09 Mar 2026", title: "Café de barista em casa", comment: "Gostei muito das regulagens de intensidade do pó. O vaporizador de leite faz uma espuma duradoura igual de cafeteria.", verified: true }
    ]
  },
  {
    id: "nov-7",
    title: "Monitor Gamer UltraWide IPS 34 polegadas WQHD",
    tagline: "Imersão total de visão panorâmica e taxa de atualização de 144Hz real.",
    description: "Aumente drasticamente sua produtividade de janelas ou performance em jogos com a tela curva IPS cinematográfica, proporção dinâmica de 21:9, suporte VESA, FreeSync Premium e HDR400.",
    detailedDescription: "A tela expansiva definitiva para profissionais e gamings. Trabalhe em até 3 programas simultâneos sem sobreposição ou jogue se antecipando aos adversários com o campo de visão ampliado de 21:9. Com certificação de proteção ocular Flicker Free e Low Blue Light, você trabalha várias horas sem fadiga ou dores.",
    price: 1899.00,
    originalPrice: 2499.00,
    discount: 24,
    rating: 4.8,
    ratingCount: 520,
    installments: { count: 10, value: 189.90, interest: false },
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=600&auto=format&fit=crop"
    ],
    category: "informatica",
    isLightning: false,
    isBestSeller: true,
    isRecommended: false,
    stock: 22,
    shipping: { free: true, cost: 0, days: 3 },
    brand: "Samsung",
    specs: [
      { label: "Tamanho de Tela", value: "34 polegadas com curvatura 1500R" },
      { label: "Tecnologia de Painel", value: "IPS de amplo ângulo de visão de 178°" },
      { label: "Resolução", value: "WQHD UltraWide (3440 x 1440)" },
      { label: "tempo de respostas", value: "1ms de velocidade extrema MPRT" }
    ],
    reviews: [
      { id: "r14", author: "Samuel T.", rating: 5, date: "04 Mai 2026", title: "Excelente para produtores de código", comment: "Excelente para programar. Consigo deixar o código aberto, o emulador de teste e as anotações sem esforço algum.", verified: true },
      { id: "r15", author: "Paula E.", rating: 5, date: "22 Fev 2026", title: "Ótima fidelidade de cor para Design", comment: "Cobre quase 100% do sRGB. Imagem nítida e sem distorção nas bordas curvadas.", verified: true }
    ]
  },
  {
    id: "nov-8",
    title: "Teclado Mecânico RGB Wireless Stealth Pro v2",
    tagline: "Teclas suaves, digitação acústica perfeita e bateria recarregável duradoura.",
    description: "Formato compacto de 80% (TKL), switches mecânicos marrons ultra silenciosos, conexões triplas (Wireless 2.4G, Bluetooth 5.1 e USB-C), iluminação RGB Chroma personalizável.",
    detailedDescription: "Descubra o extremo conforto ergonômico de digitação de longa duração. O Stealth Pro v2 possui construção com chassi metálico de liga aeroespacial, teclas injetadas com dupla injeção que nunca desbotam e switches táteis lubrificados de fábrica para resposta immediate com sonoridade clássica harmoniosa.",
    price: 349.00,
    originalPrice: 499.00,
    discount: 30,
    rating: 4.7,
    ratingCount: 650,
    installments: { count: 6, value: 58.16, interest: false },
    images: [
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?q=80&w=600&auto=format&fit=crop"
    ],
    category: "informatica",
    isLightning: true,
    isBestSeller: false,
    isRecommended: false,
    stock: 95,
    shipping: { free: false, cost: 19.90, days: 5 },
    brand: "Logitech",
    specs: [
      { label: "Switches", value: "Táteis mecânicos Brown (Silenciosos e rápidos)" },
      { label: "Layout", value: "ABNT2 (Com tecla Ç clássica)" },
      { label: "Tipo de Conexão", value: "Dongle USB 2.4Ghz + Bluetooth + Cabo USB-C" },
      { label: "Duração Bateria", value: "Até 120 horas sem RGB / 40 horas com iluminação ativa" }
    ],
    reviews: [
      { id: "r16", author: "Arthur R.", rating: 5, date: "23 Jan 2026", title: "Digitação macia sem barulho", comment: "Excelente para quem trabalha em escritório compartilhado ou quarto à noite. Conecta rápido no notebook e iPad.", verified: true },
      { id: "r17", author: "Natália O.", rating: 4, date: "15 Jan 2026", title: "Compacto e muito bonito", comment: "O tamanho sem o teclado numérico liberou muito espaço do mousepad. O efeito das cores é muito elegante por trás das teclas.", verified: true }
    ]
  },
  {
    id: "nov-9",
    title: "Aspirador de Pó Robô Smart Cleaner Premium",
    tagline: "Vaporiza, varre, aspira e passa pano úmido inteligentemente sozinho.",
    description: "Sua residência limpa sem esforço manual. Equipado com mapeamento laser 3D LiDAR avançado para desvio inteligente de obstáculos delicados, reservatório duplo híbrido, sucção ultra potente de 4000Pa.",
    detailedDescription: "O melhor aliado contra pelos de pets, poeira e sujeiras diárias. O Smart Cleaner cria rotas virtuais precisas otimizadas através do app mobile, permitindo programar barreiras virtuais exclusivas de não-entrada ou horários de agendamento de limpeza mesmo quando você estiver viajando ou trabalhando.",
    price: 1549.00,
    originalPrice: 2199.00,
    discount: 29,
    rating: 4.8,
    ratingCount: 460,
    installments: { count: 10, value: 154.90, interest: false },
    images: [
      "https://images.unsplash.com/photo-1575656191560-0059353174d5?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=600&auto=format&fit=crop"
    ],
    category: "casa",
    isLightning: false,
    isBestSeller: true,
    isRecommended: true,
    stock: 14,
    shipping: { free: true, cost: 0, days: 3 },
    brand: "Philips",
    specs: [
      { label: "Poder de Sucção", value: "4000 Pa de extra pressão" },
      { label: "Sistema de Mapeamento", value: "Laser de varredura LiDAR de 360 graus" },
      { label: "Tempo de Trabalho", value: "Até 150 minutos (retorna sozinho à base para recarregar)" },
      { label: "Capacidade de Suportes", value: "Reservatório de poeira 400ml / reservatório de água d'água 300ml" }
    ],
    reviews: [
      { id: "r18", author: "César G.", rating: 5, date: "11 Abr 2026", title: "Muda totalmente a rotina da casa", comment: "Tenho dois gatos de pelo longo, colocamos o robô todo dia de manhã e a casa se mantém zerada de pelos. Mapeou perfeitamente.", verified: true },
      { id: "r19", author: "Juliane F.", rating: 5, date: "30 Mar 2026", title: "Melhor investimento que já fiz!", comment: "Muito inteligente, não bate forte nos móveis e desvia de sapatos com facilidade. O passa pano deixa um perfume bom na casa.", verified: true }
    ]
  },
  {
    id: "nov-10",
    title: "Cadeira Ergonômica Pro-Confort Mesh Adjust",
    tagline: "Alívio imediato postural de coluna para regimes intensivos de Home Office.",
    description: "Aprovada ergonomicamente pelas diretrizes mundiais. Estrutura confeccionada em material mesh transpirável de alta densidade, suporte dinâmico lombar ajustável, apoios 3D para braços.",
    detailedDescription: "Trabalhe e estude sem incômodos nas costas ou dores musculares. Com cilindro elétrico de gás de Classe 4 para máxima segurança em sustentação, rodízios de PU anti-risco de deslizamento ultra macio em pisos laminados ou madeira, encosto de cabeça confortável regulável.",
    price: 849.00,
    originalPrice: 1199.00,
    discount: 29,
    rating: 4.7,
    ratingCount: 1120,
    installments: { count: 10, value: 84.90, interest: false },
    images: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1505797149-43b0069ec26b?q=80&w=600&auto=format&fit=crop"
    ],
    category: "casa",
    isLightning: false,
    isBestSeller: false,
    isRecommended: true,
    stock: 30,
    shipping: { free: true, cost: 0, days: 6 },
    brand: "Sony", // We can use Sony / generic or just a brand
    specs: [
      { label: "Carga Suportada", value: "Até 150 kg com estabilidade total" },
      { label: "Ajuste Dos Braços", value: "Direcional 3D (altura, ângulo e avanço)" },
      { label: "Mecanismo De Inclinação", value: "Multifuncional com trava em qualquer ponto de reclinação" },
      { label: "Material Do Assento", value: "Espuma injetada com densidade D50 + Mesh superior" }
    ],
    reviews: [
      { id: "rev-20", author: "Marcos L.", rating: 5, date: "12 Mar 2026", title: "Adeus dor nas costas!", comment: "Estou utilizando há duas semanas, trabalho mais de 8 horas sentado. O apoio de lombar ajustável fez toda a diferença pra mim.", verified: true },
      { id: "rev-21", author: "Patrícia B.", rating: 4, date: "01 Mar 2026", title: "Muito boa qualidade", comment: "Excelente acabamento e peso. O tecido mesh não esquenta o corpo em dias abafados de verão. Recomendo.", verified: true }
    ]
  },
  {
    id: "nov-11",
    title: "Console PlayStation 5 Slim SSD 825GB",
    tagline: "Desfrute de carregamentos ultra-rápidos e gráficos estonteantes em 4K HDR.",
    description: "A revolução completa dos jogos modernos. Acompanha o inovador controle DualSense com gatilhos adaptativos imersivos, SSD de carregamento imediato e suporte para Tempest 3D AudioTech de imersão sonora profunda.",
    detailedDescription: "Experimente um nível totalmente inédito de imersão nos jogos exclusivos do ecossistema PlayStation. Aproveite jogabilidade de taxa de atualização de até 120 FPS em jogos compatíveis com saída em 4K. Deslumbre-se com a tecnologia Ray Tracing de luzes e reflexos hiper-realistas.",
    price: 3699.00,
    originalPrice: 4299.00,
    discount: 13,
    rating: 4.9,
    ratingCount: 1650,
    installments: { count: 10, value: 369.90, interest: false },
    images: [
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1622262695713-53741a654854?q=80&w=600&auto=format&fit=crop"
    ],
    category: "games",
    isLightning: false,
    isBestSeller: true,
    isRecommended: true,
    stock: 8,
    shipping: { free: true, cost: 0, days: 3 },
    brand: "Sony",
    specs: [
      { label: "Armazenamento Útil", value: "SSD NVMe Ultra veloz de 825 GB" },
      { label: "Mídia Física", value: "Leitor de discos Blu-ray 4K Ultra HD" },
      { label: "Resolução Máxima", value: "Até 8K / 4K em 120Hz de saída" },
      { label: "Áudio", value: "Tecnologia de Áudio 3D Tempest para fones" }
    ],
    reviews: [
      { id: "rev-22", author: "Vitor N.", rating: 5, date: "24 Fev 2026", title: "Console maravilhoso!", comment: "Jogar com o DualSense é outra coisa, você sente a trepidação dos carros e a tensão do arco de flecha. Comprei e chegou muito rápido.", verified: true },
      { id: "rev-23", author: "Mariana S.", rating: 5, date: "15 Jan 2026", title: "Graficos perfeitos", comment: "Fiquei impressionada com a velocidade de carregamento dos jogos. Menos de 5 segundos de espera.", verified: true }
    ]
  },
  {
    id: "nov-12",
    title: "Caixa de Som Portátil Bluetooth Pro 40W",
    tagline: "Som estéreo potente de 360°, graves robustos e resistência IPX7 total contra água.",
    description: "Perfeita para festas na piscina e passeios ao ar livre. Potência acústica real de 40W RMS, conexão instantânea Bluetooth 5.2 de baixo delay e bateria de longa vida para até 15 horas de festa constante.",
    detailedDescription: "Amplifique suas playlists favoritas onde quer que você esteja. Totalmente à prova d'água (IPX7), aguenta chuvas repentinas, respingos na beira da piscina ou até submersão de curta duração. Conecte múltiplas caixas da mesma marca em modo festa estéreo para sonorização ampla.",
    price: 329.00,
    originalPrice: 499.00,
    discount: 34,
    rating: 4.8,
    ratingCount: 790,
    installments: { count: 6, value: 54.83, interest: false },
    images: [
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?q=80&w=600&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=600&auto=format&fit=crop"
    ],
    category: "audio",
    isLightning: true,
    isBestSeller: false,
    isRecommended: false,
    stock: 67,
    shipping: { free: false, cost: 12.90, days: 4 },
    brand: "Sony",
    specs: [
      { label: "Potência Sonora", value: "40W RMS Stereo" },
      { label: "Resistência", value: "Classificação de proteção IPX7 (À prova d'água)" },
      { label: "Bateria", value: "6000 mAh recarregável via USB-C" },
      { label: "Frequência", value: "50Hz - 20kHz" }
    ],
    reviews: [
      { id: "rev-24", author: "Leandro P.", rating: 5, date: "10 Jan 2026", title: "Som limpo com grave forte", comment: "Pelo tamanho dela, o som é absurdamente alto e não distorce nem no máximo. Levei para a chácara e fez sucesso.", verified: true },
      { id: "rev-25", author: "Cibele F.", rating: 4, date: "02 Jan 2026", title: "Excelente custo benefício", comment: "Dura bastante e resistiu muito bem a respingos. Conectividade imediata com celulares Android e iPhone.", verified: true }
    ]
  }
];
