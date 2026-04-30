# 🎸 Guitar Champion

> Juego de ritmo estilo Guitar Hero en tiempo real, con arquitectura P2P — el PC es el host y el celular es el control.

[![Deployment](https://img.shields.io/badge/Live-GitHub%20Pages-blue?style=flat-square&logo=github)](https://PabloGGuizar.github.io/guitar-champion/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)

---

## 🌐 Demo en vivo

**[https://PabloGGuizar.github.io/guitar-champion/](https://PabloGGuizar.github.io/guitar-champion/)**

---

## 🎮 ¿Cómo se juega?

1. **Abre el host en el PC** — visita la URL en un navegador de escritorio.
2. **Conecta tu celular** — escanea el código QR que aparece en pantalla.
3. **Selecciona la dificultad** — Básico, Intermedio o Avanzado.
4. **Pulsa "¡Iniciar!"** — la música comienza y las notas caen por el tablero.
5. **Toca los botones de colores** en el celular cuando la nota llegue a la línea de impacto.
6. **Encadena combos** para multiplicar tu puntaje. ¡Llega a 10x, 25x, 50x o 100x!

---

## 🏗️ Arquitectura

```
┌─────────────────────────────┐      WebRTC / PeerJS       ┌─────────────────────┐
│         HOST (PC)           │ ◄─────────────────────────► │  CONTROLLER (Móvil) │
│                             │                             │                     │
│  • Reproduce el audio       │   { action: 'HIT', lane }  │  • 4 botones de     │
│  • Renderiza el tablero     │ ◄─────────────────────────  │    colores          │
│  • Calcula puntuación       │                             │  • Vibración háptica│
│  • Genera el QR de acceso   │                             │  • Modo landscape   │
└─────────────────────────────┘                             └─────────────────────┘
```

### Flujo de datos

1. El host genera un `peerId` único a través de **PeerJS**.
2. El QR codifica la URL con el `peerId` como parámetro (`?id=...`).
3. El celular abre la URL, detecta el parámetro y se conecta como *guest* al host.
4. Cada toque en el controlador envía un mensaje `{ action: 'HIT', lane, timestamp }` por el DataChannel de WebRTC.
5. El host recibe el evento, lo compara con el tiempo actual del audio y actualiza la puntuación.

---

## 🎵 Motor de audio y generación de notas

El mapa de notas (`src/utils/songMap.js`) fue generado con **Librosa** analizando los picos de onset del archivo de audio. Cada nota tiene:

```json
{ "lane": 2, "targetTime": 1.42 }
```

| Campo | Tipo | Descripción |
|-------|------|-------------|
| `lane` | `0-3` | Carril del tablero (rojo, amarillo, azul, verde) |
| `targetTime` | `float` | Segundo exacto en que la nota debe golpearse |

La función `filterByDifficulty(map, difficulty)` filtra el mapa según el **gap mínimo entre notas**:

| Dificultad | Gap mínimo | Notas aprox. |
|------------|------------|--------------|
| 🟢 Básico  | ≥ 1.5 s    | ~25 % del total |
| 🟡 Intermedio | ≥ 0.7 s | ~50 % del total |
| 🔴 Avanzado | Sin filtro | 100 % |

---

## 🖥️ Stack tecnológico

| Tecnología | Versión | Uso |
|-----------|---------|-----|
| [React](https://react.dev/) | 19 | UI y gestión de estado |
| [Vite](https://vite.dev/) | 8 | Bundler y dev server |
| [TailwindCSS](https://tailwindcss.com/) | 4 | Estilos utilitarios |
| [PeerJS](https://peerjs.com/) | 1.5 | WebRTC P2P simplificado |
| [qrcode.react](https://github.com/zpao/qrcode.react) | 4 | Generación de QR |
| [lucide-react](https://lucide.dev/) | 1.14 | Íconos SVG |
| [gh-pages](https://github.com/tschaub/gh-pages) | 6 | Despliegue a GitHub Pages |

---

## 📁 Estructura del proyecto

```
guitar-champion/
├── public/
│   ├── song.mp3                  # Pista de audio ("La entropía en el cristal")
│   ├── 13156393-...jpg           # Portada del álbum (fondo de la UI)
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Host.jsx              # Pantalla del host (PC): QR, dificultad, tablero, modal
│   │   ├── Controller.jsx        # Pantalla del controlador (celular): 4 botones
│   │   └── GameBoard.jsx         # Canvas del tablero: notas, HUD, efectos visuales
│   ├── hooks/
│   │   └── usePeer.js            # Hook de conexión P2P con PeerJS
│   ├── utils/
│   │   ├── AudioEngine.js        # Wrapper de Web Audio API
│   │   └── songMap.js            # Mapa de notas + filterByDifficulty()
│   ├── App.jsx                   # Router host/controller según ?id= en la URL
│   └── index.css                 # Estilos globales + fuentes
├── package.json
└── vite.config.js
```

---

## 🚀 Desarrollo local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (accesible en red local)
npm run dev
```

El servidor se expone con `--host`, así que puedes conectar el celular usando la IP local que muestra Vite (p. ej. `http://192.168.x.x:5173`).

---

## 📦 Despliegue

```bash
# Compila y publica en la rama gh-pages
npm run deploy
```

El script `predeploy` ejecuta `npm run build` automáticamente antes de publicar.  
La app queda disponible en `https://PabloGGuizar.github.io/guitar-champion/`.

---

## ✨ Características

- **Sin servidor backend** — conexión directa P2P con WebRTC / PeerJS.
- **Latencia mínima** — el controlador envía eventos inmediatamente; el host usa su propio reloj para calcular precisión.
- **3 niveles de dificultad** — mismo mapa, diferente densidad de notas.
- **Efectos visuales** — portada como fondo difuminado, mensajes flotantes de feedback, anillos expansivos, viñeta, brillo en notas.
- **Vibración háptica** — el celular vibra brevemente al presionar un botón.
- **Mensajes de combo** — notificaciones especiales al alcanzar 10×, 25×, 50× y 100× combo.
- **Modal de instrucciones** — guía integrada en la UI para nuevos jugadores.

---

## 🎨 Diseño

La interfaz usa **glassmorphism** sobre la portada del álbum como fondo difuminado. El tablero de juego es un `<canvas>` que dibuja en cada frame:

- Fondo: portada con `blur + brightness` reducido.
- Carriles con tinte de color en la zona inferior.
- Zona de impacto con círculos y línea de neón.
- Notas con bordes redondeados, brillo y reflejo interior.
- HUD: puntuación y combo en tiempo real.

---

## 📄 Licencia

MIT — úsalo, modifícalo y compártelo libremente.
