import React from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';

const Mine = (props) => {
    return(
        <View style={styles.container}>
            <Image source={require('../../assets/mine.png')} style={styles.bomb}></Image>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    bomb: {
        width: 16,
        height: 16
    }
});

export default Mine;