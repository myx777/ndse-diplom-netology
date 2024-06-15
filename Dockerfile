FROM node:20.10-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование файла package.json и установка зависимостей
COPY ./package*.json ./
RUN npm install

# Копирование кода приложения
COPY ./src ./src

# Создание точки монтирования
VOLUME ["/app/loaded"]

# сщздание папки
RUN mkdir -p /app/loaded

# Запуск приложения
CMD ["npm", "run", "dev"]