# Etapa 1: Compilar Angular con Node
FROM node:18 AS build-angular

# 1. Definir carpeta de trabajo
WORKDIR /app

# 2. Copiar archivos de configuración (package.json, package-lock.json)
#    para instalar dependencias primero y aprovechar la caché
COPY package*.json ./

# 3. Instalar dependencias del proyecto
#    - npm ci (si tienes package-lock.json) o npm install
RUN npm ci

# 4. (Opcional) Forzar instalación de esbuild en la versión que requieras
#    Si sigues con problemas de versiones, ajusta aquí la versión:
RUN npm install esbuild@0.24.2

# 5. Copiar el resto del código del proyecto
COPY . .

# 6. Ejecutar el build de Angular en modo producción
# Compilar la app Angular en modo producción
RUN npm run build -- --configuration production

# Depuración: listar los archivos que se generaron
RUN ls -la /app/dist/app-frontend

# Etapa 2: Servir con Nginx
FROM nginx:alpine

# 7. Definir la carpeta de trabajo en Nginx (no estrictamente necesario)
WORKDIR /usr/share/nginx/html

# 8. Copiar los archivos compilados desde la etapa anterior
#    Ajusta la ruta dist/app-frontend si coincide con tu angular.json
COPY --from=build-angular /app/dist/app-frontend .

# 9. Exponer el puerto 80 (por defecto en Nginx)
EXPOSE 80

# 10. Iniciar Nginx en primer plano
CMD ["nginx", "-g", "daemon off;"]

# docker build --no-cache -t mi-frontend .