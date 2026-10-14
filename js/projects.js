/*
 * Case-study data for the project archive.
 * Every text field has `es` and `en`; other languages fall back to English.
 * To show a picture later, set `image` (e.g. "assets/projects/botica.webp")
 * and it will replace the empty preview in the tile and the drawer.
 */
(function () {
    "use strict";

    window.KzalyProjects = {
        botica: {
            code: "KZ–P01",
            title: "Botica Vida y Salud",
            status: "En producción",
            live: true,
            url: "https://www.boticavidaysalud.com/",
            image: "",
            stack: "React · Vite · Supabase · Tailwind · PWA",
            summary: {
                es: "Sistema farmacéutico para gestionar inventario, ventas y disponibilidad incluso cuando la conexión no es estable.",
                en: "Pharmacy system for managing inventory, sales, and availability even with an unstable connection."
            },
            problem: {
                es: "La operación necesita controlar productos, fechas de vencimiento y ventas sin depender siempre de una conexión estable.",
                en: "The business needs to track products, expiry dates, and sales without always relying on a stable connection."
            },
            solution: {
                es: "Una PWA enfocada en inventario farmacéutico, rotación FEFO y continuidad de trabajo sin conexión, con información sincronizada al recuperar la conexión.",
                en: "A PWA focused on pharmacy inventory, FEFO rotation, and offline continuity, syncing data once the connection returns."
            },
            role: { es: "Diseño y desarrollo", en: "Design and development" },
            platform: { es: "Web · PWA", en: "Web · PWA" },
            points: {
                es: ["Control de lotes con rotación FEFO", "Operación sin conexión", "Ventas en tiempo real"],
                en: ["Batch control with FEFO rotation", "Offline operation", "Real-time sales"]
            }
        },
        axon: {
            code: "KZ–P02",
            title: "AXON Super App",
            status: "En desarrollo",
            url: "",
            image: "",
            stack: "React Native · TypeScript · Rust (Axum, Tokio) · MongoDB · Redis · WebSockets · Protocol Buffers",
            summary: {
                es: "Super app regional para San Martín, Perú: delivery, movilidad y comercio local en una sola plataforma pensada para redes inestables.",
                en: "Regional super app for San Martín, Peru: delivery, ride-hailing, and local commerce on one platform built for unstable networks."
            },
            problem: {
                es: "En la región cada servicio vive en una aplicación distinta y la conexión móvil no siempre es buena.",
                en: "In the region every service lives in a different app, and mobile connections are not always reliable."
            },
            solution: {
                es: "Una arquitectura modular con backend en Rust, comunicación en tiempo real por WebSockets y Protocol Buffers, y una app en React Native optimizada para consumir pocos datos.",
                en: "A modular architecture with a Rust backend, real-time messaging over WebSockets and Protocol Buffers, and a React Native app tuned for low data usage."
            },
            role: { es: "Arquitectura y desarrollo", en: "Architecture and development" },
            platform: { es: "Android · iOS", en: "Android · iOS" },
            points: {
                es: ["Delivery, movilidad y marketplace", "Tiempo real con WebSockets", "Arquitectura hexagonal en Rust"],
                en: ["Delivery, rides, and marketplace", "Real time over WebSockets", "Hexagonal architecture in Rust"]
            }
        },
        inventario: {
            code: "KZ–P03",
            title: "Inventario Evelyn SAC",
            status: "En desarrollo",
            url: "https://inventario-evelyn-sac.onrender.com",
            image: "",
            stack: "Node.js · Express · React · Vite · PostgreSQL (Supabase) · JWT",
            summary: {
                es: "Herramienta interna para controlar stock, movimientos y trazabilidad de materiales de telecomunicaciones.",
                en: "Internal tool to control stock, movements, and traceability of telecom materials."
            },
            problem: {
                es: "La operación requiere saber qué materiales existen, dónde se encuentran y cómo cambian a lo largo del trabajo diario.",
                en: "The team needs to know which materials exist, where they are, and how they change through daily work."
            },
            solution: {
                es: "Un panel que centraliza productos, proveedores, almacenes y órdenes de entrada y salida, con reportes en PDF y CSV, historial de precios y registro de auditoría.",
                en: "A dashboard that centralizes products, suppliers, warehouses, and inbound and outbound orders, with PDF and CSV reports, price history, and an audit log."
            },
            role: { es: "Producto y desarrollo full stack", en: "Product and full-stack development" },
            platform: { es: "Sistema web", en: "Web system" },
            points: {
                es: ["Más de 55 endpoints de API", "133 pruebas unitarias", "Reportes en PDF y CSV"],
                en: ["55+ API endpoints", "133 unit tests", "PDF and CSV reports"]
            }
        },
        evelyn: {
            code: "KZ–P04",
            title: "Web Evelyn SAC",
            status: "En desarrollo",
            url: "https://evelynsac-web.vercel.app/",
            image: "",
            stack: "React · TypeScript · Vite · Three.js · Tailwind",
            summary: {
                es: "Experiencia comercial para presentar servicios de fibra óptica, televisión y telefonía desde una navegación clara.",
                en: "Sales website presenting fiber internet, TV, and phone services through clear navigation."
            },
            problem: {
                es: "Los servicios y planes debían entenderse rápidamente desde el celular, sin obligar al visitante a pedir información básica por separado.",
                en: "Services and plans had to be understood quickly on a phone, without forcing visitors to ask for basic information."
            },
            solution: {
                es: "Una web comercial que organiza la oferta por categorías, prioriza los planes y conecta cada intención con un canal directo de consulta.",
                en: "A sales site that organizes the offer by category, puts plans first, and connects each intent to a direct contact channel."
            },
            role: { es: "Diseño y desarrollo web", en: "Web design and development" },
            platform: { es: "Web adaptable", en: "Responsive web" },
            points: {
                es: ["Planes de internet", "Cobertura de servicios", "Contacto comercial directo"],
                en: ["Internet plans", "Service coverage", "Direct sales contact"]
            }
        },
        selvastay: {
            code: "KZ–P05",
            title: "SelvaStay Pro",
            status: "En desarrollo",
            url: "",
            image: "",
            stack: "React · Vite · Supabase · Tailwind",
            summary: {
                es: "SaaS para que lodges y hospedajes ecoturísticos gestionen reservas, operaciones y proyectos, incluso con conectividad limitada.",
                en: "SaaS that helps eco-lodges manage bookings, operations, and projects, even with limited connectivity."
            },
            problem: {
                es: "Los hospedajes de la Amazonía trabajan con señal intermitente y suelen llevar reservas y tareas en cuadernos o chats.",
                en: "Amazon lodges work with intermittent signal and often track bookings and tasks in notebooks or chats."
            },
            solution: {
                es: "Una aplicación offline-first con React y Supabase, modelo de suscripción y un análisis de mercado PESTEL que guía las funciones.",
                en: "An offline-first app built with React and Supabase, a subscription model, and a PESTEL market analysis that guides the feature set."
            },
            role: { es: "Producto, análisis y desarrollo", en: "Product, analysis, and development" },
            platform: { es: "Web · SaaS", en: "Web · SaaS" },
            points: {
                es: ["Diseño offline-first", "Modelo de ingresos recurrentes", "Modelo lógico de base de datos"],
                en: ["Offline-first design", "Recurring revenue model", "Logical database model"]
            }
        },
        gesk: {
            code: "KZ–P06",
            title: "GESK",
            status: "En desarrollo",
            url: "",
            image: "",
            stack: "React · TypeScript · Tailwind · shadcn/ui · Zustand · Express · Prisma · PostgreSQL (Neon)",
            summary: {
                es: "Sistema personal de gestión y análisis de gastos con una interfaz minimalista y rápida.",
                en: "Personal expense tracking and analysis system with a fast, minimal interface."
            },
            problem: {
                es: "Registrar gastos en hojas de cálculo es lento y no muestra con claridad a dónde se va el dinero.",
                en: "Logging expenses in spreadsheets is slow and doesn't clearly show where the money goes."
            },
            solution: {
                es: "Frontend en React y TypeScript con una API en Express, Prisma y PostgreSQL, gráficos por categoría y validación estricta de formularios.",
                en: "A React and TypeScript front end with an Express API, Prisma, and PostgreSQL, category charts, and strict form validation."
            },
            role: { es: "Diseño y desarrollo full stack", en: "Full-stack design and development" },
            platform: { es: "Aplicación web", en: "Web app" },
            points: {
                es: ["Gráficos por categoría y periodo", "Validación con Zod", "Arquitectura documentada por fases"],
                en: ["Charts by category and period", "Zod validation", "Architecture documented in phases"]
            }
        },
        zentra: {
            code: "KZ–P07",
            title: "Zentra",
            status: "Prototipo",
            url: "",
            image: "",
            stack: "Expo · React Native · React · Express · PostgreSQL · Socket.io",
            summary: {
                es: "Plataforma de gestión de rutas con app para conductores, panel web de administración y seguimiento en tiempo real.",
                en: "Route management platform with a driver app, a web admin panel, and real-time tracking."
            },
            problem: {
                es: "Coordinar rutas, paradas y conductores por llamadas o mensajes genera retrasos y poca visibilidad.",
                en: "Coordinating routes, stops, and drivers by phone or chat leads to delays and little visibility."
            },
            solution: {
                es: "Una app en Expo, un panel en React y un backend en Express con PostgreSQL y Socket.io que actualiza el estado de cada ruta al instante.",
                en: "An Expo app, a React admin panel, and an Express backend with PostgreSQL and Socket.io that updates each route's status instantly."
            },
            role: { es: "Desarrollo full stack", en: "Full-stack development" },
            platform: { es: "Android · iOS · Web", en: "Android · iOS · Web" },
            points: {
                es: ["App móvil para conductores", "Panel de administración web", "Estados en tiempo real"],
                en: ["Driver mobile app", "Web admin panel", "Real-time status"]
            }
        },
        repuestos: {
            code: "KZ–P08",
            title: "Rectificadora de Repuestos",
            status: "En desarrollo",
            url: "",
            image: "",
            stack: "PHP 8 · MVC · MySQL / MariaDB",
            summary: {
                es: "Sistema de inventario y ventas para una rectificadora de repuestos automotrices.",
                en: "Inventory and sales system for an automotive parts machine shop."
            },
            problem: {
                es: "El taller necesitaba controlar repuestos, precios y ventas sin depender de registros manuales.",
                en: "The shop needed to track parts, prices, and sales without relying on manual records."
            },
            solution: {
                es: "Una aplicación MVC en PHP 8 con MySQL, esquema relacional con índices y claves foráneas, y módulos de inventario, ventas y reportes.",
                en: "A PHP 8 MVC application with MySQL, a relational schema with indexes and foreign keys, and inventory, sales, and reporting modules."
            },
            role: { es: "Análisis y desarrollo", en: "Analysis and development" },
            platform: { es: "Sistema web", en: "Web system" },
            points: {
                es: ["Arquitectura MVC nativa", "Base de datos relacional optimizada", "Módulos de inventario y ventas"],
                en: ["Native MVC architecture", "Optimized relational database", "Inventory and sales modules"]
            }
        },
        polleria: {
            code: "KZ–P09",
            title: "Sistema de Pollería",
            status: "Prototipo",
            url: "",
            image: "",
            stack: "React · Vite",
            summary: {
                es: "Punto de venta para una pollería y grill: pedidos por mesa, delivery, inventario y personal en una sola interfaz.",
                en: "Point of sale for a rotisserie and grill: table orders, delivery, inventory, and staff in one interface."
            },
            problem: {
                es: "En horas punta, tomar pedidos y cobrar a mano provoca errores, demoras en cocina y descuadres de caja.",
                en: "At peak hours, taking orders and payments by hand causes mistakes, kitchen delays, and cash discrepancies."
            },
            solution: {
                es: "Un sistema web con ventas por mesa, módulo de delivery, inventario, órdenes de compra, gestión de trabajadores y ajustes de caja y cocina.",
                en: "A web system with table sales, a delivery module, inventory, purchase orders, staff management, and cash and kitchen settings."
            },
            role: { es: "Diseño y desarrollo", en: "Design and development" },
            platform: { es: "Aplicación web", en: "Web app" },
            points: {
                es: ["Ventas por mesa y delivery", "Inventario y órdenes de compra", "Gestión de trabajadores"],
                en: ["Table and delivery sales", "Inventory and purchase orders", "Staff management"]
            }
        },
        cognito: {
            code: "KZ–P10",
            title: "Cognito",
            status: "Demostración privada",
            url: "",
            image: "",
            stack: "Flutter · Dart · React Native (Expo)",
            summary: {
                es: "Trivia gamificada con progresión, logros y modo sin conexión, pensada para sesiones rápidas de aprendizaje.",
                en: "Gamified trivia with progression, achievements, and offline mode, designed for quick learning sessions."
            },
            problem: {
                es: "La experiencia debía mantener el interés y permitir avanzar incluso cuando el usuario no dispone de conexión.",
                en: "The experience had to stay engaging and let players progress even without a connection."
            },
            solution: {
                es: "Una aplicación de preguntas por categorías (arte, historia, geografía, gastronomía y más), con dificultad progresiva, recompensas y persistencia local.",
                en: "A quiz app organized by category (art, history, geography, food, and more), with progressive difficulty, rewards, and local persistence."
            },
            role: { es: "Diseño y desarrollo móvil", en: "Mobile design and development" },
            platform: { es: "Android · iOS", en: "Android · iOS" },
            points: {
                es: ["Juego sin conexión", "Sistema de logros", "Progresión y recompensas"],
                en: ["Offline play", "Achievement system", "Progression and rewards"]
            }
        },
        kzlyrics: {
            code: "KZ–P11",
            title: "KZLyrics",
            status: "Prototipo",
            url: "",
            image: "",
            stack: "React · Vite · Framer Motion · Express · LRCLIB",
            summary: {
                es: "Experiencia web para seguir letras de canciones sincronizadas con la música, con varios estilos de reproductor.",
                en: "Web experience for following song lyrics in sync with the music, with several player styles."
            },
            problem: {
                es: "Las letras suelen mostrarse como texto plano, sin ritmo ni relación con lo que está sonando.",
                en: "Lyrics are usually shown as plain text, with no timing or connection to what is playing."
            },
            solution: {
                es: "Un reproductor que obtiene letras sincronizadas desde LRCLIB mediante un backend propio y las anima línea por línea en estilos clásico, vinilo y terminal.",
                en: "A player that fetches synced lyrics from LRCLIB through its own backend and animates them line by line in classic, vinyl, and terminal styles."
            },
            role: { es: "Diseño y desarrollo", en: "Design and development" },
            platform: { es: "Aplicación web", en: "Web app" },
            points: {
                es: ["Letras sincronizadas", "Tres estilos de reproductor", "Animaciones con Framer Motion"],
                en: ["Synced lyrics", "Three player styles", "Framer Motion animations"]
            }
        },
        dolcezza: {
            code: "KZ–P12",
            title: "Heladería Dolcezza",
            status: "Prototipo",
            url: "",
            image: "",
            stack: "HTML · CSS · JavaScript",
            summary: {
                es: "Menú interactivo para una heladería, con categorías, sabores y pedido directo por WhatsApp.",
                en: "Interactive menu for an ice cream shop, with categories, flavors, and direct ordering over WhatsApp."
            },
            problem: {
                es: "Los clientes preguntaban por sabores y precios uno por uno a través de mensajes.",
                en: "Customers were asking about flavors and prices one message at a time."
            },
            solution: {
                es: "Una web ligera con carta por categorías, carrito de compra y un botón que envía el pedido armado por WhatsApp.",
                en: "A lightweight site with a menu by category, a shopping cart, and a button that sends the finished order over WhatsApp."
            },
            role: { es: "Diseño y desarrollo web", en: "Web design and development" },
            platform: { es: "Web adaptable", en: "Responsive web" },
            points: {
                es: ["Carta por categorías", "Carrito de compra", "Pedido por WhatsApp"],
                en: ["Menu by category", "Shopping cart", "WhatsApp ordering"]
            }
        },
        jemd: {
            code: "KZ–P13",
            title: "Sistema JEMD",
            status: "Prototipo",
            url: "",
            image: "",
            stack: "PHP · MySQL · JavaScript · MVC",
            summary: {
                es: "Sistema web de gestión comercial con control de productos, ventas y usuarios.",
                en: "Business management web system for products, sales, and users."
            },
            problem: {
                es: "La empresa necesitaba centralizar productos, ventas y accesos del personal en un solo lugar.",
                en: "The company needed to centralize products, sales, and staff access in one place."
            },
            solution: {
                es: "Una aplicación MVC con inicio de sesión, panel de control y módulos de productos, ventas y usuarios con carga de imágenes.",
                en: "An MVC application with sign-in, a dashboard, and modules for products, sales, and users with image uploads."
            },
            role: { es: "Desarrollo full stack", en: "Full-stack development" },
            platform: { es: "Sistema web", en: "Web system" },
            points: {
                es: ["Autenticación de usuarios", "Panel de control", "Productos y ventas"],
                en: ["User authentication", "Dashboard", "Products and sales"]
            }
        },
        kazzy: {
            code: "KZ–P14",
            title: "Kazzy",
            status: "Experimental",
            url: "",
            image: "",
            stack: "Python · FastAPI · WebSockets · Ollama · faster-whisper · Piper · ChromaDB · React",
            summary: {
                es: "Asistente de voz que funciona en la propia computadora con modelos de IA locales, memoria y habilidades.",
                en: "Voice assistant that runs on your own computer with local AI models, memory, and skills."
            },
            problem: {
                es: "Los asistentes comerciales envían la voz y los datos a la nube y no se pueden adaptar a tareas propias.",
                en: "Commercial assistants send voice and data to the cloud and can't be adapted to your own tasks."
            },
            solution: {
                es: "Un núcleo en Python con FastAPI que reconoce voz con Whisper, responde con un modelo local en Ollama, habla con Piper y recuerda contexto con ChromaDB, conectado a una interfaz en React por WebSocket.",
                en: "A Python core on FastAPI that recognizes speech with Whisper, answers with a local Ollama model, speaks with Piper, and keeps context in ChromaDB, connected to a React interface over WebSocket."
            },
            role: { es: "Investigación y desarrollo", en: "Research and development" },
            platform: { es: "Escritorio · Windows", en: "Desktop · Windows" },
            points: {
                es: ["IA 100 % local", "Reconocimiento y síntesis de voz", "Memoria a largo plazo"],
                en: ["Fully local AI", "Speech recognition and synthesis", "Long-term memory"]
            }
        }
    };
})();
