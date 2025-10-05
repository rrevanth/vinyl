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
    appearance: {
      title: string
      theme: string
      theme_light: string
      theme_dark: string
      theme_system: string
    }
    display: {
      title: string
      app_language: string
      content_language: string
      grid_view_mode: string
      grid_compact: string
      grid_comfortable: string
      grid_cozy: string
      adult_content: string
      autoplay_trailers: string
    }
    about: {
      title: string
      version: string
      powered_by: string
      clear_cache: string
      cache_size: string
      attributions: string
    }
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
      appearance: {
        title: 'Appearance',
        theme: 'Theme',
        theme_light: 'Light',
        theme_dark: 'Dark',
        theme_system: 'System',
      },
      display: {
        title: 'Display',
        app_language: 'App Language',
        content_language: 'Content Language',
        grid_view_mode: 'Grid View Mode',
        grid_compact: 'Compact',
        grid_comfortable: 'Comfortable',
        grid_cozy: 'Cozy',
        adult_content: 'Show Adult Content',
        autoplay_trailers: 'Autoplay Trailers',
      },
      about: {
        title: 'About',
        version: 'Version',
        powered_by: 'Powered by',
        clear_cache: 'Clear Cache',
        cache_size: 'Cache Size',
        attributions: 'Attributions',
      },
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
      appearance: {
        title: 'Apariencia',
        theme: 'Tema',
        theme_light: 'Claro',
        theme_dark: 'Oscuro',
        theme_system: 'Sistema',
      },
      display: {
        title: 'Visualización',
        app_language: 'Idioma de la App',
        content_language: 'Idioma del Contenido',
        grid_view_mode: 'Modo de Vista en Cuadrícula',
        grid_compact: 'Compacto',
        grid_comfortable: 'Cómodo',
        grid_cozy: 'Acogedor',
        adult_content: 'Mostrar Contenido Adulto',
        autoplay_trailers: 'Reproducir Tráilers Automáticamente',
      },
      about: {
        title: 'Acerca de',
        version: 'Versión',
        powered_by: 'Impulsado por',
        clear_cache: 'Limpiar Caché',
        cache_size: 'Tamaño del Caché',
        attributions: 'Atribuciones',
      },
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
      appearance: {
        title: 'Apparence',
        theme: 'Thème',
        theme_light: 'Clair',
        theme_dark: 'Sombre',
        theme_system: 'Système',
      },
      display: {
        title: 'Affichage',
        app_language: "Langue de l'Application",
        content_language: 'Langue du Contenu',
        grid_view_mode: 'Mode Grille',
        grid_compact: 'Compact',
        grid_comfortable: 'Confortable',
        grid_cozy: 'Douillet',
        adult_content: 'Afficher le Contenu Adulte',
        autoplay_trailers: 'Lecture Auto des Bandes-annonces',
      },
      about: {
        title: 'À Propos',
        version: 'Version',
        powered_by: 'Alimenté par',
        clear_cache: 'Vider le Cache',
        cache_size: 'Taille du Cache',
        attributions: 'Attributions',
      },
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
      appearance: {
        title: 'Erscheinungsbild',
        theme: 'Design',
        theme_light: 'Hell',
        theme_dark: 'Dunkel',
        theme_system: 'System',
      },
      display: {
        title: 'Anzeige',
        app_language: 'App-Sprache',
        content_language: 'Inhaltssprache',
        grid_view_mode: 'Rasteransichtsmodus',
        grid_compact: 'Kompakt',
        grid_comfortable: 'Komfortabel',
        grid_cozy: 'Gemütlich',
        adult_content: 'Erwachseneninhalte anzeigen',
        autoplay_trailers: 'Trailer automatisch abspielen',
      },
      about: {
        title: 'Über',
        version: 'Version',
        powered_by: 'Unterstützt von',
        clear_cache: 'Cache leeren',
        cache_size: 'Cache-Größe',
        attributions: 'Zuschreibungen',
      },
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
      appearance: {
        title: 'Aspetto',
        theme: 'Tema',
        theme_light: 'Chiaro',
        theme_dark: 'Scuro',
        theme_system: 'Sistema',
      },
      display: {
        title: 'Visualizzazione',
        app_language: "Lingua dell'App",
        content_language: 'Lingua dei Contenuti',
        grid_view_mode: 'Modalità Vista Griglia',
        grid_compact: 'Compatto',
        grid_comfortable: 'Confortevole',
        grid_cozy: 'Accogliente',
        adult_content: 'Mostra Contenuti per Adulti',
        autoplay_trailers: 'Riproduzione Automatica Trailer',
      },
      about: {
        title: 'Informazioni',
        version: 'Versione',
        powered_by: 'Alimentato da',
        clear_cache: 'Svuota Cache',
        cache_size: 'Dimensioni Cache',
        attributions: 'Attribuzioni',
      },
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
      appearance: {
        title: 'Aparência',
        theme: 'Tema',
        theme_light: 'Claro',
        theme_dark: 'Escuro',
        theme_system: 'Sistema',
      },
      display: {
        title: 'Exibição',
        app_language: 'Idioma do App',
        content_language: 'Idioma do Conteúdo',
        grid_view_mode: 'Modo de Visualização em Grade',
        grid_compact: 'Compacto',
        grid_comfortable: 'Confortável',
        grid_cozy: 'Aconchegante',
        adult_content: 'Mostrar Conteúdo Adulto',
        autoplay_trailers: 'Reproduzir Trailers Automaticamente',
      },
      about: {
        title: 'Sobre',
        version: 'Versão',
        powered_by: 'Desenvolvido por',
        clear_cache: 'Limpar Cache',
        cache_size: 'Tamanho do Cache',
        attributions: 'Atribuições',
      },
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
      appearance: {
        title: '外観',
        theme: 'テーマ',
        theme_light: 'ライト',
        theme_dark: 'ダーク',
        theme_system: 'システム',
      },
      display: {
        title: '表示',
        app_language: 'アプリ言語',
        content_language: 'コンテンツ言語',
        grid_view_mode: 'グリッド表示モード',
        grid_compact: 'コンパクト',
        grid_comfortable: 'コンフォート',
        grid_cozy: 'コージー',
        adult_content: '成人向けコンテンツを表示',
        autoplay_trailers: 'トレーラーの自動再生',
      },
      about: {
        title: '情報',
        version: 'バージョン',
        powered_by: '提供',
        clear_cache: 'キャッシュをクリア',
        cache_size: 'キャッシュサイズ',
        attributions: '帰属',
      },
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
      appearance: {
        title: '外观',
        theme: '主题',
        theme_light: '浅色',
        theme_dark: '深色',
        theme_system: '系统',
      },
      display: {
        title: '显示',
        app_language: '应用语言',
        content_language: '内容语言',
        grid_view_mode: '网格视图模式',
        grid_compact: '紧凑',
        grid_comfortable: '舒适',
        grid_cozy: '温馨',
        adult_content: '显示成人内容',
        autoplay_trailers: '自动播放预告片',
      },
      about: {
        title: '关于',
        version: '版本',
        powered_by: '技术支持',
        clear_cache: '清除缓存',
        cache_size: '缓存大小',
        attributions: '归属',
      },
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
      appearance: {
        title: '외관',
        theme: '테마',
        theme_light: '라이트',
        theme_dark: '다크',
        theme_system: '시스템',
      },
      display: {
        title: '디스플레이',
        app_language: '앱 언어',
        content_language: '콘텐츠 언어',
        grid_view_mode: '그리드 보기 모드',
        grid_compact: '컴팩트',
        grid_comfortable: '편안함',
        grid_cozy: '아늑함',
        adult_content: '성인 콘텐츠 표시',
        autoplay_trailers: '예고편 자동 재생',
      },
      about: {
        title: '정보',
        version: '버전',
        powered_by: '제공',
        clear_cache: '캐시 지우기',
        cache_size: '캐시 크기',
        attributions: '저작권 표시',
      },
    },
  },
}

export { translations }
export type { Translations }

