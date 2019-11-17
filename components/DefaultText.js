import React from 'react';
import {Text, StyleSheet} from 'react-native';
import Colors from '../constans/Colors';



const DefaultText = props => {
return <Text style={styles.text}>{props.children}</Text>

}

const styles = StyleSheet.create({
    text:{
        fontFamily: 'open'
    }
});

export default DefaultText;