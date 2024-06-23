FROM node:20.10-alpine

# Установка рабочей директории
WORKDIR /app

# Копирование файла package.json и установка зависимостей
COPY ./package*.json ./
RUN npm install

# Копирование кода приложения
COPY ./src ./src
COPY .env .env
COPY nodemon.json nodemon.json

# Создание точки монтирования
#VOLUME ["/app/loaded"]

# сoздание папки
#RUN mkdir -p /app/loaded

# Запуск приложения
CMD ["npm", "run", "dev"]