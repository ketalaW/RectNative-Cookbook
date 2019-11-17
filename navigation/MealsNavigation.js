import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import FavoritesScreen from '../screens/FavoriteScreen';
import { Ionicons } from '@expo/vector-icons';
import FlitersScreen from '../screens/FiltersScreen';

import { Platform, Text } from 'react-native';
import Colors from '../constans/Colors';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';


const defaultStackNavOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'open-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
};

const MealsNavigator = createStackNavigator({
    Categories: CategoriesScreen,
    CategoriesMeals: CategoryMealsScreen,
    MealDetail: {
        screen: MealDetailScreen
    }
}, defaultNavigationOptions = defaultStackNavOptions
);

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
},
    defaultNavigationOptions = defaultStackNavOptions
);

const tabScreenContent = {
    Meals: {
        screen: MealsNavigator, navigationOptions: {
            tabBarLabel: 'Meals',
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primary,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-bold'}}>Meals</Text> : 'Meals'
        }
    },
    Favorites: {
        screen: FavNavigator, navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.secondary,
            tabBarLabel: Platform.OS === 'android' ? <Text style={{fontFamily: 'open-bold'}}>Favorites</Text> : 'Favorites'
        }
    }
}

const MealsFavTabNavigator = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenContent, {
    activeTintColor: 'white',
    shifting: true
})
    : createBottomTabNavigator(tabScreenContent, {
        tabBarOptions: {
            labelStyle: {
              fontFamily: 'open'  
            },
            activeTintColor: Colors.secondary
        }
    });

const FliterNavigator = createStackNavigator(
    {
        Filters: FlitersScreen
    },
    defaultNavigationOptions = defaultStackNavOptions
    // {
    //     // navigationOptions: {
    //     //     drawerLabel: 'Filters!'
    //     // },
    //     defaultNavigationOptions: defaultStackNavOptions
    // }
);

const MainNavigator = createDrawerNavigator({
    MealsFavs: {
        screen: MealsFavTabNavigator,
        navigationOptions: {
            drawerLabel: 'Meals'
        }
    }, 
    Filters: FliterNavigator },
    {
        contentOptions: {
            activeTintColor: Colors.secondary,
            labelStyle: {
             fontFamily: 'open'   
            }
        }
    
});


export default createAppContainer(MainNavigator);
