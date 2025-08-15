
export const DataManager = {
  async loadData(type) {
    try {
      const response = await fetch(`../data/${type}.json`);
      const data = await response.json();
      return data[type].sort((a, b) => b.id - a.id); // Сортировка по ID (новые первые)
    } catch (error) {
      console.error(`Ошибка загрузки ${type}:`, error);
      return [];
    }
  }
};