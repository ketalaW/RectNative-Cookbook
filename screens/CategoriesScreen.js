import React from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';


const CategoriesScreen = props => {

    const rednerGridIteam = (iteamData) => {
        return (
            <CategoryGridTile
                title={iteamData.item.title}
                color={iteamData.item.color}
                onSelect={
                    () => {
                        props.navigation.navigate({
                            routeName: 'CategoriesMeals', params: {
                                categoryId: iteamData.item.id
                            }
                        });
                    }} />
        );
    };


    return (
        <FlatList
            keyExtractor={(item, index) => item.id}
            numColumns={2}
            data={CATEGORIES}
            renderItem={rednerGridIteam} />
    );
};

CategoriesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Meal Categories',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={() => { 
               navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },

});

export default CategoriesScreen;