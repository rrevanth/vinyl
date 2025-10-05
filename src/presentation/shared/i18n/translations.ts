import { SupportedLocale } from '../stores/app.store'

interface Translations {
  navigation: {
    home: string
    search: string
    library: string
    settings: string
  }
  home: {
    title: string
    subtitle: string
    description: string
  }
  search: {
    title: string
    subtitle: string
  }
  library: {
    title: string
  }
  settings: {
    title: string
  }
}

const translations: Record<SupportedLocale, Translations> = {
  en: {
    navigation: {
      home: 'Home',
      search: 'Search',
      library: 'Library',
      settings: 'Settings',
    },
    home: {
      title: 'Welcome to VNYL',
      subtitle: 'Your complete media discovery platform',
      description:
        'Powered by TMDB and Stremio - discover movies, TV shows, and streaming options all in one place.',
    },
    search: {
      title: 'Search',
      subtitle: 'Discover movies, TV shows, and people',
    },
    library: {
      title: 'Library',
    },
    settings: {
      title: 'Settings',
    },
  },
  es: {
    navigation: {
      home: 'Inicio',
      search: 'Buscar',
      library: 'Biblioteca',
      settings: 'Configuración',
    },
    home: {
      title: 'Bienvenido a VNYL',
      subtitle: 'Tu plataforma completa de descubrimiento de medios',
      description:
        'Impulsado por TMDB y Stremio: descubre películas, programas de TV y opciones de streaming en un solo lugar.',
    },
    search: {
      title: 'Buscar',
      subtitle: 'Descubre películas, programas de TV y personas',
    },
    library: {
      title: 'Biblioteca',
    },
    settings: {
      title: 'Configuración',
    },
  },
  fr: {
    navigation: {
      home: 'Accueil',
      search: 'Rechercher',
      library: 'Bibliothèque',
      settings: 'Paramètres',
    },
    home: {
      title: 'Bienvenue sur VNYL',
      subtitle: 'Votre plateforme complète de découverte de médias',
      description:
        'Alimenté par TMDB et Stremio - découvrez films, séries TV et options de streaming en un seul endroit.',
    },
    search: {
      title: 'Rechercher',
      subtitle: 'Découvrez des films, séries TV et personnalités',
    },
    library: {
      title: 'Bibliothèque',
    },
    settings: {
      title: 'Paramètres',
    },
  },
  de: {
    navigation: {
      home: 'Start',
      search: 'Suchen',
      library: 'Bibliothek',
      settings: 'Einstellungen',
    },
    home: {
      title: 'Willkommen bei VNYL',
      subtitle: 'Ihre vollständige Medien-Entdeckungsplattform',
      description:
        'Angetrieben von TMDB und Stremio - entdecken Sie Filme, TV-Sendungen und Streaming-Optionen an einem Ort.',
    },
    search: {
      title: 'Suchen',
      subtitle: 'Entdecke Filme, TV-Sendungen und Personen',
    },
    library: {
      title: 'Bibliothek',
    },
    settings: {
      title: 'Einstellungen',
    },
  },
  it: {
    navigation: {
      home: 'Home',
      search: 'Cerca',
      library: 'Libreria',
      settings: 'Impostazioni',
    },
    home: {
      title: 'Benvenuto in VNYL',
      subtitle: 'La tua piattaforma completa per la scoperta di media',
      description:
        'Alimentato da TMDB e Stremio - scopri film, programmi TV e opzioni di streaming in un unico posto.',
    },
    search: {
      title: 'Cerca',
      subtitle: 'Scopri film, programmi TV e persone',
    },
    library: {
      title: 'Libreria',
    },
    settings: {
      title: 'Impostazioni',
    },
  },
  pt: {
    navigation: {
      home: 'Início',
      search: 'Buscar',
      library: 'Biblioteca',
      settings: 'Configurações',
    },
    home: {
      title: 'Bem-vindo ao VNYL',
      subtitle: 'Sua plataforma completa de descoberta de mídia',
      description:
        'Alimentado por TMDB e Stremio - descubra filmes, programas de TV e opções de streaming em um só lugar.',
    },
    search: {
      title: 'Buscar',
      subtitle: 'Descubra filmes, programas de TV e pessoas',
    },
    library: {
      title: 'Biblioteca',
    },
    settings: {
      title: 'Configurações',
    },
  },
  ja: {
    navigation: {
      home: 'ホーム',
      search: '検索',
      library: 'ライブラリ',
      settings: '設定',
    },
    home: {
      title: 'VNYLへようこそ',
      subtitle: '完全なメディア発見プラットフォーム',
      description: 'TMDBとStremioを活用 - 映画、TV番組、ストリーミングオプションを一箇所で発見。',
    },
    search: {
      title: '検索',
      subtitle: '映画、TV番組、人物を発見',
    },
    library: {
      title: 'ライブラリ',
    },
    settings: {
      title: '設定',
    },
  },
  zh: {
    navigation: {
      home: '首页',
      search: '搜索',
      library: '库',
      settings: '设置',
    },
    home: {
      title: '欢迎来到 VNYL',
      subtitle: '您完整的媒体发现平台',
      description: '由 TMDB 和 Stremio 提供支持 - 在一个地方发现电影、电视节目和流媒体选项。',
    },
    search: {
      title: '搜索',
      subtitle: '发现电影、电视节目和人物',
    },
    library: {
      title: '库',
    },
    settings: {
      title: '设置',
    },
  },
  ko: {
    navigation: {
      home: '홈',
      search: '검색',
      library: '라이브러리',
      settings: '설정',
    },
    home: {
      title: 'VNYL에 오신 것을 환영합니다',
      subtitle: '완전한 미디어 발견 플랫폼',
      description:
        'TMDB와 Stremio로 구동 - 한 곳에서 영화, TV 프로그램 및 스트리밍 옵션을 발견하세요.',
    },
    search: {
      title: '검색',
      subtitle: '영화, TV 프로그램 및 인물 발견',
    },
    library: {
      title: '라이브러리',
    },
    settings: {
      title: '설정',
    },
  },
}

export { translations }
export type { Translations }
