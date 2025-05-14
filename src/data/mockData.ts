
import researchersList from './mockResearchers';

// Define joaoResearcher
export const joaoResearcher = {
  name: "João da Silva",
  orcidId: "0000-0002-1234-5678",
  institution: "Universidade Federal de São Paulo",
  department: "Departamento de Ciência da Computação",
  role: "Professor Associado",
  bio: "João da Silva é professor associado da Universidade Federal de São Paulo com foco em inteligência artificial e aprendizado de máquina. Possui doutorado pela USP e pós-doutorado pela Universidade de Stanford.",
  email: "joao.silva@unifesp.edu.br",
  researchAreas: ["Inteligência Artificial", "Aprendizado de Máquina", "Visão Computacional"],
  education: [
    "Ph.D. em Ciência da Computação, USP, 2010",
    "Mestrado em Ciência da Computação, UNICAMP, 2006",
    "Bacharelado em Ciência da Computação, UNIFESP, 2004"
  ],
  awards: [
    "Pesquisador Destaque FAPESP, 2019",
    "Melhor Artigo na Conferência Brasileira de IA, 2017"
  ],
  institutionalPage: "https://www.unifesp.br/docentes/joaosilva",
  externalLinks: [
    {
      name: "Google Scholar",
      url: "https://scholar.google.com/citations?user=joaosilva"
    },
    {
      name: "ResearchGate",
      url: "https://www.researchgate.net/profile/Joao-Silva-25"
    }
  ],
  publications: [
    {
      id: "j1",
      title: "Abordagens de Aprendizado Profundo para Detecção de Objetos em Tempo Real",
      authors: [
        { name: "João da Silva", orcidId: "0000-0002-1234-5678" },
        { name: "Maria Santos", orcidId: "0000-0001-9876-5432" }
      ],
      year: 2022,
      type: "Journal Article",
      source: "Revista Brasileira de Computação",
      identifier: { type: "DOI", value: "10.1000/j.comp.2022.01.001" },
      abstract: "Esta pesquisa apresenta uma nova abordagem para detecção de objetos em tempo real utilizando técnicas de aprendizado profundo, com foco em aplicações em dispositivos móveis.",
      links: [
        { name: "PDF", url: "https://example.com/paper1.pdf" }
      ],
      project: "p1"
    },
    {
      id: "j2",
      title: "Um Framework para Análise de Sentimentos em Português Brasileiro",
      authors: [
        { name: "João da Silva", orcidId: "0000-0002-1234-5678" },
        { name: "Pedro Almeida", orcidId: "0000-0003-4567-8901" }
      ],
      year: 2021,
      type: "Conference Paper",
      source: "Conferência Internacional de PLN",
      identifier: { type: "DOI", value: "10.1000/conf.pln.2021.05.012" },
      abstract: "Apresentamos um framework completo para análise de sentimentos em textos escritos em português brasileiro, incluindo novos conjuntos de dados anotados e modelos pré-treinados.",
      links: [
        { name: "Código", url: "https://github.com/joaosilva/sentimento-pt-br" }
      ],
      project: "p2"
    },
    {
      id: "j3",
      title: "Modelos Generativos para Síntese de Imagens Médicas",
      authors: [
        { name: "João da Silva", orcidId: "0000-0002-1234-5678" }
      ],
      year: 2020,
      type: "Book Chapter",
      source: "Avanços em IA para Medicina",
      identifier: { type: "ISBN", value: "978-3-16-148410-0" },
      abstract: "Este capítulo explora o uso de modelos generativos adversariais (GANs) para a síntese de imagens médicas, com aplicações em treinamento de algoritmos de diagnóstico automático.",
      links: [],
      project: "p1"
    }
  ],
  projects: [
    {
      id: "p1",
      name: "IA para Análise de Imagens Médicas",
      description: "Desenvolvimento de técnicas de aprendizado profundo para análise automática de imagens médicas, com foco em detecção precoce de doenças.",
      startYear: 2020,
      endYear: 2023,
      fundingAgency: "FAPESP",
      role: "Coordenador"
    },
    {
      id: "p2",
      name: "PLN para Análise de Mídias Sociais",
      description: "Aplicação de técnicas de processamento de linguagem natural para análise de conteúdo em mídias sociais em português brasileiro.",
      startYear: 2019,
      endYear: 2022,
      fundingAgency: "CNPq",
      role: "Pesquisador Principal"
    }
  ]
};

// Define mockResearcherData
export const mockResearcherData = {
  name: "Maria Oliveira Silva",
  orcidId: "0000-0002-1234-5679",
  institution: "Universidade de São Paulo (ICMC-USP)",
  bio: "Pesquisadora na área de Ciência da Computação com foco em Inteligência Artificial e Aprendizado de Máquina aplicados a problemas complexos.",
  researchAreas: ["Inteligência Artificial", "Aprendizado de Máquina", "Processamento de Linguagem Natural", "Ciência de Dados"],
  institutionalPage: "https://example.com/researcher-page",
  externalLinks: [
    { name: "Google Scholar", url: "https://scholar.google.com" },
    { name: "ResearchGate", url: "https://www.researchgate.net" },
    { name: "Lattes CV", url: "http://lattes.cnpq.br" }
  ],
  publications: [
    {
      title: "Aplicações de Deep Learning para Detecção de Fraudes em Sistemas Financeiros",
      authors: [
        { name: "Maria Oliveira Silva", orcidId: "0000-0002-1234-5679" },
        { name: "João Santos", orcidId: "0000-0003-2345-6789" }
      ],
      year: 2023,
      type: "Journal Article",
      source: "Journal of Applied Computing",
      identifier: { type: "DOI", value: "10.1109/TAC.2023.456789" },
      abstract: "Este artigo apresenta uma arquitetura avançada de redes neurais para detecção de fraudes em sistemas financeiros, alcançando precisão superior a métodos tradicionais.",
      links: [
        { name: "Versão publicada", url: "https://doi.org/10.1109/TAC.2023.456789" },
        { name: "Preprint", url: "https://arxiv.org/abs/2023.12345" }
      ],
      project: "IA para Segurança Financeira"
    },
    {
      title: "Modelos Transformers para Análise de Sentimentos em Português",
      authors: [
        { name: "Maria Oliveira Silva", orcidId: "0000-0002-1234-5679" },
        { name: "Ana Pereira", orcidId: "0000-0001-5678-9012" }
      ],
      year: 2022,
      type: "Conference Paper",
      source: "Proceedings of the Brazilian Symposium on Artificial Intelligence",
      identifier: { type: "ISBN", value: "978-1-4503-1234-5" },
      abstract: "Desenvolvimento de modelos baseados em arquitetura Transformer para análise de sentimentos em português brasileiro, com foco em redes sociais.",
      links: [
        { name: "Versão publicada", url: "https://dl.acm.org/doi/10.1145/3512345.3456789" },
        { name: "Repositório GitHub", url: "https://github.com/example/sentiment-analysis" }
      ],
      project: "NLP para Língua Portuguesa"
    },
    {
      title: "Algoritmos de Otimização para Roteamento em Redes IoT",
      authors: [
        { name: "Carlos Ferreira", orcidId: "0000-0004-6789-0123" },
        { name: "Maria Oliveira Silva", orcidId: "0000-0002-1234-5679" }
      ],
      year: 2021,
      type: "Journal Article",
      source: "IEEE Internet of Things Journal",
      identifier: { type: "DOI", value: "10.1109/JIOT.2021.123456" },
      abstract: "Proposta de novos algoritmos de otimização para roteamento eficiente em redes IoT com recursos limitados de energia.",
      links: [
        { name: "Versão publicada", url: "https://doi.org/10.1109/JIOT.2021.123456" }
      ],
      project: "Redes IoT Sustentáveis"
    },
    {
      title: "Técnicas de Mineração de Dados para Detecção de Padrões em Registros Médicos",
      authors: [
        { name: "Maria Oliveira Silva", orcidId: "0000-0002-1234-5679" },
        { name: "Roberto Almeida", orcidId: "0000-0005-9876-5432" }
      ],
      year: 2021,
      type: "Book Chapter",
      source: "Advances in Data Mining for Healthcare",
      identifier: { type: "ISBN", value: "978-3-030-12345-6" },
      abstract: "Capítulo que apresenta métodos avançados de mineração de dados aplicados à detecção de padrões em registros médicos eletrônicos para apoio à decisão clínica.",
      links: [
        { name: "Editora", url: "https://www.springer.com/book/123456789" }
      ],
      project: "Mineração de Dados em Saúde"
    },
    {
      title: "Abordagem Híbrida para Sistemas de Recomendação com Feedback Implícito",
      authors: [
        { name: "Ana Pereira", orcidId: "0000-0001-5678-9012" },
        { name: "Maria Oliveira Silva", orcidId: "0000-0002-1234-5679" }
      ],
      year: 2020,
      type: "Conference Paper",
      source: "International Conference on Recommender Systems",
      identifier: { type: "DOI", value: "10.1145/3340631.3394845" },
      abstract: "Proposta de uma abordagem híbrida para sistemas de recomendação que utiliza dados de feedback implícito do usuário.",
      links: [
        { name: "Versão publicada", url: "https://doi.org/10.1145/3340631.3394845" },
        { name: "Slides da apresentação", url: "https://slideshare.net/example" }
      ],
      project: "NLP para Língua Portuguesa"
    },
    {
      title: "Privacidade em Sistemas de Aprendizado Federado: Desafios e Soluções",
      authors: [
        { name: "Maria Oliveira Silva", orcidId: "0000-0002-1234-5679" }
      ],
      year: 2019,
      type: "Journal Article",
      source: "Journal of Privacy and Security",
      identifier: { type: "DOI", value: "10.1145/3312345.3456789" },
      abstract: "Análise dos principais desafios de privacidade em sistemas de aprendizado federado e propostas de soluções baseadas em criptografia homomórfica.",
      links: [
        { name: "Versão publicada", url: "https://doi.org/10.1145/3312345.3456789" },
        { name: "Preprint", url: "https://arxiv.org/abs/2019.12345" }
      ],
      project: "IA para Segurança Financeira"
    }
  ],
  projects: [
    {
      id: "p1",
      name: "NLP para Língua Portuguesa",
      description: "Desenvolvimento de modelos e recursos para processamento de linguagem natural específicos para o português brasileiro.",
      startYear: 2020,
      endYear: 2023,
      funding: "FAPESP - Processo 2020/12345-6"
    },
    {
      id: "p2",
      name: "IA para Segurança Financeira",
      description: "Aplicação de técnicas de inteligência artificial para detecção de fraudes e análise de riscos em sistemas financeiros.",
      startYear: 2019,
      endYear: null,
      funding: "CNPq - Processo 123456/2019-7"
    },
    {
      id: "p3",
      name: "Redes IoT Sustentáveis",
      description: "Pesquisa sobre algoritmos e protocolos para redes IoT com foco em eficiência energética e sustentabilidade.",
      startYear: 2021,
      endYear: 2022,
      funding: "Empresa parceira - Projeto de cooperação universidade-empresa"
    },
    {
      id: "p4",
      name: "Mineração de Dados em Saúde",
      description: "Aplicação de técnicas de mineração de dados e aprendizado de máquina para análise de dados de saúde e apoio à decisão clínica.",
      startYear: 2018,
      endYear: 2021,
      funding: "CAPES - Programa PROCAD"
    }
  ]
};

// Define complete mockResearchers array
export const mockResearchers = [
  joaoResearcher,
  {
    name: "Maria Santos",
    orcidId: "0000-0001-9876-5432",
    institution: "Universidade de São Paulo",
    bio: "Pesquisadora na área de inteligência artificial com foco em aprendizado de máquina.",
    researchAreas: ["Machine Learning", "Data Science"],
    institutionalPage: "https://www.usp.br/",
    externalLinks: [],
    publications: [],
    projects: []
  },
  {
    name: "Pedro Almeida",
    orcidId: "0000-0003-4567-8901",
    institution: "Universidade Estadual de Campinas",
    bio: "Especialista em processamento de linguagem natural e recuperação de informação.",
    researchAreas: ["NLP", "Information Retrieval"],
    institutionalPage: "https://www.unicamp.br/",
    externalLinks: [],
    publications: [],
    projects: []
  }
];
