import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

const Flag = (props) => {
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/flag.png')} 
            style={props.bigger ? styles.biggerFlag : styles.flag}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    flag: {
        marginTop: 3,
        width: 14,
        height: 14
    },

    biggerFlag: {
        marginTop: 3,
        width: 34,
        height: 34
    }
});

export default Flag;