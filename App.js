import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Telas
import Ionicons from 'react-native-vector-icons/Ionicons'; // Para ícones
import CadastroScreen from './Telas/CadastroScreens.jsx';
import { ScrollView } from 'react-native-gesture-handler';
import LoginScreen from './Telas/LoginScreens.jsx';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
   
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen 
          name="Home" 
          component={CadastroScreen} 
          options={{
            tabBarIcon: () => <Ionicons name="Home" size={24} />
          }} 
        />
                <Stack.Screen name="Login" component={LoginScreen} options={{
                  tabBarIcon: () => <Ionicons name='' size={24}/>
                }}
                />
      </Tab.Navigator>
      </NavigationContainer>
      
  );
}
