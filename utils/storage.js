import AsyncStorage from '@react-native-async-storage/async-storage';

const USERS_KEY = '@users';
const INITIAL_ADMIN = {
  fullName: 'Administrador',
  username: 'admin',
  password: 'admin'
};

export const initializeStorage = async () => {
  try {
    const users = await AsyncStorage.getItem(USERS_KEY);
    if (!users) {
      await AsyncStorage.setItem(USERS_KEY, JSON.stringify([INITIAL_ADMIN]));
    }
  } catch (error) {
    console.error('Erro ao inicializar o armazenamento:', error);
  }
};

export const getUsers = async () => {
  try {
    const users = await AsyncStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Erro ao obter usuários:', error);
    return [];
  }
};

export const saveUser = async (newUser) => {
  try {
    const users = await getUsers();
    const updatedUsers = [...users, newUser];
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return true;
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    return false;
  }
};

export const updateUser = async (username, updatedUser) => {
  try {
    const users = await getUsers();
    const updatedUsers = users.map(user => 
      user.username === username ? updatedUser : user
    );
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return true;
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return false;
  }
};

export const deleteUser = async (username) => {
  try {
    const users = await getUsers();
    const updatedUsers = users.filter(user => user.username !== username);
    await AsyncStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers));
    return true;
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    return false;
  }
};

export const validateCredentials = async (username, password) => {
  try {
    const users = await getUsers();
    return users.some(user => 
      user.username === username && user.password === password
    );
  } catch (error) {
    console.error('Erro ao validar credenciais:', error);
    return false;
  }
}; 