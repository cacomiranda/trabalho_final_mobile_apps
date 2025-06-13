import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import LoginScreen from './screens/LoginScreen';
import UserFormScreen from './screens/UserFormScreen';
import UserListScreen from './screens/UserListScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#2196F3',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="UserList"
          component={UserListScreen}
          options={{
            title: 'Gerenciamento de Usuários',
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="UserForm"
          component={UserFormScreen}
          options={({ route }) => ({
            title: route.params?.user ? 'Editar' : 'Adicionar',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
} 