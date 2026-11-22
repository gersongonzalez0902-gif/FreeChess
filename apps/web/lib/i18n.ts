/**
 * Diccionario de la interfaz (español).
 * Único punto donde viven los textos visibles: ningún string suelto en
 * componentes (skill de diseño). Cuando llegue la internacionalización
 * (Fase 8) este objeto será la clave "es" de un catálogo por idioma.
 */
export const dict = {
  common: {
    appName: "FreeChess",
    tagline: "Todo el ajedrez. Una sola plataforma. Gratis para todos.",
    appDescription:
      "Plataforma integral de ajedrez y entrenamiento personalizado. Juega contra bots, analiza con Stockfish en tu navegador, entrena táctica y mejora tu juego. Gratis para todos.",
    freeForever: "Gratis para siempre",
    phase: "Fase {n}",
    comingSoon: "Próximamente",
    loading: "Cargando…",
    save: "Guardar",
    cancel: "Cancelar",
    back: "Volver",
    retry: "Reintentar",
    seeMore: "Ver más",
  },
  nav: {
    home: "Inicio",
    play: "Jugar",
    analyze: "Analizar",
    train: "Entrenar",
    openings: "Aperturas",
    learn: "Aprender",
    tools: "Herramientas",
    stats: "Estadísticas",
    profile: "Mi perfil",
    settings: "Ajustes",
    more: "Más",
    signIn: "Entrar",
    signUp: "Crear cuenta",
    mainNavigation: "Navegación principal",
    collapseSidebar: "Contraer menú lateral",
    expandSidebar: "Expandir menú lateral",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
  },
  theme: {
    toggle: "Cambiar tema",
    light: "Claro",
    dark: "Oscuro",
    system: "Sistema",
    label: "Tema de la interfaz",
    current: "Tema actual: {theme}",
  },
  dashboard: {
    greetingGuest: "Hola",
    greetingUser: "Hola, {name}",
    subtitle: "¿Qué quieres hacer hoy?",
    quickTitle: "Acceso rápido",
    quickSubtitle: "Las herramientas de FreeChess se activan por fases.",
    play: "Jugar",
    playDesc: "Partidas contra bots con personalidad o con otra persona en el mismo dispositivo.",
    train: "Entrenar",
    trainDesc: "Táctica con puzzles, woodpecker y ejercicios hechos con tus errores.",
    analyze: "Analizar",
    analyzeDesc: "Revisión de partidas con Stockfish, el motor de ajedrez más fuerte del mundo.",
    learn: "Aprender",
    learnDesc: "Cursos, lecciones y explorador de aperturas, de cero a avanzado.",
    planTitle: "Tu plan de hoy",
    planEmpty:
      "El plan diario personalizado (Supercoach) llegará en la Fase 6. Mientras tanto, una partida rápida contra un bot es un gran comienzo.",
    activityTitle: "Actividad reciente",
    activityEmpty:
      "Cuando juegues o entrenes, aquí verás tus últimas partidas, ejercicios y progreso.",
    platformTitle: "Estado de la plataforma",
    platformIntro:
      "FreeChess se construye por fases para entregar funciones que funcionan de verdad. Esto es lo que hay hoy:",
    platformNow: "Disponible hoy",
    platformNowItems: [
      "Cuenta gratuita opcional para sincronizar tu progreso",
      "Modo invitado: todo funciona sin registrarse",
      "Interfaz completa en español, modo claro y oscuro",
    ],
    platformNext: "En camino",
    platformNextItems: [
      { phase: 2, label: "Jugar contra bots y partidas en el mismo dispositivo" },
      { phase: 3, label: "Analizador con Stockfish en tu navegador" },
      { phase: 4, label: "Entrenamiento táctico con millones de puzzles" },
    ],
    guestTitle: "Estás jugando como invitado",
    guestBody:
      "Puedes usar FreeChess sin cuenta: tus preferencias se guardan en este dispositivo. Si creas una cuenta gratuita, podrás sincronizar tu progreso y continuar en cualquier otro.",
    guestCta: "¿Te creo una cuenta?",
  },
  auth: {
    signInTitle: "Entrar a FreeChess",
    signInSubtitle: "Tu cuenta para sincronizar el progreso. Gratis, como todo aquí.",
    signUpTitle: "Crear cuenta",
    signUpSubtitle: "Solo pide email y contraseña. Sin datos innecesarios, sin spam.",
    email: "Correo electrónico",
    emailPlaceholder: "tu@correo.com",
    name: "Nombre público",
    namePlaceholder: "Cómo quieres que te llamemos",
    password: "Contraseña",
    passwordPlaceholder: "Mínimo 8 caracteres",
    showPassword: "Mostrar contraseña",
    hidePassword: "Ocultar contraseña",
    signInAction: "Entrar",
    signUpAction: "Crear cuenta",
    signingIn: "Entrando…",
    signingUp: "Creando cuenta…",
    toSignUp: "¿No tienes cuenta? Crear una",
    toSignIn: "¿Ya tienes cuenta? Entrar",
    continueAsGuest: "Seguir como invitado",
    guestNote:
      "Puedes usar FreeChess sin registrarte: el registro solo sirve para sincronizar tu progreso entre dispositivos.",
    privacyNote:
      "Guardamos tu email y tus partidas. Nada más. Puedes borrar tu cuenta y todos tus datos cuando quieras.",
    successSignIn: "¡Bienvenido de nuevo!",
    successSignUp: "¡Cuenta creada!",
    errors: {
      INVALID_EMAIL_OR_PASSWORD: "Email o contraseña incorrectos.",
      USER_ALREADY_EXISTS: "Ya existe una cuenta con ese correo. Prueba entrar.",
      WEAK_PASSWORD: "La contraseña es demasiado corta (mínimo 8 caracteres).",
      INVALID_EMAIL: "Ese correo no parece válido.",
      INVALID_NAME: "Escribe un nombre (mínimo 2 caracteres).",
      USER_NOT_FOUND: "No existe una cuenta con ese correo.",
      network: "No se pudo conectar. Revisa tu conexión e inténtalo de nuevo.",
      unknown: "Algo salió mal. Inténtalo de nuevo en unos segundos.",
      dbUnavailable:
        "El servidor de cuentas aún no está listo (base de datos sin migrar). Vuelve a intentarlo más tarde.",
    },
    signOut: "Cerrar sesión",
    signOutSuccess: "Sesión cerrada.",
  },
  profile: {
    title: "Mi perfil",
    guestTitle: "Perfil de invitado",
    guestBody:
      "Estás usando FreeChess como invitado. Tu actividad y preferencias viven solo en este dispositivo (IndexedDB, el almacenamiento local del navegador).",
    guestSync: "Crea una cuenta gratuita para guardar tu progreso en la nube y continuar en cualquier dispositivo.",
    createAccount: "Crear cuenta gratuita",
    memberSince: "Miembro desde {date}",
    email: "Correo",
    accountTitle: "Cuenta",
    statsTitle: "Estadísticas",
    statsEmpty:
      "Tus ratings, precisión y gráficas aparecerán aquí cuando empiezes a jugar y entrenar (Fases 2–8).",
    gamesTitle: "Mis partidas",
    gamesEmpty: "Tu historial de partidas llegará con la Fase 2 (juego contra bots).",
    deleteTitle: "Borrar mi cuenta",
    deleteBody:
      "Borra tu cuenta y TODOS tus datos de forma permanente. Es tu derecho y se hace en una sola operación.",
    deleteNote: "Disponible desde Ajustes. (Se activa al aplicar la migración de datos.)",
  },
  settings: {
    title: "Ajustes",
    pageDescription: "Personaliza FreeChess a tu gusto. Cada cambio se aplica al instante en este dispositivo.",
    appearanceTitle: "Apariencia",
    appearanceDesc: "Elige el tema de la interfaz. El modo oscuro es el aspecto clásico de FreeChess.",
    themeLight: "Claro",
    themeLightDesc: "Fondo claro, ideal para ambientes luminosos.",
    themeDark: "Oscuro",
    themeDarkDesc: "Verde profundo, el aspecto por defecto.",
    themeSystem: "Sistema",
    themeSystemDesc: "Sigue la preferencia de tu dispositivo.",
    languageTitle: "Idioma",
    languageDesc: "FreeChess está en español. Más idiomas llegarán con la internacionalización (Fase 8).",
    languageSpanish: "Español",
    accountTitle: "Cuenta",
    accountGuest: "Estás como invitado. Crea una cuenta para sincronizar tu progreso.",
    accountEmail: "Conectado como",
    dataTitle: "Tus datos locales",
    dataDesc:
      "Como invitado, tus preferencias se guardan en el almacenamiento local del navegador (IndexedDB). Si tienes cuenta, también se sincronizan con la nube.",
    dataClear: "Borrar datos locales",
    dataClearConfirm: "¿Borrar tus datos guardados en este dispositivo? Esta acción no se puede deshacer.",
    dataCleared: "Datos locales borrados.",
    aboutTitle: "Acerca de FreeChess",
    aboutVersion: "Versión",
    aboutLicense: "FreeChess es software libre (AGPL-3.0-or-later).",
    aboutCredits: "Créditos y licencias",
    aboutCreditsDesc: "Quién construye las piezas que usamos (iconos, tipografía, futuros sets de piezas).",
    aboutSource: "Código fuente en GitHub",
  },
  sections: {
    jugar: {
      title: "Jugar",
      description:
        "La única forma de jugar en FreeChess: contra bots o con otra persona en el mismo dispositivo. Sin multijugador online por diseño.",
      phaseNote: "La experiencia de juego completa llega en la Fase 2.",
      features: [
        "Bots con niveles y personalidades (agresivo, defensivo, táctico…)",
        "Partidas de dos personas en el mismo dispositivo, con reloj opcional",
        "Historial con exportación a PGN (el formato estándar de partidas)",
        "Sonidos opcionales con volumen por categoría",
      ],
    },
    analizar: {
      title: "Analizar",
      description:
        "Analizador profesional con Stockfish real ejecutándose en tu propio navegador. Sin límites diarios, sin suscripción.",
      phaseNote: "El analizador llega en la Fase 3.",
      features: [
        "Importar partidas en formato PGN o posiciones FEN",
        "Evaluación, variantes y barra de evaluación",
        "Revisión automática: precisión, ACPL y clasificación de jugadas",
        "Editor de posiciones y tablero de análisis libre",
      ],
    },
    entrenar: {
      title: "Entrenar",
      description:
        "Entrenamiento táctico con la base abierta de Lichess (CC0): millones de puzzles reales clasificados por tema y dificultad.",
      phaseNote: "El sistema de entrenamiento llega en la Fase 4 y se amplía en la Fase 5.",
      features: [
        "Puzzle diario, entrenamiento por tema y por nivel",
        "Modos Rush y Streak, repaso de errores y favoritos",
        "Woodpecker: repite colecciones de puzzles midiendo tiempos",
        "Blunder Fix: ejercicios generados con TUS errores reales",
      ],
    },
    aperturas: {
      title: "Aperturas",
      description:
        "Construye y entrena tu repertorio de aperturas con la teoría ECO (base abierta, licencia CC0) y repetición espaciada.",
      phaseNote: "El entrenador de aperturas llega en la Fase 5 y el explorador en la Fase 7.",
      features: [
        "Repertorios separados para blancas y negras",
        "Modos aprender, completar y entrenar cada línea",
        "Repetición espaciada para que no se te olvide nada",
        "Explorador ECO navegable con transposiciones",
      ],
    },
    aprender: {
      title: "Aprender",
      description:
        "Centro de aprendizaje con cursos y lecciones originales de FreeChess, desde los fundamentos hasta finales técnicos.",
      phaseNote: "El centro de aprendizaje llega en la Fase 7.",
      features: [
        "Cursos por nivel: fundamentos, táctica, mediojuego, finales",
        "Lecciones con posiciones interactivas y ejercicios",
        "Progreso guardado lección a lección",
        "Biblioteca con tus partidas y partidas importadas",
      ],
    },
    herramientas: {
      title: "Herramientas",
      description:
        "Caja de herramientas de ajedrez: editor de posiciones, visor PGN, reloj, entrenador de coordenadas y más.",
      phaseNote: "Las herramientas llegan en la Fase 7.",
      features: [
        "Editor FEN para montar cualquier posición",
        "Visor PGN con navegación y variantes",
        "Reloj de ajedrez para partidas en persona",
        "Tablero de demostración y modo análisis a ciegas",
      ],
    },
    estadisticas: {
      title: "Estadísticas",
      description:
        "Tu evolución: ratings estimados por módulo, precisión, rendimiento por apertura y fase de la partida.",
      phaseNote: "El centro de estadísticas llega en la Fase 8.",
      features: [
        "Evolución de rating (bots, puzzles, aperturas)",
        "Precisión media y ACPL de tus partidas analizadas",
        "Rendimiento por color, apertura y fase",
        "Informe Chess DNA: tus fortalezas y debilidades",
      ],
    },
  },
  emptyState: {
    inConstruction: "En construcción",
    thisArrives: "Llegará aquí",
    backHome: "Ir al inicio",
  },
  a11y: {
    openApp: "Ir al contenido principal",
  },
} as const;

export type Dict = typeof dict;

/** Formatea una fecha en español: "12 de noviembre de 2026". */
export function formatDateEs(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
