🔧 **Prompt Mejorado - Sistema de Autenticación con Next.js, Express.js y SCSS**

En una aplicación **Next.js** (usando el nuevo sistema de rutas: **App Router**) con frontend separado del backend (**Express.js**), crea un sistema de autenticación completo que incluya lo siguiente:

---

### 🔐 Autenticación

- Formulario de **registro (sign up)** y **login**
- Al iniciar sesión:
  - Guarda el `accessToken` en **SessionStorage**
  - Guarda el `refreshToken` en **LocalStorage**

---

### ⚙️ Axios Global (`axios/axiosInstance.ts`)

- Crea una instancia global de Axios que:
  - Agregue automáticamente el `accessToken` en el header `Authorization`
  - Intercepte respuestas `401` para intentar **refrescar el token**
  - Si falla el `refreshToken`, redirige al usuario a `/login`

---

### 🧠 Estado Global

- Usa un `AuthProvider` con `useContext` o `useAuth()` para:
  - Manejar `accessToken`, `refreshToken`, datos del usuario (nombre, rol, etc.)
  - Exponer `isAuthenticated`, `loading`, etc.
  - Centralizar la lógica de autenticación

---

### 🧩 Hooks Personalizados (`hooks/useAuth.ts`)

- Expone funciones: `login()`, `logout()`, `refresh()`, `isAuthenticated`
- Reutilizable desde cualquier componente o layout

---

### 🔐 Protección de Rutas

- Implementa componentes o middleware para proteger rutas sensibles
- Redirige al usuario a `/login` si no está autenticado o no tiene permisos

---

### 🧪 Roles de Usuario

- Implementa múltiples roles (`admin`, `user`, etc.)
- Muestra contenido condicional basado en el rol actual

---

### 📁 Organización del Código

- Sigue una estructura modular en el frontend:
  - `features/auth/` → lógica de autenticación
  - `hooks/useAuth.ts` → hook centralizado
  - `axios/axiosInstance.ts` → configuración global de Axios
  - `middleware/auth.ts` → protección de rutas
  - `styles/` → uso de **SCSS** para modularidad y reutilización

---

### ❌ Manejo de Errores

- Maneja correctamente:
  - Tokens expirados
  - Usuario no encontrado
  - Problemas de red o backend
- Muestra mensajes amigables y claros al usuario

---

### 🔙 Logout en el Backend

- Invalida el `refreshToken` en el servidor para cerrar sesión completamente

---

### ✅ Requisitos Técnicos

- Usa el **App Router** de Next.js
- Backend implementado con **Express.js**
- Usa **SCSS** como sistema de estilos
- Arquitectura limpia, componentes desacoplados, enfoque escalable
