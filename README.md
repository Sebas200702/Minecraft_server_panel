# 🎮 Minecraft Server Panel

Panel de administración moderno y elegante para servidor de Minecraft Bedrock con temática visual inspirada en el juego.

## ✨ Características

### 🎛️ **Control del Servidor**
- **Inicio/Parada/Reinicio** del servidor con un clic
- **Monitoreo del estado** en tiempo real con indicadores visuales
- **Actualización automática** del estado cada 30 segundos
- **Notificaciones** de éxito/error para todas las operaciones

### 📊 **Información del Sistema**
- **Uso de memoria RAM** con barra de progreso visual
- **Uso de disco** del servidor
- **Tiempo de actividad** (uptime) del sistema
- **Estado de la API** con indicador de conexión
- **Actualización automática** cada 30 segundos

### 📜 **Logs del Servidor**
- **Visualización en tiempo real** de los logs del servidor
- **Coloreado automático** según tipo de mensaje (error, warning, info)
- **Scroll automático** a los mensajes más recientes
- **Configuración del número** de líneas a mostrar (25/50/100)
- **Actualización automática** cada 10 segundos

### 🖥️ **Consola del Servidor**
- **Ejecución de comandos** directamente en el servidor
- **Historial de comandos** navegable con flechas ↑/↓
- **Comandos rápidos** predefinidos (list, day, night, clear, save)
- **Historial visual** de comandos ejecutados y respuestas
- **Prevención de comandos peligrosos** por seguridad

## 🏗️ **Arquitectura del Proyecto**

### 📁 **Estructura de Archivos**
```
Minecraft_server_panel/
├── src/
│   ├── components/           # Componentes reutilizables
│   │   ├── Card.astro       # Componente base de tarjeta
│   │   ├── ServerControl.astro   # Control del servidor
│   │   ├── SystemInfo.astro     # Información del sistema
│   │   ├── ServerLogs.astro     # Logs del servidor
│   │   └── ServerConsole.astro  # Consola de comandos
│   ├── services/            # Servicios de API
│   │   └── api.js          # Cliente de la API de Minecraft
│   ├── styles/             # Estilos globales
│   │   └── global.css      # CSS personalizado + Tailwind
│   └── pages/              # Páginas de la aplicación
│       └── index.astro     # Dashboard principal
├── public/                 # Archivos públicos
├── package.json           # Dependencias del proyecto
└── astro.config.mjs      # Configuración de Astro
```

### 🔧 **Tecnologías Utilizadas**
- **[Astro](https://astro.build/)** - Framework web moderno
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework de CSS utility-first
- **[TypeScript](https://www.typescriptlang.org/)** - Tipado estático para JavaScript
- **CSS Grid** - Layout responsivo del dashboard
- **Fetch API** - Comunicación con la API del servidor

### 🎨 **Diseño y Temática**
- **Temática Minecraft** con colores verdes y tipografía retro
- **Efectos visuales** como glow, sombras y animaciones
- **Diseño responsivo** que se adapta a dispositivos móviles
- **Grid layout** de 2x2 en desktop, columna única en móvil
- **Fuente "Press Start 2P"** para el título principal
- **Fuente "Courier New"** para elementos técnicos

## 🚀 **Instalación y Uso**

### **Prerrequisitos**
- Node.js 18+ instalado
- Acceso al servidor API en `http://mancosfc.ddns.net:3001/`

### **Instalación**
```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Preview de la compilación
npm run preview
```

### **Configuración**
El panel está configurado para conectarse automáticamente a:
- **API URL**: `http://mancosfc.ddns.net:3001/api`
- **Puerto de desarrollo**: `4321` (por defecto de Astro)

Para cambiar la URL de la API, edita el archivo `src/services/api.js`:
```javascript
const API_BASE_URL = 'tu-nueva-url-api';
```

## 📡 **API del Servidor**

El dashboard consume los siguientes endpoints de la API:

### **Control del Servidor**
- `POST /api/server/start` - Iniciar servidor
- `POST /api/server/stop` - Detener servidor
- `POST /api/server/restart` - Reiniciar servidor
- `POST /api/server/status` - Estado del servidor

### **Información del Sistema**
- `GET /api/health` - Health check de la API
- `GET /api/system` - Información del sistema (RAM, disco, uptime)

### **Logs y Comandos**
- `GET /api/logs?lines=X` - Obtener logs del servidor
- `POST /api/command` - Ejecutar comando en el servidor

### **Control de la Máquina**
- `POST /api/machine/shutdown` - Apagar la máquina
- `POST /api/machine/reboot` - Reiniciar la máquina

## 🎯 **Características Avanzadas**

### **Auto-actualización**
- **Estado global**: cada 30 segundos
- **Información del sistema**: cada 30 segundos
- **Logs del servidor**: cada 10 segundos
- **Estado del servidor**: cada 30 segundos

### **Responsividad**
- **Desktop**: Grid 2x2 con hover effects
- **Tablet**: Columna única con espaciado optimizado
- **Móvil**: Layout compacto con fuentes ajustadas

### **Seguridad**
- **Validación de comandos** para prevenir comandos peligrosos
- **Manejo de errores** robusto en todas las operaciones
- **Timeouts** para evitar bloqueos de la interfaz

## 🎨 **Personalización**

### **Colores**
Los colores principales están basados en Tailwind CSS:
- **Verde**: `#22c55e` (green-500) - Elementos activos/online
- **Rojo**: `#ef4444` (red-500) - Errores/offline
- **Amarillo**: `#eab308` (yellow-500) - Advertencias/cargando
- **Gris**: `#57534e` (stone-600) - Fondos y bordes

### **Animaciones**
- **Float**: Logo del header flota suavemente
- **Pulse**: Indicadores de estado parpadean
- **Glow**: Efectos de resplandor en elementos importantes
- **Hover**: Transformaciones 3D en las tarjetas

## 🚀 **Próximas Mejoras**

- [ ] **Configuración del servidor** (server.properties)
- [ ] **Lista de jugadores online** en tiempo real
- [ ] **Gráficos de rendimiento** histórico
- [ ] **Backup automático** del mundo
- [ ] **Gestión de plugins**
- [ ] **Chat en vivo** con los jugadores
- [ ] **Alertas por email/Discord** para eventos importantes

## 📝 **Licencia**

Este proyecto está bajo la Licencia MIT.

---

**Desarrollado con ❤️ para la comunidad de Minecraft**
