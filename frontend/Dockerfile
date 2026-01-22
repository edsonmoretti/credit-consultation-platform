# ---------- STAGE 1: Build ----------
FROM node:20-alpine AS build

# Define diretório de trabalho
WORKDIR /app

# Copia dependências
COPY package*.json ./

# Instala dependências
RUN npm ci

# Copia o restante do projeto
COPY . .

# Build de produção
RUN npm run build --configuration=production


# ---------- STAGE 2: Runtime ----------
FROM nginx:alpine

# Remove config padrão do nginx
RUN rm /etc/nginx/conf.d/default.conf
# Limpa arquivos estáticos padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia configuração customizada do nginx
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Copia os arquivos compilados do Angular
COPY --from=build /app/dist/frontend/browser/ /usr/share/nginx/html

# Expondo porta 80
EXPOSE 80

# Inicia o nginx
CMD ["nginx", "-g", "daemon off;"]
