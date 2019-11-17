import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, Switch, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import Colors from '../constans/Colors';


const FilterSwitch = props => {
    return (
        <View style={styles.container}>
            <Text style={{fontSize: 18}}>{props.label}</Text>
            <Switch
                trackColor={{ true: Colors.primary }}
                thumbColor={Platform.OS === 'android' ? Colors.primary : Colors.primary}
                value={props.state}
                onValueChange={props.onChange} />
        </View>
    );
};

const FlitersScreen = props => {
    const {navigation} = props;
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [isLactoseFree, setIsLactoseFree] = useState(false);
    const [isVegen, setIsVegen] = useState(false);
    const [isVegeterian, setIsVegeterian] = useState(false);

    const saveFilters = useCallback(() => {
        const appliedFilter ={
            glutenFree: isGlutenFree,
            lactose: isLactoseFree,
            vegan: isVegen,
            vegeterian: isVegeterian
        };
    }, [isGlutenFree, isLactoseFree, isVegen, isVegeterian]);

    useEffect( () => {
       navigation.setParams({save: saveFilters});
    }, [saveFilters]);

    return (
        <View style={styles.screen}>
            <Text style={styles.title}>
                Available Filters / Restrictions
            </Text>
            <FilterSwitch
                label='Gluten-free'
                state={isGlutenFree}
                onChange={newValue => setIsGlutenFree(newValue)}
            />

            <FilterSwitch
                label='Lactose-free'
                state={isLactoseFree}
                onChange={newValue => setIsLactoseFree(newValue)}
            />
            <FilterSwitch
                label='Vegan'
                state={isVegen}
                onChange={newValue => setIsVegen(newValue)}
            />
            <FilterSwitch
                label='Vegeterian'
                state={isVegeterian}
                onChange={newValue => setIsVegeterian(newValue)}
            />

        </View>
    );
};

FlitersScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Milter Meals',
        headerLeft: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Menu" iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>),
          headerRight: (<HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title="Save" iconName='ios-save' onPress={
                navData.navigation.getParam('save')
            } />
        </HeaderButtons>)
    };
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignContent: 'center'
    },
    title: {
        fontFamily: 'open-bold',
        fontSize: 22,
        margin: 20,
        textAlign: 'center',
        marginBottom: 15
    },
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginLeft: '10%',
        marginRight: '10%',
        marginVertical: 15,
    }
});

export default FlitersScreen;