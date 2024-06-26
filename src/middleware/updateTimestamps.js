// мидделвар для схемы advertisement который генерирует дату создания либо обновляет поле update

function updateTimestamps(next) {
  if (!this.meta) {
    this.meta = {}; // инициализация meta, если она не существует
  }
  this.meta.updatedAt = Date.now();
  if (!this.meta.createdAt) {
    this.meta.createdAt = Date.now();
  }
  next();
}

module.exports = updateTimestamps;
