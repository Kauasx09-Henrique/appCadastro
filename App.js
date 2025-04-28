import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Telas
import Ionicons from 'react-native-vector-icons/Ionicons'; // Para ícones
import CadastroScreen from './Telas/CadastroScreens.jsx';
import { ScrollView } from 'react-native-gesture-handler';
import LoginScreen from './Telas/LoginScreens.jsx';
import Perfil from './Telas/PerfilScreens.jsx';
import FlashMessage from "react-native-flash-message";
import Teste from "./Telas/teste.jsx"


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
                <Tab.Screen name="Login" component={LoginScreen} options={{
                  tabBarIcon: () => <Ionicons name='account' size={24}/>
                }}
                />
                <Tab.Screen name="Perfil" component={Perfil} options={{
                  tabBarIcon: () => <Ionicons name='options' size={24}/>
                }}
        />
          <Tab.Screen name="teste" component={Teste} options={{
                  tabBarIcon: () => <Ionicons name='options' size={24}/>
                }}
        />
  
  

      </Tab.Navigator>
      </NavigationContainer>
      
  );
}
