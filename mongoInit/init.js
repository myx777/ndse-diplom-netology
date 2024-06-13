// скрипт для создания БД при поднятии контейнеров
db = db.getSiblingDB('admin'); // Подключение к базе данных admin

db.auth("root", "root"); // авторизация

db = db.getSiblingDB('delivery'); // создаю новую БД delivery
// создаем пользователя
db.createUser({
    user: "delivery",
    pwd: "123456",
    roles: [
        {role: "readWrite", db: "delivery"}
    ]
});

// db.createCollection('Users'); // Создание тестовой коллекции, чтобы убедиться, что база данных создана
