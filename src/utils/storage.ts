export const saveToLocalStorage = (key: string, data: any) => {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(key, serializedData);
  } catch (error) {
    console.error('Erro ao salvar no localStorage:', error);
  }
};

export const loadFromLocalStorage = (key: string) => {
  try {
    const serializedData = localStorage.getItem(key);
    return serializedData ? JSON.parse(serializedData) : null;
  } catch (error) {
    console.error('Erro ao carregar do localStorage:', error);
    return null;
  }
};