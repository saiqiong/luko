import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { Pressable, Text, View } from 'react-native';

import { Title } from '../components/Title';
import AddItemScreen from '../screens/AddItemScreen';
import InventoryScreen from '../screens/InventoryScreen';
import { colors } from '../theme/colors';
import { fonts } from '../theme/fonts';
import {
  RootStackParamList,
  RootTabParamList,
  RootTabScreenProps,
} from './types';

export default function Navigation() {
  return (
    <NavigationContainer theme={DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const NotFound = () => <Text>Not found</Text>;
const FallbackScreen = ({ route }: RootTabScreenProps<'Inventory'>) => {
  return (
    <View
      style={{
        backgroundColor: colors.background,
        flex: 1,
        paddingHorizontal: 20,
      }}>
      <Title>{route?.name}</Title>
    </View>
  );
};

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFound}
        options={{ title: 'Oops!' }}
      />
      <Stack.Group
        screenOptions={{ presentation: 'modal', headerShown: false }}>
        <Stack.Screen name="AddItem" component={AddItemScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();
const tabBarLabelStyle = { fontFamily: fonts.regular, fontSize: 10 };
function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      initialRouteName="Inventory"
      screenOptions={{
        tabBarActiveTintColor: colors.mainBlue,
        headerShown: false,
      }}>
      <BottomTab.Screen
        name="Home"
        component={FallbackScreen}
        options={(_navOption: RootTabScreenProps<'Home'>) => ({
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Insurance"
        component={FallbackScreen}
        options={(_navOption: RootTabScreenProps<'Insurance'>) => ({
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="umbrella" color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Inventory"
        component={InventoryScreen}
        options={({ navigation }: RootTabScreenProps<'Inventory'>) => ({
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="albums" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate('AddItem')}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                backgroundColor: 'red',
                flex: 1,
              })}>
              <Ionicons
                name="add-circle"
                size={25}
                style={{ marginRight: 15 }}
              />
              <Text>hello</Text>
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="Realty"
        component={FallbackScreen}
        options={(_navOption: RootTabScreenProps<'Realty'>) => ({
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        })}
      />
      <BottomTab.Screen
        name="Menu"
        component={FallbackScreen}
        options={(_navOption: RootTabScreenProps<'Menu'>) => ({
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => <TabBarIcon name="menu" color={color} />,
        })}
      />
    </BottomTab.Navigator>
  );
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}
