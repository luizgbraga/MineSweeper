import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet
} from 'react-native';

import Flag from "./Flag";
import params from "../params";

const Header = (props) => {
    return(
        <View style={styles.container}>
            <View style={styles.flagContainer}>
                <TouchableOpacity onPress={props.onFlagPress}>
                    <Flag bigger></Flag>
                </TouchableOpacity>
                <Text style={styles.flagsLeft}>{props.flagsLeft}</Text>
            </View>
            <TouchableOpacity style={styles.button} 
                onPress={props.onNewGame}>
                    <Text style={styles.buttonLabel}>Novo Jogo</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: 20
    },

    flagContainer: {
        flexDirection: 'row'
    },

    flagButton: {
        marginTop: 10,
        minWidth: 30
    },

    flagsLeft: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: 20,
    },

    button: {
        backgroundColor: params.colors.backgroundMineField,
        paddingHorizontal: 18,
        paddingVertical: 8,
        borderRadius: 10
    },

    buttonLabel: {
        fontSize: 24,
        fontWeight: 'bold'
    }
})

export default Header;