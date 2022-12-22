import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    TouchableWithoutFeedback
} from 'react-native';

import params from '../params';

import Mine from './Mine';
import Flag from './Flag';

const Field = (props) => {
    const { mined, opened, nearMines, exploded, flagged } = props;
    const styleField = [styles.field];

    if(opened) {
        styleField.push(styles.opened);
    }

    if(flagged) {
        styleField.push(styles.flagged, styles.regular);
    }

    if(exploded) {
        styleField.push(styles.exploded);
    }

    if(!opened && !exploded) {
        styleField.push(styles.regular);
    }

    let color = null;
    if(nearMines > 0) {
        if(nearMines == 1) color = params.colors.one;
        if(nearMines == 2) color = params.colors.two;
        if(nearMines > 2 && nearMines < 6) color = params.colors.three;
        if(nearMines >= 6) color = params.colors.six;
    }

    return(
        <TouchableWithoutFeedback onPress={props.onOpen}
            onLongPress={props.onSelect}>
            <View style={styleField}>
                {
                    !mined && opened && nearMines > 0 ?
                    <Text style={[styles.label, { color: color }]}>{nearMines}</Text>
                    : false
                }

                {
                    mined && opened ? <Mine></Mine>
                    : false
                }

                {
                    flagged && !opened ? <Flag></Flag>
                    : false
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    field: {
        height: params.blockSize,
        width: params.blockSize,
        borderWidth: params.borderSize
    },

    regular: {
        backgroundColor: params.colors.backgroundRegular,
        borderLeftColor: params.colors.borderLeft,
        borderTopColor: params.colors.borderLeft,
        borderRightColor: params.colors.borderRight,
        borderBottomColor: params.colors.borderRight
    },

    opened: {
        backgroundColor: params.colors.backgroundOpened,
        borderColor: params.colors.borderOpened,
        justifyContent: 'center',
        alignItems: 'center'
    },

    exploded: {
        backgroundColor: params.colors.exploded,
        borderColor: params.colors.exploded
    },

    label: {
        fontWeight: 'bold',
        fontSize: params.fontSize
    }
})

export default Field;