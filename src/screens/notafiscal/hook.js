import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@notas_key';

// Função para carregar todas as notas do AsyncStorage
export const listNotas = async () => {
  try {
    const storedNotas = await AsyncStorage.getItem(STORAGE_KEY);
    return storedNotas ? JSON.parse(storedNotas) : [];
  } catch (error) {
    console.error('Erro ao carregar notas:', error);
    return [];
  }
};

// Função para salvar as notas no AsyncStorage
export const saveNotas = async (notas) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(notas));
  } catch (error) {
    console.error('Erro ao salvar notas:', error);
  }
};

// Função para adicionar uma nota (somente se ela não existir)
export const addNota = async (nota) => {
  try {
    const existingNotas = await listNotas();
    if (existingNotas.includes(nota)) {
      throw new Error('Essa nota já foi escaneada');
    }
    const updatedNotas = [...existingNotas, nota];
    await saveNotas(updatedNotas);
    return updatedNotas;
  } catch (error) {
    console.error('Erro ao adicionar nota:', error.message);
    throw error;
  }
};

export const excludeNota = async (nota) => {
  try {
    const existingNotas = await listNotas();
    const updatedNotas = existingNotas.filter((item) => item !== nota);
    await saveNotas(updatedNotas);
    return updatedNotas;
  } catch (error) {
    console.error('Erro ao excluir nota:', error.message);
    throw error;
  }
};
export const excludeAllNotas = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY); // Remove todas as notas
  } catch (error) {
    console.error('Erro ao excluir todas as notas:', error);
  }
};