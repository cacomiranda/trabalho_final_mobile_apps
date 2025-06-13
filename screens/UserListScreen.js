import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import UserItem from '../components/UserItem';
import { deleteUser, getUsers } from '../utils/storage';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);

  const loadUsers = async () => {
    const userList = await getUsers();
    setUsers(userList);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', loadUsers);
    return unsubscribe;
  }, [navigation]);

  const handleEdit = (user) => {
    navigation.navigate('UserForm', { user });
  };

  const handleDelete = async (username) => {
    Alert.alert(
      'Confirmação de Exclusão',
      'Você tem certeza que deseja excluir este usuário?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            const success = await deleteUser(username);
            if (success) {
              loadUsers();
            } else {
              Alert.alert('Erro', 'Falha ao excluir usuário');
            }
          },
        },
      ]
    );
  };

  const handleAddUser = () => {
    navigation.navigate('UserForm');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
        <Text style={styles.addButtonText}>Adicionar Novo Usuário</Text>
      </TouchableOpacity>
      <FlatList
        data={users}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <UserItem
            user={item}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContent: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    margin: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserListScreen; 