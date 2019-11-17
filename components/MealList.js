import React from 'react';
import {FlatList, View, StyleSheet } from 'react-native';
import MealItem from "./MealItem";




const MealList = props => {

    const onselectedMealHandler = (itemData) => { 
        props.navigation.navigate({routeName: 'MealDetail', params: {mealId: itemData.item.id} 
    })};

    const renderMealItem = itemData => {
        return (
            <MealItem 
            complexity = {itemData.item.complexity}
            affordability = {itemData.item.affordability}
            image = {itemData.item.imageUrl}
            duration={itemData.item.duration} 
            onselectedMeal={onselectedMealHandler.bind(this, itemData)} title={itemData.item.title} />
        );
    };

    return ( 
         <View style={styles.list}>
        <FlatList data={props.listData} keyExtractor = {(item, index) => item.id}  
        renderItem = {renderMealItem} style={{width: '100%'}}/>
      </View>);
};


const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center'
    },
});

export default MealList;