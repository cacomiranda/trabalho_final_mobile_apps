import React, { useState } from 'react';
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { getUsers, saveUser, updateUser } from '../utils/storage';

const UserFormScreen = ({ navigation, route }) => {
  const editingUser = route.params?.user;
  const [fullName, setFullName] = useState(editingUser?.fullName || '');
  const [username, setUsername] = useState(editingUser?.username || '');
  const [password, setPassword] = useState(editingUser?.password || '');

  const validateForm = () => {
    if (!fullName || !username || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos');
      return false;
    }
    return true;
  };

  const checkUsernameExists = async () => {
    const users = await getUsers();
    return users.some(
      user => user.username === username && user.username !== editingUser?.username
    );
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    const usernameExists = await checkUsernameExists();
    if (usernameExists) {
      Alert.alert('Erro', 'Username já existe');
      return;
    }

    const userData = {
      fullName,
      username,
      password,
    };

    let success;
    if (editingUser) {
      success = await updateUser(editingUser.username, userData);
    } else {
      success = await saveUser(userData);
    }

    if (success) {
      navigation.goBack();
    } else {
      Alert.alert('Erro', 'Falha ao salvar usuário');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.title}>
          {editingUser ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Nome Completo"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Nome de usuário"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
          editable={!editingUser}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserFormScreen; 