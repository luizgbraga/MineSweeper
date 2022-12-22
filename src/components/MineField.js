import React from 'react';
import {
    View,
    StyleSheet
} from 'react-native';
import params from '../params';

import Field from './Field';

const MineField = (props) => {
    const rows = props.board.map((row, r) => {
        const columns = row.map((field, c) => {
            return <Field { ...field } key={c}
                onOpen={() => props.onOpenField(r, c)}
                onSelect={e => props.onSelectField(r, c)}></Field>
        })
        return <View key={r}
        style={{flexDirection: 'row'}}>{columns}</View>
    })

    return <View style={styles.container}>{rows}</View>
}

export default MineField;

const styles = StyleSheet.create({
    container: {
        backgroundColor: params.colors.backgroundMineField
    }
})