(function () {
    "use strict";

    const languages = ["es", "en", "fr", "pt", "ja", "ko", "ru"];
    const languageInfo = {
        es: { code: "ES", flag: "es.svg" },
        en: { code: "EN", flag: "gb.svg" },
        fr: { code: "FR", flag: "fr.svg" },
        pt: { code: "PT", flag: "pt.svg" },
        ja: { code: "JA", flag: "jp.svg" },
        ko: { code: "KO", flag: "kr.svg" },
        ru: { code: "RU", flag: "ru.svg" }
    };

    const rows = [
        ["Saltar al contenido", "Skip to content", "Aller au contenu", "Ir para o conteúdo", "コンテンツへ移動", "본문으로 이동", "Перейти к содержанию"],
        ["Taller digital", "Digital studio", "Atelier numérique", "Estúdio digital", "デジタルスタジオ", "디지털 스튜디오", "Цифровая студия"],
        ["Servicios", "Services", "Services", "Serviços", "サービス", "서비스", "Услуги"],
        ["Proyectos", "Projects", "Projets", "Projetos", "制作実績", "프로젝트", "Проекты"],
        ["Proceso", "Process", "Processus", "Processo", "制作工程", "진행 과정", "Процесс"],
        ["Estudio", "Studio", "Studio", "Estúdio", "スタジオ", "스튜디오", "Студия"],
        ["Iniciar proyecto", "Start a project", "Démarrer un projet", "Iniciar projeto", "プロジェクトを始める", "프로젝트 시작", "Начать проект"],
        ["Cambiar idioma", "Change language", "Changer de langue", "Alterar idioma", "言語を変更", "언어 변경", "Сменить язык"],
        ["Seleccionar idioma", "Select language", "Choisir la langue", "Selecionar idioma", "言語を選択", "언어 선택", "Выбрать язык"],
        ["Abrir menú", "Open menu", "Ouvrir le menu", "Abrir menu", "メニューを開く", "메뉴 열기", "Открыть меню"],
        ["Cerrar menú", "Close menu", "Fermer le menu", "Fechar menu", "メニューを閉じる", "메뉴 닫기", "Закрыть меню"],
        ["Taller digital · Perú", "Digital studio · Peru", "Atelier numérique · Pérou", "Estúdio digital · Peru", "デジタルスタジオ · ペルー", "디지털 스튜디오 · 페루", "Цифровая студия · Перу"],
        ["Convertimos tus ideas en", "We turn your ideas into", "Nous transformons vos idées en", "Transformamos suas ideias em", "あなたのアイデアを", "아이디어를 다음으로 바꿉니다", "Превращаем ваши идеи в"],
        ["Soy", "I'm", "Je suis", "Eu sou", "", "저는", "Я"],
        [". Diseño y construyo herramientas digitales claras para negocios que necesitan avanzar sin sumar complejidad.", ". I design and build clear digital tools for businesses that need to move forward without added complexity.", ". Je conçois des outils numériques clairs pour les entreprises qui veulent avancer sans complexité inutile.", ". Crio ferramentas digitais claras para empresas que precisam avançar sem aumentar a complexidade.", "です。不要な複雑さを増やさず、ビジネスを前に進めるデジタルツールを設計・開発します。", "입니다. 불필요한 복잡함 없이 비즈니스가 나아갈 수 있는 명확한 디지털 도구를 설계하고 개발합니다.", ". Я проектирую понятные цифровые инструменты, которые помогают бизнесу расти без лишней сложности."],
        ["Explorar proyectos", "Explore projects", "Voir les projets", "Explorar projetos", "制作実績を見る", "프로젝트 보기", "Смотреть проекты"],
        ["Hablar por WhatsApp", "Chat on WhatsApp", "Parler sur WhatsApp", "Falar pelo WhatsApp", "WhatsAppで相談", "WhatsApp으로 문의", "Написать в WhatsApp"],
        ["seleccionados", "selected", "sélectionnés", "selecionados", "厳選", "선정", "отобрано"],
        ["Modelo", "Model", "Modèle", "Modelo", "形式", "방식", "Формат"],
        ["trato directo", "direct contact", "contact direct", "contato direto", "直接対応", "직접 소통", "прямой контакт"],
        ["Estado", "Status", "Statut", "Status", "状況", "상태", "Статус"],
        ["En línea", "Online", "En ligne", "Online", "オンライン", "온라인", "Онлайн"],
        ["disponible", "available", "disponible", "disponível", "対応可能", "가능", "доступен"],
        ["MÁQUINA KZ / PORTADA-01", "KZ MACHINE / HERO-01", "MACHINE KZ / ACCUEIL-01", "MÁQUINA KZ / CAPA-01", "KZマシン / メイン-01", "KZ 머신 / 메인-01", "МАШИНА KZ / ГЛАВНАЯ-01"],
        ["ACTIVA", "ACTIVE", "ACTIVE", "ATIVA", "稼働中", "활성", "АКТИВНА"],
        ["DISEÑAR", "DESIGN", "CONCEVOIR", "PROJETAR", "設計", "설계", "ДИЗАЙН"],
        ["DESARROLLAR", "DEVELOP", "DÉVELOPPER", "DESENVOLVER", "開発", "개발", "РАЗРАБОТКА"],
        ["PUBLICAR", "LAUNCH", "PUBLIER", "PUBLICAR", "公開", "공개", "ЗАПУСК"],
        ["ARCHIVO", "PROJECT", "ARCHIVE", "ARQUIVO", "プロジェクト", "프로젝트", "АРХИВ"],
        ["ACTIVO", "ARCHIVE", "ACTIVES", "ATIVO", "アーカイブ", "아카이브", "ПРОЕКТОВ"],
        ["SISTEMA", "SYSTEM", "SYSTÈME", "SISTEMA", "システム", "시스템", "СИСТЕМА"],
        ["Sitios web y páginas de destino", "Websites & landing pages", "Sites web et pages d'atterrissage", "Sites e páginas de destino", "Webサイト・ランディングページ", "웹사이트·랜딩 페이지", "Сайты и лендинги"],
        ["Sistemas de negocio", "Business systems", "Systèmes métier", "Sistemas de negócios", "業務システム", "비즈니스 시스템", "Бизнес-системы"],
        ["Automatización", "Automation", "Automatisation", "Automação", "自動化", "자동화", "Автоматизация"],
        ["Contenido digital", "Digital content", "Contenu numérique", "Conteúdo digital", "デジタルコンテンツ", "디지털 콘텐츠", "Цифровой контент"],
        ["Asesoría en IA", "AI consulting", "Conseil en IA", "Consultoria em IA", "AIコンサルティング", "AI 컨설팅", "Консультации по ИИ"],
        ["Soluciones concretas.", "Practical solutions.", "Des solutions concrètes.", "Soluções concretas.", "具体的な解決策。", "명확한 해결책.", "Конкретные решения."],
        ["Sin paquetes inflados.", "No bloated packages.", "Sans forfaits superflus.", "Sem pacotes inflados.", "不要なパッケージはありません。", "불필요한 패키지 없이.", "Без лишних пакетов."],
        ["Cada servicio empieza con un alcance claro. Definimos qué se entrega, cuánto tarda y qué costos externos requiere antes de construir.", "Every service starts with a clear scope. Before building, we define deliverables, timing, and external costs.", "Chaque service commence par un périmètre clair. Avant de construire, nous définissons les livrables, les délais et les coûts externes.", "Cada serviço começa com um escopo claro. Antes de criar, definimos entregas, prazos e custos externos.", "すべてのサービスは明確な範囲から始まります。制作前に納品物、期間、外部費用を定めます。", "모든 서비스는 명확한 범위에서 시작합니다. 제작 전에 산출물, 기간, 외부 비용을 정합니다.", "Каждая услуга начинается с чёткого объёма. До начала мы определяем результат, сроки и внешние расходы."],
        ["Soporte técnico", "Technical support", "Support technique", "Suporte técnico", "テクニカルサポート", "기술 지원", "Техподдержка"],
        ["Optimización y formateo de laptop", "Laptop optimization and setup", "Optimisation et configuration d'ordinateur", "Otimização e formatação de notebook", "ノートPCの最適化とセットアップ", "노트북 최적화 및 설정", "Оптимизация и настройка ноутбука"],
        ["Recupera velocidad, estabilidad y un entorno listo para trabajar.", "Restore speed, stability, and a workspace ready to use.", "Retrouvez vitesse, stabilité et un environnement prêt à travailler.", "Recupere velocidade, estabilidade e um ambiente pronto para trabalhar.", "速度と安定性を取り戻し、すぐに使える環境を整えます。", "속도와 안정성을 회복하고 바로 사용할 수 있는 환경을 만듭니다.", "Верните скорость, стабильность и готовую рабочую среду."],
        ["Presencia digital", "Digital presence", "Présence numérique", "Presença digital", "デジタルプレゼンス", "디지털 프레젠스", "Цифровое присутствие"],
        ["Página web para negocios", "Business website", "Site web pour entreprise", "Site para negócios", "ビジネスサイト", "비즈니스 웹사이트", "Сайт для бизнеса"],
        ["Presenta tu oferta con claridad y convierte visitas en consultas.", "Present your offer clearly and turn visits into enquiries.", "Présentez clairement votre offre et transformez les visites en demandes.", "Apresente sua oferta com clareza e transforme visitas em contatos.", "サービスを明確に伝え、訪問を問い合わせに変えます。", "제안을 명확히 전달하고 방문을 문의로 연결합니다.", "Покажите своё предложение и превращайте визиты в запросы."],
        ["Venta digital", "Digital sales", "Vente numérique", "Venda digital", "デジタル販売", "디지털 판매", "Цифровые продажи"],
        ["Catálogo digital + QR + WhatsApp", "Digital catalog + QR + WhatsApp", "Catalogue numérique + QR + WhatsApp", "Catálogo digital + QR + WhatsApp", "デジタルカタログ + QR + WhatsApp", "디지털 카탈로그 + QR + WhatsApp", "Цифровой каталог + QR + WhatsApp"],
        ["Operación", "Operations", "Opérations", "Operação", "運用", "운영", "Операции"],
        ["Sistema para tu negocio", "A system for your business", "Un système pour votre entreprise", "Sistema para seu negócio", "ビジネス向けシステム", "비즈니스를 위한 시스템", "Система для вашего бизнеса"],
        ["Automatización sencilla con IA", "Simple AI automation", "Automatisation simple avec l'IA", "Automação simples com IA", "AIによるシンプルな自動化", "AI 기반 간단 자동화", "Простая автоматизация с ИИ"],
        ["Contenido", "Content", "Contenu", "Conteúdo", "コンテンツ", "콘텐츠", "Контент"],
        ["Publicaciones y videos para negocios", "Posts and videos for businesses", "Publications et vidéos pour entreprises", "Publicações e vídeos para negócios", "ビジネス向け投稿と動画", "비즈니스 게시물과 영상", "Публикации и видео для бизнеса"],
        ["Marca personal", "Personal brand", "Marque personnelle", "Marca pessoal", "パーソナルブランド", "퍼스널 브랜드", "Личный бренд"],
        ["Portafolio y CV web", "Portfolio and online CV", "Portfolio et CV en ligne", "Portfólio e currículo online", "ポートフォリオとWeb履歴書", "포트폴리오와 온라인 이력서", "Портфолио и онлайн-резюме"],
        ["Acompañamiento 1:1", "One-to-one guidance", "Accompagnement individuel", "Acompanhamento individual", "1対1サポート", "1:1 지원", "Индивидуальное сопровождение"],
        ["Asesoría en IA y productividad", "AI and productivity consulting", "Conseil en IA et productivité", "Consultoria em IA e produtividade", "AIと生産性のコンサルティング", "AI 및 생산성 컨설팅", "Консультации по ИИ и продуктивности"],
        ["Resultado", "Outcome", "Résultat", "Resultado", "成果", "결과", "Результат"],
        ["Consultar", "Enquire", "Consulter", "Consultar", "相談する", "문의하기", "Узнать больше"],
        ["Desde S/60", "From S/60", "À partir de S/60", "A partir de S/60", "S/60から", "S/60부터", "От S/60"],
        ["Desde S/350", "From S/350", "À partir de S/350", "A partir de S/350", "S/350から", "S/350부터", "От S/350"],
        ["Desde S/120", "From S/120", "À partir de S/120", "A partir de S/120", "S/120から", "S/120부터", "От S/120"],
        ["Desde S/700", "From S/700", "À partir de S/700", "A partir de S/700", "S/700から", "S/700부터", "От S/700"],
        ["Desde S/180", "From S/180", "À partir de S/180", "A partir de S/180", "S/180から", "S/180부터", "От S/180"],
        ["Desde S/199/mes", "From S/199/month", "À partir de S/199/mois", "A partir de S/199/mês", "月額S/199から", "월 S/199부터", "От S/199/мес."],
        ["S/40 por hora", "S/40 per hour", "S/40 par heure", "S/40 por hora", "1時間S/40", "시간당 S/40", "S/40 в час"],
        ["Archivo de proyectos", "Project archive", "Archives des projets", "Arquivo de projetos", "プロジェクト一覧", "프로젝트 아카이브", "Архив проектов"],
        ["Trabajo real,", "Real work,", "Du travail réel,", "Trabalho real,", "実際の仕事を、", "실제 작업을", "Реальная работа,"],
        ["explicado desde dentro.", "explained from the inside.", "expliqué de l'intérieur.", "explicado por dentro.", "内側から解説。", "내부 과정까지 설명합니다.", "объяснённая изнутри."],
        ["Selecciona un proyecto para revisar su objetivo, alcance y decisiones principales. Cada ficha utiliza material real del producto.", "Select a project to review its goal, scope, and key decisions. Every case uses real product material.", "Choisissez un projet pour examiner son objectif, son périmètre et ses décisions clés. Chaque fiche utilise des éléments réels du produit.", "Selecione um projeto para revisar objetivo, escopo e decisões principais. Cada caso usa material real do produto.", "プロジェクトを選び、目的、範囲、主要な判断をご覧ください。各事例に実際の製品素材を使用しています。", "프로젝트를 선택해 목표, 범위, 핵심 결정을 확인하세요. 각 사례에는 실제 제품 자료를 사용합니다.", "Выберите проект, чтобы узнать его цель, объём и ключевые решения. В каждом кейсе используются реальные материалы."],
        ["ÍNDICE DE PROYECTOS", "PROJECT INDEX", "INDEX DES PROJETS", "ÍNDICE DE PROJETOS", "プロジェクト索引", "프로젝트 목록", "ИНДЕКС ПРОЕКТОВ"],
        ["05 registros", "05 records", "05 entrées", "05 registros", "05件", "05개 기록", "05 записей"],
        ["Producción", "Production", "Production", "Produção", "本番稼働", "운영 중", "В работе"],
        ["Desarrollo", "Development", "Développement", "Desenvolvimento", "開発中", "개발", "Разработка"],
        ["Mantenimiento", "Maintenance", "Maintenance", "Manutenção", "保守中", "유지보수", "Поддержка"],
        ["Demostración privada", "Private demo", "Démo privée", "Demonstração privada", "非公開デモ", "비공개 데모", "Закрытая демоверсия"],
        ["En producción", "Live", "En production", "Em produção", "公開中", "운영 중", "В эксплуатации"],
        ["En desarrollo", "In development", "En développement", "Em desenvolvimento", "開発中", "개발 중", "В разработке"],
        ["Rol", "Role", "Rôle", "Função", "役割", "역할", "Роль"],
        ["Plataforma", "Platform", "Plateforme", "Plataforma", "プラットフォーム", "플랫폼", "Платформа"],
        ["Enfoque", "Focus", "Orientation", "Foco", "焦点", "중점", "Фокус"],
        ["Abrir caso de estudio", "Open case study", "Ouvrir l'étude de cas", "Abrir estudo de caso", "事例の詳細を開く", "사례 연구 열기", "Открыть кейс"],
        ["Visitar proyecto", "Visit project", "Voir le projet", "Visitar projeto", "プロジェクトを見る", "프로젝트 방문", "Перейти к проекту"],
        ["Método de trabajo", "How I work", "Méthode de travail", "Método de trabalho", "仕事の進め方", "작업 방식", "Метод работы"],
        ["Un proceso corto.", "A short process.", "Un processus court.", "Um processo curto.", "短く明確なプロセス。", "짧고 명확한 과정.", "Короткий процесс."],
        ["Cada etapa deja algo útil.", "Every stage delivers value.", "Chaque étape produit quelque chose d'utile.", "Cada etapa entrega algo útil.", "各工程で価値を届けます。", "각 단계마다 가치를 만듭니다.", "Каждый этап даёт полезный результат."],
        ["Entender", "Understand", "Comprendre", "Entender", "理解", "이해", "Понять"],
        ["Definir", "Define", "Définir", "Definir", "定義", "정의", "Определить"],
        ["Construir", "Build", "Construire", "Construir", "制作", "제작", "Создать"],
        ["Activar", "Launch", "Activer", "Ativar", "公開", "출시", "Запустить"],
        ["Tecnologías utilizadas", "Technology stack", "Technologies utilisées", "Tecnologias utilizadas", "使用技術", "사용 기술", "Технологии"],
        ["Tecnología elegida según el problema.", "Technology chosen for the problem.", "La technologie adaptée à chaque problème.", "Tecnologia escolhida para cada problema.", "課題に合わせて技術を選定。", "문제에 맞는 기술을 선택합니다.", "Технологии под конкретную задачу."],
        ["Interfaz", "Front end", "Interface", "Interface", "フロントエンド", "프론트엔드", "Интерфейс"],
        ["Servidor", "Back end", "Serveur", "Servidor", "バックエンド", "백엔드", "Сервер"],
        ["Datos y nube", "Data & cloud", "Données et cloud", "Dados e nuvem", "データ・クラウド", "데이터·클라우드", "Данные и облако"],
        ["Registro de avances", "Build log", "Journal de progression", "Registro de progresso", "開発ログ", "개발 기록", "Журнал работ"],
        ["El estudio sigue en movimiento.", "The studio keeps moving.", "Le studio continue d'avancer.", "O estúdio continua em movimento.", "スタジオは進化し続けます。", "스튜디오는 계속 전진합니다.", "Студия продолжает развиваться."],
        ["Ahora", "Now", "Maintenant", "Agora", "現在", "현재", "Сейчас"],
        ["La persona detrás del sistema", "The person behind the system", "La personne derrière le système", "A pessoa por trás do sistema", "システムを作る人", "시스템 뒤의 사람", "Человек за системой"],
        ["Estudiante de Ingeniería de Sistemas · Fundador de Kzaly Group", "Systems Engineering student · Founder of Kzaly Group", "Étudiant en ingénierie des systèmes · Fondateur de Kzaly Group", "Estudante de Engenharia de Sistemas · Fundador da Kzaly Group", "システム工学学生 · Kzaly Group創業者", "시스템 공학도 · Kzaly Group 창업자", "Студент системной инженерии · Основатель Kzaly Group"],
        ["Trabajo directamente contigo desde la primera conversación hasta la entrega. Busco soluciones claras, mantenibles y ajustadas a la realidad de cada negocio.", "I work directly with you from our first conversation to delivery. I build clear, maintainable solutions shaped around each business.", "Je travaille directement avec vous, du premier échange à la livraison. Je crée des solutions claires, maintenables et adaptées à chaque entreprise.", "Trabalho diretamente com você da primeira conversa à entrega. Busco soluções claras, sustentáveis e adequadas à realidade de cada negócio.", "最初の相談から納品まで直接対応します。各ビジネスの現実に合った、明確で保守しやすい解決策を追求します。", "첫 상담부터 납품까지 직접 협업합니다. 각 비즈니스에 맞는 명확하고 유지보수하기 쉬운 해결책을 만듭니다.", "Я работаю с вами напрямую от первой беседы до сдачи. Создаю понятные, поддерживаемые решения под реальные задачи бизнеса."],
        ["UBICACIÓN", "LOCATION", "LIEU", "LOCALIZAÇÃO", "拠点", "위치", "МЕСТО"],
        ["ENFOQUE", "FOCUS", "OBJECTIF", "FOCO", "専門", "중점", "ФОКУС"],
        ["PROCESO", "WORKFLOW", "PROCESSUS", "PROCESSO", "進め方", "프로세스", "ПРОЦЕСС"],
        ["ESTADO", "STATUS", "STATUT", "STATUS", "状況", "상태", "СТАТУС"],
        ["Perú · Remoto", "Peru · Remote", "Pérou · À distance", "Peru · Remoto", "ペルー · リモート", "페루 · 원격", "Перу · Удалённо"],
        ["Atención 1:1", "One-to-one", "Suivi individuel", "Atendimento individual", "1対1対応", "1:1 대응", "Один на один"],
        ["Disponible", "Available", "Disponible", "Disponível", "対応可能", "가능", "Доступен"],
        ["Nueva conexión", "New connection", "Nouveau contact", "Nova conexão", "新しいご相談", "새로운 연결", "Новый контакт"],
        ["Cuéntame qué necesita resolver tu negocio.", "Tell me what your business needs to solve.", "Parlez-moi du besoin de votre entreprise.", "Conte o que sua empresa precisa resolver.", "あなたのビジネスの課題をお聞かせください。", "비즈니스에 필요한 해결책을 알려주세요.", "Расскажите, какую задачу нужно решить вашему бизнесу."],
        ["Una conversación breve basta para entender el objetivo, plantear un alcance realista y darte un precio concreto.", "A short conversation is enough to understand the goal, define a realistic scope, and give you a clear price.", "Un bref échange suffit pour comprendre l'objectif, définir un périmètre réaliste et vous donner un prix clair.", "Uma conversa breve basta para entender o objetivo, definir um escopo realista e dar um preço claro.", "短い相談で目的を理解し、現実的な範囲と明確な料金をご提案します。", "짧은 상담으로 목표를 파악하고 현실적인 범위와 명확한 가격을 제안합니다.", "Короткой беседы достаточно, чтобы понять цель, определить реалистичный объём и назвать точную цену."],
        ["Iniciar por WhatsApp", "Start on WhatsApp", "Commencer sur WhatsApp", "Iniciar pelo WhatsApp", "WhatsAppで始める", "WhatsApp으로 시작", "Начать в WhatsApp"],
        ["Enviar correo", "Send email", "Envoyer un e-mail", "Enviar e-mail", "メールを送る", "이메일 보내기", "Отправить e-mail"],
        ["Copiar correo", "Copy email", "Copier l'e-mail", "Copiar e-mail", "メールをコピー", "이메일 복사", "Скопировать e-mail"],
        ["Correo copiado", "Email copied", "E-mail copié", "E-mail copiado", "メールをコピーしました", "이메일을 복사했습니다", "E-mail скопирован"],
        ["Kzaly Group · Diseñado y desarrollado por Paul Medina", "Kzaly Group · Designed and built by Paul Medina", "Kzaly Group · Conçu et développé par Paul Medina", "Kzaly Group · Projetado e desenvolvido por Paul Medina", "Kzaly Group · Paul Medinaが設計・開発", "Kzaly Group · Paul Medina 설계·개발", "Kzaly Group · Дизайн и разработка — Paul Medina"],
        ["FICHA DEL CASO", "CASE STUDY", "ÉTUDE DE CAS", "ESTUDO DE CASO", "事例研究", "사례 연구", "КЕЙС"],
        ["Detalle del proyecto", "Project details", "Détail du projet", "Detalhes do projeto", "プロジェクト詳細", "프로젝트 상세", "Детали проекта"],
        ["EL PROBLEMA", "THE PROBLEM", "LE PROBLÈME", "O PROBLEMA", "課題", "문제", "ЗАДАЧА"],
        ["LA SOLUCIÓN", "THE SOLUTION", "LA SOLUTION", "A SOLUÇÃO", "解決策", "해결책", "РЕШЕНИЕ"],
        ["Cerrar caso de estudio", "Close case study", "Fermer l'étude de cas", "Fechar estudo de caso", "事例を閉じる", "사례 연구 닫기", "Закрыть кейс"],
        ["Diagnóstico, configuración y programas esenciales.", "Diagnostics, setup, and essential software.", "Diagnostic, configuration et logiciels essentiels.", "Diagnóstico, configuração e programas essenciais.", "診断、設定、必須ソフト。", "진단, 설정 및 필수 프로그램.", "Диагностика, настройка и необходимые программы."],
        ["Web adaptable, contacto directo y publicación.", "Responsive website, direct contact, and launch.", "Site adaptatif, contact direct et mise en ligne.", "Site responsivo, contato direto e publicação.", "レスポンシブサイト、直接連絡、公開。", "반응형 웹사이트, 직접 연락, 공개.", "Адаптивный сайт, прямая связь и публикация."],
        ["Organiza productos en un enlace simple de consultar y compartir.", "Organize products in one easy-to-view and share link.", "Organisez vos produits dans un lien simple à consulter et à partager.", "Organize produtos em um link fácil de consultar e compartilhar.", "商品を、閲覧・共有しやすい1つのリンクにまとめます。", "제품을 보고 공유하기 쉬운 하나의 링크로 정리합니다.", "Соберите товары в одной удобной ссылке."],
        ["Catálogo web, código QR y pedidos por WhatsApp.", "Web catalog, QR code, and WhatsApp orders.", "Catalogue web, code QR et commandes par WhatsApp.", "Catálogo web, código QR e pedidos pelo WhatsApp.", "Webカタログ、QRコード、WhatsApp注文。", "웹 카탈로그, QR 코드, WhatsApp 주문.", "Веб-каталог, QR-код и заказы через WhatsApp."],
        ["Ordena ventas, inventario, clientes o reservas con un flujo propio.", "Organize sales, inventory, customers, or bookings with your own workflow.", "Organisez ventes, stocks, clients ou réservations avec votre propre flux.", "Organize vendas, estoque, clientes ou reservas com seu próprio fluxo.", "販売、在庫、顧客、予約を独自のフローで管理します。", "판매, 재고, 고객, 예약을 맞춤형 흐름으로 정리합니다.", "Упорядочьте продажи, склад, клиентов или бронирования."],
        ["Sistema a medida, reportes y capacitación.", "Custom system, reports, and training.", "Système sur mesure, rapports et formation.", "Sistema sob medida, relatórios e treinamento.", "カスタムシステム、レポート、トレーニング。", "맞춤형 시스템, 보고서, 교육.", "Индивидуальная система, отчёты и обучение."],
        ["Reduce pasos repetitivos y mejora el seguimiento de tu proceso.", "Reduce repetitive steps and improve process tracking.", "Réduisez les tâches répétitives et améliorez le suivi.", "Reduza etapas repetitivas e melhore o acompanhamento do processo.", "繰り返し作業を減らし、進捗管理を改善します。", "반복 단계를 줄이고 프로세스 추적을 개선합니다.", "Сократите рутинные шаги и улучшите контроль процесса."],
        ["Flujo automatizado, pruebas y guía de uso.", "Automated workflow, testing, and user guide.", "Flux automatisé, tests et guide d'utilisation.", "Fluxo automatizado, testes e guia de uso.", "自動化フロー、テスト、利用ガイド。", "자동화 흐름, 테스트, 사용 가이드.", "Автоматизированный процесс, тесты и инструкция."],
        ["Comunica productos, promociones y novedades con coherencia visual.", "Communicate products, offers, and updates with visual consistency.", "Communiquez produits, offres et actualités avec une identité visuelle cohérente.", "Comunique produtos, promoções e novidades com consistência visual.", "商品、キャンペーン、最新情報を統一感のあるビジュアルで伝えます。", "일관된 비주얼로 제품, 프로모션, 소식을 전달합니다.", "Рассказывайте о товарах, акциях и новостях в едином стиле."],
        ["Reúne proyectos, experiencia y contacto en un enlace profesional.", "Bring projects, experience, and contact details together in one professional link.", "Réunissez projets, expérience et contact dans un lien professionnel.", "Reúna projetos, experiência e contato em um link profissional.", "実績、経験、連絡先を1つのプロフェッショナルなリンクにまとめます。", "프로젝트, 경험, 연락처를 하나의 전문적인 링크로 모으세요.", "Соберите проекты, опыт и контакты в одной профессиональной ссылке."],
        ["Aplica herramientas de IA a tareas reales de estudio o trabajo.", "Apply AI tools to real study or work tasks.", "Appliquez des outils d'IA à de vraies tâches d'étude ou de travail.", "Aplique ferramentas de IA a tarefas reais de estudo ou trabalho.", "AIツールを実際の学習や仕事に活用します。", "AI 도구를 실제 학습과 업무에 적용합니다.", "Примените инструменты ИИ к реальным учебным и рабочим задачам."],
        ["Avanzamos por entregas visibles para validar temprano y evitar semanas de trabajo sobre una idea equivocada.", "We work through visible deliverables to validate early and avoid weeks spent on the wrong idea.", "Nous avançons par livrables visibles pour valider tôt et éviter des semaines sur une mauvaise idée.", "Avançamos com entregas visíveis para validar cedo e evitar semanas na ideia errada.", "見える成果物ごとに進め、早期に検証して方向違いを防ぎます。", "눈에 보이는 산출물로 조기에 검증하여 잘못된 방향에 시간을 쓰는 것을 막습니다.", "Мы движемся по видимым этапам, чтобы рано всё проверить и не тратить недели на неверную идею."],
        ["Objetivo, usuario, problema y restricciones reales.", "Goal, user, problem, and real constraints.", "Objectif, utilisateur, problème et contraintes réelles.", "Objetivo, usuário, problema e restrições reais.", "目的、ユーザー、課題、実際の制約。", "목표, 사용자, 문제, 실제 제약.", "Цель, пользователь, задача и реальные ограничения."],
        ["Alcance, entregables, tecnología, tiempo y costos.", "Scope, deliverables, technology, time, and cost.", "Périmètre, livrables, technologie, délais et coûts.", "Escopo, entregas, tecnologia, prazo e custos.", "範囲、成果物、技術、期間、費用。", "범위, 산출물, 기술, 기간, 비용.", "Объём, результаты, технологии, сроки и цена."],
        ["Diseño y desarrollo mediante avances comprobables.", "Design and development through verifiable progress.", "Conception et développement avec des avancées vérifiables.", "Design e desenvolvimento com avanços verificáveis.", "確認できる進捗に基づく設計と開発。", "확인 가능한 진전을 통한 설계와 개발.", "Дизайн и разработка с проверяемым прогрессом."],
        ["Publicación, capacitación y siguiente ciclo de mejora.", "Launch, training, and the next improvement cycle.", "Mise en ligne, formation et prochain cycle d'amélioration.", "Publicação, treinamento e próximo ciclo de melhoria.", "公開、トレーニング、次の改善サイクル。", "공개, 교육, 다음 개선 주기.", "Запуск, обучение и следующий цикл улучшений."],
        ["ENTRADA", "INPUT", "ENTRÉE", "ENTRADA", "入力", "입력", "ВВОД"],
        ["ALCANCE", "SCOPE", "PÉRIMÈTRE", "ESCOPO", "範囲", "범위", "ОБЪЁМ"],
        ["CONSTRUIR", "BUILD", "CONSTRUIRE", "CONSTRUIR", "制作", "제작", "СОЗДАТЬ"],
        ["TECNOLOGÍA / CAPACIDADES", "TECH / CAPABILITIES", "TECH / CAPACITÉS", "TECNOLOGIA / CAPACIDADES", "技術 / ケイパビリティ", "기술 / 역량", "ТЕХНОЛОГИИ / ВОЗМОЖНОСТИ"],
        ["LISTO", "READY", "PRÊT", "PRONTO", "準備完了", "준비", "ГОТОВО"],
        ["Convertimos tus ideas en sitios web que venden, sistemas que organizan, procesos que avanzan y experiencias que conectan.", "We turn your ideas into websites that sell, systems that organize, processes that move forward, and experiences that connect.", "Nous transformons vos idées en sites qui vendent, systèmes qui organisent, processus qui avancent et expériences qui connectent.", "Transformamos suas ideias em sites que vendem, sistemas que organizam, processos que avançam e experiências que conectam.", "アイデアを、売れるWebサイト、整理するシステム、進化するプロセス、人をつなぐ体験に変えます。", "아이디어를 판매를 만드는 웹사이트, 정리하는 시스템, 전진하는 프로세스, 연결하는 경험으로 바꿉니다.", "Мы превращаем идеи в сайты, которые продают, системы, которые наводят порядок, и опыт, который объединяет."],
        ["Publicaciones, video corto y formatos para redes.", "Posts, short video, and social formats.", "Publications, vidéo courte et formats pour les réseaux.", "Publicações, vídeo curto e formatos para redes.", "投稿、短動画、SNS向けフォーマット。", "게시물, 숏폼 영상, 소셜 형식.", "Публикации, короткое видео и форматы для соцсетей."],
        ["Diseño personal, versión móvil y publicación.", "Personal design, mobile version, and launch.", "Design personnel, version mobile et mise en ligne.", "Design pessoal, versão móvel e publicação.", "オリジナルデザイン、モバイル対応、公開。", "맞춤 디자인, 모바일 버전, 공개.", "Персональный дизайн, мобильная версия и публикация."],
        ["Sesión personalizada, práctica y recursos.", "Personalized session, hands-on practice, and resources.", "Session personnalisée, pratique et ressources.", "Sessão personalizada, prática e recursos.", "個別セッション、実践、リソース。", "맞춤형 세션, 실습, 자료.", "Персональная сессия, практика и материалы."],
        ["PWA · Comercio electrónico · Salud", "PWA · E-commerce · Healthcare", "PWA · E-commerce · Santé", "PWA · E-commerce · Saúde", "PWA · EC · ヘルスケア", "PWA · 전자상거래 · 헬스케어", "PWA · E-commerce · Здоровье"],
        ["Sistema farmacéutico para gestionar inventario, ventas y disponibilidad incluso cuando la conexión no es estable.", "Pharmacy system for managing inventory, sales, and availability even with an unstable connection.", "Système pharmaceutique pour gérer stocks, ventes et disponibilité, même avec une connexion instable.", "Sistema farmacêutico para gerenciar estoque, vendas e disponibilidade mesmo com conexão instável.", "通信が不安定でも在庫、販売、取扱状況を管理できる薬局システム。", "불안정한 연결에서도 재고, 판매, 가용성을 관리하는 약국 시스템.", "Фармацевтическая система для учёта товаров, продаж и наличия даже при нестабильной связи."],
        ["Diseño y desarrollo", "Design and development", "Conception et développement", "Design e desenvolvimento", "設計・開発", "설계 및 개발", "Дизайн и разработка"],
        ["Inventario y venta", "Inventory and sales", "Stocks et ventes", "Estoque e vendas", "在庫・販売", "재고 및 판매", "Склад и продажи"],
        ["Operación sin conexión", "Offline operation", "Fonctionnement hors ligne", "Operação offline", "オフライン運用", "오프라인 운영", "Автономная работа"],
        ["Ventas en tiempo real", "Real-time sales", "Ventes en temps réel", "Vendas em tempo real", "リアルタイム販売", "실시간 판매", "Продажи в реальном времени"],
        ["VERSIÓN 2.0", "VERSION 2.0", "VERSION 2.0", "VERSÃO 2.0", "バージョン2.0", "버전 2.0", "ВЕРСИЯ 2.0"],
        ["Nueva identidad digital de Kzaly Group", "Kzaly Group's new digital identity", "Nouvelle identité numérique de Kzaly Group", "Nova identidade digital da Kzaly Group", "Kzaly Groupの新しいデジタルアイデンティティ", "Kzaly Group의 새로운 디지털 아이덴티티", "Новая цифровая айдентика Kzaly Group"],
        ["Sistema visual metálico, archivo interactivo de proyectos y narrativa de casos.", "Metallic visual system, interactive project archive, and case-study storytelling.", "Système visuel métallique, archives interactives et narration des cas.", "Sistema visual metálico, arquivo interativo e narrativa de casos.", "メタリックなビジュアルシステム、インタラクティブな実績アーカイブ、事例ストーリー。", "메탈릭 비주얼 시스템, 인터랙티브 프로젝트 아카이브, 사례 스토리텔링.", "Металлическая визуальная система, интерактивный архив и истории кейсов."],
        ["Inventario farmacéutico, ventas y operación sin conexión.", "Pharmacy inventory, sales, and offline operation.", "Stocks pharmaceutiques, ventes et fonctionnement hors ligne.", "Estoque farmacêutico, vendas e operação offline.", "薬品在庫、販売、オフライン運用。", "약품 재고, 판매, 오프라인 운영.", "Аптечный склад, продажи и автономная работа."],
        ["Web comercial y herramienta interna para inventario.", "Commercial website and internal inventory tool.", "Site commercial et outil interne de gestion des stocks.", "Site comercial e ferramenta interna de estoque.", "商用Webサイトと社内在庫管理ツール。", "상업용 웹사이트와 내부 재고 도구.", "Коммерческий сайт и внутренний инструмент учёта."],
        ["FUNDADOR / 01", "FOUNDER / 01", "FONDATEUR / 01", "FUNDADOR / 01", "創業者 / 01", "창업자 / 01", "ОСНОВАТЕЛЬ / 01"],
        ["Ver imagen", "View image", "Voir l'image", "Ver imagem", "画像を見る", "이미지 보기", "Открыть изображение"],

        // v3 redesign
        ["Estudio de software · Perú", "Software studio · Peru", "Studio logiciel · Pérou", "Estúdio de software · Peru", "ソフトウェアスタジオ · ペルー", "소프트웨어 스튜디오 · 페루", "Студия разработки · Перу"],
        ["documentados", "documented", "documentés", "documentados", "掲載", "수록", "в портфолио"],
        ["Desliza", "Scroll", "Défiler", "Deslize", "スクロール", "스크롤", "Листайте"],
        ["Aplicaciones móviles", "Mobile apps", "Applications mobiles", "Aplicativos móveis", "モバイルアプリ", "모바일 앱", "Мобильные приложения"],
        ["Sistemas, webs y aplicaciones en los que trabajo. Abre cada ficha para ver el problema, la solución y la tecnología.", "Systems, websites, and apps I work on. Open each one to see the problem, the solution, and the technology.", "Systèmes, sites et applications sur lesquels je travaille. Ouvrez chaque fiche pour voir le problème, la solution et la technologie.", "Sistemas, sites e aplicativos em que trabalho. Abra cada ficha para ver o problema, a solução e a tecnologia.", "手がけているシステム、Webサイト、アプリです。各項目を開くと、課題・解決策・技術を確認できます。", "제가 작업 중인 시스템, 웹사이트, 앱입니다. 각 항목을 열어 문제, 해결책, 기술을 확인하세요.", "Системы, сайты и приложения, над которыми я работаю. Откройте карточку, чтобы увидеть задачу, решение и технологии."],
        ["Filtrar proyectos", "Filter projects", "Filtrer les projets", "Filtrar projetos", "プロジェクトを絞り込む", "프로젝트 필터", "Фильтр проектов"],
        ["Todos", "All", "Tous", "Todos", "すべて", "전체", "Все"],
        ["Sistemas", "Systems", "Systèmes", "Sistemas", "システム", "시스템", "Системы"],
        ["Web", "Web", "Web", "Web", "Web", "웹", "Веб"],
        ["Móvil", "Mobile", "Mobile", "Mobile", "モバイル", "모바일", "Мобильные"],
        ["IA", "AI", "IA", "IA", "AI", "AI", "ИИ"],
        ["Vista previa en preparación", "Preview coming soon", "Aperçu en préparation", "Prévia em preparação", "プレビュー準備中", "미리보기 준비 중", "Превью готовится"],
        ["Super app · Delivery · Movilidad", "Super app · Delivery · Mobility", "Super app · Livraison · Mobilité", "Super app · Delivery · Mobilidade", "スーパーアプリ · デリバリー · 移動", "슈퍼 앱 · 배달 · 모빌리티", "Суперприложение · Доставка · Мобильность"],
        ["Sistema web · Inventario", "Web system · Inventory", "Système web · Stocks", "Sistema web · Estoque", "Webシステム · 在庫", "웹 시스템 · 재고", "Веб-система · Склад"],
        ["Web corporativa · ISP", "Corporate website · ISP", "Site d'entreprise · FAI", "Site corporativo · Provedor", "企業サイト · ISP", "기업 웹사이트 · ISP", "Корпоративный сайт · Провайдер"],
        ["SaaS · Turismo · Sin conexión", "SaaS · Tourism · Offline", "SaaS · Tourisme · Hors ligne", "SaaS · Turismo · Offline", "SaaS · 観光 · オフライン", "SaaS · 관광 · 오프라인", "SaaS · Туризм · Офлайн"],
        ["Finanzas personales · Analítica", "Personal finance · Analytics", "Finances personnelles · Analyse", "Finanças pessoais · Análise", "個人財務 · 分析", "개인 재무 · 분석", "Личные финансы · Аналитика"],
        ["Logística · Gestión de rutas", "Logistics · Route management", "Logistique · Gestion des tournées", "Logística · Gestão de rotas", "物流 · ルート管理", "물류 · 경로 관리", "Логистика · Управление маршрутами"],
        ["Inventario y ventas · Taller", "Inventory and sales · Workshop", "Stocks et ventes · Atelier", "Estoque e vendas · Oficina", "在庫・販売 · 整備工場", "재고·판매 · 정비소", "Склад и продажи · Мастерская"],
        ["Punto de venta · Restaurante", "Point of sale · Restaurant", "Point de vente · Restaurant", "Ponto de venda · Restaurante", "POS · レストラン", "POS · 레스토랑", "Касса · Ресторан"],
        ["Trivia gamificada · Aprendizaje", "Gamified trivia · Learning", "Quiz ludique · Apprentissage", "Trivia gamificada · Aprendizado", "ゲーム型クイズ · 学習", "게임형 퀴즈 · 학습", "Игровая викторина · Обучение"],
        ["Aplicación web · Música", "Web app · Music", "Application web · Musique", "Aplicativo web · Música", "Webアプリ · 音楽", "웹 앱 · 음악", "Веб-приложение · Музыка"],
        ["Menú interactivo · Gastronomía", "Interactive menu · Food", "Menu interactif · Gastronomie", "Cardápio interativo · Gastronomia", "インタラクティブメニュー · 飲食", "인터랙티브 메뉴 · 외식", "Интерактивное меню · Гастрономия"],
        ["Gestión comercial · Ventas", "Business management · Sales", "Gestion commerciale · Ventes", "Gestão comercial · Vendas", "営業管理 · 販売", "영업 관리 · 판매", "Учёт торговли · Продажи"],
        ["Asistente de voz con IA local", "Voice assistant with local AI", "Assistant vocal à IA locale", "Assistente de voz com IA local", "ローカルAI音声アシスタント", "로컬 AI 음성 비서", "Голосовой ассистент с локальным ИИ"],
        ["Prototipo", "Prototype", "Prototype", "Protótipo", "プロトタイプ", "프로토타입", "Прототип"],
        ["Experimental", "Experimental", "Expérimental", "Experimental", "実験的", "실험적", "Эксперимент"],
        ["Etapas", "Stages", "Étapes", "Etapas", "工程", "단계", "Этапы"],
        ["Web · Sistemas · Móvil · IA", "Web · Systems · Mobile · AI", "Web · Systèmes · Mobile · IA", "Web · Sistemas · Mobile · IA", "Web · システム · モバイル · AI", "웹 · 시스템 · 모바일 · AI", "Веб · Системы · Мобильные · ИИ"],
        ["CORREO", "EMAIL", "E-MAIL", "E-MAIL", "メール", "이메일", "ПОЧТА"],
        ["Volver arriba", "Back to top", "Retour en haut", "Voltar ao topo", "トップへ戻る", "맨 위로", "Наверх"],
        ["Redes", "Social", "Réseaux", "Redes", "SNS", "소셜", "Соцсети"],
        ["¿Tienes un proyecto? Hablemos.", "Have a project in mind? Let's talk.", "Un projet en tête ? Parlons-en.", "Tem um projeto? Vamos conversar.", "プロジェクトのご相談はこちら。", "프로젝트가 있나요? 이야기해요.", "Есть проект? Давайте обсудим."],
        ["Cerrar", "Close", "Fermer", "Fechar", "閉じる", "닫기", "Закрыть"],
        ["Abrir WhatsApp", "Open WhatsApp", "Ouvrir WhatsApp", "Abrir WhatsApp", "WhatsAppを開く", "WhatsApp 열기", "Открыть WhatsApp"],
        ["Escríbeme", "Message me", "Écrivez-moi", "Fale comigo", "メッセージ", "메시지 보내기", "Напишите мне"],
        ["PUNTOS CLAVE", "KEY POINTS", "POINTS CLÉS", "PONTOS-CHAVE", "主なポイント", "핵심 포인트", "КЛЮЧЕВОЕ"],
        ["TECNOLOGÍA", "TECHNOLOGY", "TECHNOLOGIE", "TECNOLOGIA", "技術", "기술", "ТЕХНОЛОГИИ"],
        ["Quiero algo similar", "I want something similar", "Je veux quelque chose de similaire", "Quero algo parecido", "似たものを依頼する", "비슷한 것을 원해요", "Хочу похожее"],
        ["Logo de Kzaly Group", "Kzaly Group logo", "Logo de Kzaly Group", "Logo da Kzaly Group", "Kzaly Groupのロゴ", "Kzaly Group 로고", "Логотип Kzaly Group"],
        ["Navegación principal", "Main navigation", "Navigation principale", "Navegação principal", "メインナビゲーション", "주요 탐색", "Основная навигация"],
        ["Navegación móvil", "Mobile navigation", "Navigation mobile", "Navegação móvel", "モバイルナビゲーション", "모바일 탐색", "Мобильная навигация"],
        ["Áreas de trabajo", "Areas of work", "Domaines d'activité", "Áreas de atuação", "対応領域", "업무 분야", "Направления работы"],
        ["Kzaly Group, inicio", "Kzaly Group, home", "Kzaly Group, accueil", "Kzaly Group, início", "Kzaly Group、ホーム", "Kzaly Group, 홈", "Kzaly Group, главная"],
        // v3.1 stage, legal and cookie notice
        ["Animación: diseño, desarrollo y publicación de un sitio web", "Animation: designing, building, and launching a website", "Animation : conception, développement et mise en ligne d'un site web", "Animação: design, desenvolvimento e publicação de um site", "アニメーション：Webサイトの設計・開発・公開", "애니메이션: 웹사이트 디자인, 개발, 배포", "Анимация: дизайн, разработка и публикация сайта"],
        ["tu-negocio.com", "your-business.com", "votre-entreprise.com", "seu-negocio.com", "your-business.jp", "your-business.kr", "vash-biznes.ru"],
        ["Tipografía", "Type", "Typo", "Tipografia", "書体", "서체", "Шрифт"],
        ["Color", "Color", "Couleur", "Cor", "色", "색상", "Цвет"],
        ["✓ listo en 1.2 s", "✓ done in 1.2 s", "✓ prêt en 1,2 s", "✓ pronto em 1,2 s", "✓ 1.2秒で完了", "✓ 1.2초 만에 완료", "✓ готово за 1,2 с"],
        ["Publicando en producción", "Deploying to production", "Mise en production", "Publicando em produção", "本番環境へ公開中", "프로덕션 배포 중", "Публикация в продакшн"],
        ["Compilación", "Build", "Compilation", "Compilação", "ビルド", "빌드", "Сборка"],
        ["Optimización de imágenes", "Image optimization", "Optimisation des images", "Otimização de imagens", "画像の最適化", "이미지 최적화", "Оптимизация изображений"],
        ["Certificado SSL", "SSL certificate", "Certificat SSL", "Certificado SSL", "SSL証明書", "SSL 인증서", "SSL-сертификат"],
        ["Red global (CDN)", "Global network (CDN)", "Réseau mondial (CDN)", "Rede global (CDN)", "グローバル配信（CDN）", "글로벌 네트워크(CDN)", "Глобальная сеть (CDN)"],
        ["Al escribirme, tus datos se usan solo para responderte, según la", "If you write to me, your data is used only to reply, as described in the", "Si vous m'écrivez, vos données servent uniquement à vous répondre, selon la", "Ao me escrever, seus dados são usados apenas para responder, conforme a", "お問い合わせ内容は返信のためにのみ使用します。詳細は", "문의 시 개인정보는 답변 목적으로만 사용됩니다. 자세한 내용은", "Ваши данные используются только для ответа, согласно"],
        ["Política de privacidad", "Privacy policy", "Politique de confidentialité", "Política de privacidade", "プライバシーポリシー", "개인정보 처리방침", "Политике конфиденциальности"],
        ["Todos los derechos reservados.", "All rights reserved.", "Tous droits réservés.", "Todos os direitos reservados.", "無断転載を禁じます。", "모든 권리 보유.", "Все права защищены."],
        ["Legal", "Legal", "Mentions légales", "Legal", "法的情報", "법적 고지", "Правовая информация"],
        ["Privacidad", "Privacy", "Confidentialité", "Privacidade", "プライバシー", "개인정보", "Конфиденциальность"],
        ["Cookies", "Cookies", "Cookies", "Cookies", "Cookie", "쿠키", "Cookie"],
        ["Términos y propiedad intelectual", "Terms and intellectual property", "Conditions et propriété intellectuelle", "Termos e propriedade intelectual", "利用規約と知的財産", "이용약관 및 지식재산권", "Условия и интеллектуальная собственность"],
        ["Seguridad", "Security", "Sécurité", "Segurança", "セキュリティ", "보안", "Безопасность"],
        ["Aviso de cookies", "Cookie notice", "Avis sur les cookies", "Aviso de cookies", "Cookieに関するお知らせ", "쿠키 안내", "Уведомление о cookie"],
        ["Este sitio no usa cookies de publicidad ni de seguimiento. Solo guarda tu idioma en tu navegador.", "This site uses no advertising or tracking cookies. It only stores your language in your browser.", "Ce site n'utilise aucun cookie publicitaire ni de suivi. Il enregistre seulement votre langue dans votre navigateur.", "Este site não usa cookies de publicidade nem de rastreamento. Ele só guarda seu idioma no navegador.", "このサイトは広告・追跡用Cookieを使用しません。言語設定のみをブラウザに保存します。", "이 사이트는 광고 및 추적 쿠키를 사용하지 않습니다. 언어 설정만 브라우저에 저장합니다.", "Сайт не использует рекламные и отслеживающие cookie. Он хранит в браузере только выбранный язык."],
        ["Más información", "Learn more", "En savoir plus", "Saiba mais", "詳細", "자세히 보기", "Подробнее"],
        ["Entendido", "Got it", "Compris", "Entendi", "了解", "확인", "Понятно"],
        ["Hola Paul, vi tu portafolio y quiero conversar sobre un proyecto.", "Hi Paul, I saw your portfolio and I'd like to talk about a project.", "Bonjour Paul, j'ai vu votre portfolio et j'aimerais parler d'un projet.", "Olá Paul, vi seu portfólio e quero conversar sobre um projeto.", "こんにちは、Paulさん。ポートフォリオを拝見し、プロジェクトについてご相談したいです。", "안녕하세요 Paul님, 포트폴리오를 보고 프로젝트에 대해 이야기하고 싶습니다.", "Здравствуйте, Пол! Хочу обсудить проект после просмотра вашего портфолио."],
        ["Hola Paul, vi el proyecto {project} en tu portafolio y quiero algo similar.", "Hi Paul, I saw the {project} project in your portfolio and I'd like something similar.", "Bonjour Paul, j'ai vu le projet {project} dans votre portfolio et je voudrais quelque chose de similaire.", "Olá Paul, vi o projeto {project} no seu portfólio e quero algo parecido.", "こんにちは、Paulさん。ポートフォリオの{project}を拝見し、似たものを依頼したいです。", "안녕하세요 Paul님, 포트폴리오에서 {project} 프로젝트를 보고 비슷한 것을 원합니다.", "Здравствуйте, Пол! Хочу проект, похожий на {project} из вашего портфолио."]
    ];

    const dictionaries = Object.fromEntries(languages.map((language) => [language, Object.create(null)]));
    rows.forEach((row) => languages.forEach((language, index) => {
        dictionaries[language][row[0]] = row[index] ?? row[0];
    }));

    const typewriterWords = {
        es: ["sitios web que venden.", "sistemas que organizan.", "procesos que avanzan.", "experiencias que conectan.", "ideas que cobran vida."],
        en: ["websites that sell.", "systems that organize.", "processes that move forward.", "experiences that connect.", "ideas brought to life."],
        fr: ["sites web qui vendent.", "systèmes qui organisent.", "processus qui avancent.", "expériences qui connectent.", "idées qui prennent vie."],
        pt: ["sites que vendem.", "sistemas que organizam.", "processos que avançam.", "experiências que conectam.", "ideias que ganham vida."],
        ja: ["売上につながるWebサイトに。", "仕事を整えるシステムに。", "前進するプロセスに。", "人をつなぐ体験に。", "形になるアイデアに。"],
        ko: ["판매를 만드는 웹사이트.", "업무를 정리하는 시스템.", "앞으로 나아가는 프로세스.", "사람을 연결하는 경험.", "현실이 되는 아이디어."],
        ru: ["сайты, которые продают.", "системы, которые наводят порядок.", "процессы, которые движут вперёд.", "опыт, который объединяет.", "идеи, которые оживают."]
    };

    const textSources = new WeakMap();
    const attributeSources = new WeakMap();
    let currentLanguage = "es";

    function translate(value, language = currentLanguage) {
        return dictionaries[language]?.[value] ?? value;
    }

    function rememberContent() {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            if (!node.parentElement || node.parentElement.closest("script, style, [data-language-switcher]")) continue;
            const source = node.nodeValue.trim();
            if (source) textSources.set(node, source);
        }

        document.querySelectorAll("[aria-label], [alt], [title]").forEach((element) => {
            if (element.closest("[data-language-switcher] img")) return;
            const values = {};
            ["aria-label", "alt", "title"].forEach((attribute) => {
                if (element.hasAttribute(attribute)) values[attribute] = element.getAttribute(attribute);
            });
            attributeSources.set(element, values);
        });
    }

    function applyTranslations(language) {
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
            const source = textSources.get(node);
            if (!source) continue;
            const translated = translate(source, language);
            node.nodeValue = node.nodeValue.replace(node.nodeValue.trim(), translated);
        }

        document.querySelectorAll("[aria-label], [alt], [title]").forEach((element) => {
            const values = attributeSources.get(element);
            if (!values) return;
            Object.entries(values).forEach(([attribute, source]) => element.setAttribute(attribute, translate(source, language)));
        });

        document.documentElement.lang = language;
        document.title = {
            es: "Kzaly Group | Software y soluciones digitales por Paul Medina",
            en: "Kzaly Group | Software and digital solutions by Paul Medina",
            fr: "Kzaly Group | Logiciels et solutions numériques par Paul Medina",
            pt: "Kzaly Group | Software e soluções digitais por Paul Medina",
            ja: "Kzaly Group | Paul Medinaのソフトウェアとデジタルソリューション",
            ko: "Kzaly Group | Paul Medina의 소프트웨어와 디지털 솔루션",
            ru: "Kzaly Group | Программы и цифровые решения от Paul Medina"
        }[language];
    }

    function updateSwitcher(language) {
        const switcher = document.querySelector("[data-language-switcher]");
        if (!switcher) return;
        const info = languageInfo[language];
        switcher.querySelector("[data-current-language]").textContent = info.code;
        switcher.querySelector("[data-current-flag]").src = `assets/flags/${info.flag}`;
        switcher.querySelectorAll("[data-language]").forEach((button) => {
            button.setAttribute("aria-selected", String(button.dataset.language === language));
        });
    }

    function setLanguage(language, persist = true) {
        if (!languages.includes(language)) language = "es";
        currentLanguage = language;
        applyTranslations(language);
        updateSwitcher(language);
        document.querySelector("[data-typewriter]").textContent = typewriterWords[language][0];
        if (persist) {
            try { localStorage.setItem("kzaly-language", language); } catch { /* Storage may be unavailable. */ }
        }
        window.dispatchEvent(new CustomEvent("kzaly:languagechange", { detail: { language } }));
    }

    function initSwitcher() {
        const switcher = document.querySelector("[data-language-switcher]");
        const trigger = switcher?.querySelector(".language-trigger");
        const menu = switcher?.querySelector(".language-menu");
        const options = Array.from(switcher?.querySelectorAll("[data-language]") || []);
        if (!switcher || !trigger || !menu) return;

        const close = (restoreFocus = false) => {
            menu.hidden = true;
            switcher.classList.remove("open");
            trigger.setAttribute("aria-expanded", "false");
            if (restoreFocus) trigger.focus();
        };

        const open = () => {
            menu.hidden = false;
            switcher.classList.add("open");
            trigger.setAttribute("aria-expanded", "true");
        };

        trigger.addEventListener("click", () => menu.hidden ? open() : close());
        options.forEach((option, index) => {
            option.addEventListener("click", () => {
                setLanguage(option.dataset.language);
                close(true);
            });
            option.addEventListener("keydown", (event) => {
                if (!["ArrowDown", "ArrowUp", "Escape"].includes(event.key)) return;
                event.preventDefault();
                if (event.key === "Escape") return close(true);
                const offset = event.key === "ArrowDown" ? 1 : -1;
                options[(index + offset + options.length) % options.length].focus();
            });
        });
        document.addEventListener("pointerdown", (event) => {
            if (!switcher.contains(event.target)) close();
        });
        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && !menu.hidden) close(true);
        });
    }

    function init() {
        rememberContent();
        initSwitcher();
        let stored = "es";
        const requested = new URLSearchParams(window.location.search).get("lang");
        try { stored = requested || localStorage.getItem("kzaly-language") || "es"; } catch { stored = requested || "es"; }
        setLanguage(stored, false);
    }

    window.KzalyI18n = {
        get language() { return currentLanguage; },
        get words() { return typewriterWords[currentLanguage]; },
        t: (value) => translate(value),
        setLanguage
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
