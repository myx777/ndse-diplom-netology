const ChatService = require('../services/chatService'); // Убедитесь, что путь к файлу правильный

function setupSocketIoHandlers(io) {
    io.on('connection', (socket) => {
        console.log('User connected!', socket.id);

        // Обработка события получения истории сообщений
        socket.on('getHistory', async (receiverId) => {
            // Получаем ID текущего пользователя из данных сокета (это должно быть частью логики аутентификации)
            try {
                const currentUserId = socket.userId;

                // находим чат
                const chat = await ChatService.find([currentUserId, receiverId]);

                if(chat) {
                    //получаем сообщения
                    const messages = await ChatService.getHistory(chat._id);
                    // Отправляем историю сообщений обратно клиенту
                    socket.emit('chatHistory', messages);
                } else {
                    socket.emit('chatHistory',[]);
                }
            } catch (error) {
                console.error('Error handlig getHistory', error);
                socket.emit('error', 'Ошибка получения истории сообщений.');
            }
        });

        // Обработка события отправки сообщений
        socket.on('sendMessage', async (data) => {
            try {
                const currentUserId = socket.userId;

                const chat = await ChatService.sendMessage({
                    author: currentUserId,
                    receiver: data.receiver,
                    text: data.text,
                });

                // Уведомляем всех клиентов о новом сообщении
                io.emit('newMessage', { chatId: chat._id, message: data })
            } catch (error) {
                console.error('Error handlig sendMessage', error);
                socket.emit('error', 'Ошибка отправки сообщения');
            }
        });

        // Обработка события подписки на новые сообщения
        socket.on('subscribeToChat', async (chatId) => {
            try {
                // Подписываемся на новые сообщения в чате
                ChatService.subscribe(chatId, (data) => {
                    socket.emit('newMessage', data);
                })
            } catch (error) {
                console.error('Error handling subscribeToChat:', error);
                socket.emit('error', 'Ошибка подписки на чат');
            }
        });

        // Обработка отключения клиента
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
}

module.exports = { setupSocketIoHandlers };
