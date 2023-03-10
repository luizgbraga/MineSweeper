import React, { Component, useState } from 'react';
import {
    View,
    StyleSheet,
    Alert
} from 'react-native';

import params from './params';

import MineField from './components/MineField';
import Header from './components/Header';

import {
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
} from './functions';


export default class App extends Component {

    constructor(props) {
        super(props)
        this.state = this.createState();
    }

    minesAmount = () => {
        const columns = params.getColumnsAmount();
        const rows = params.getRowsAmount();
        return Math.ceil(rows * columns * params.difficultLevel);
    }

    createState = () => {
        const columns = params.getColumnsAmount();
        const rows = params.getRowsAmount();
        return {
            board: createMinedBoard(rows, columns, this.minesAmount()),
            won: false,
            lost: false
        }
    }

    onOpenField = (row, column) => {
        const board = cloneBoard(this.state.board);
        openField(board, row, column);
        const lost = hadExplosion(board);
        const won = wonGame(board);

        if(lost) {
            showMines(board);
            Alert.alert('Perdeu!')
        }

        if(won) {
            Alert.alert('Ganhou!')
        }

        this.setState({ board, lost, won })
    }

    onSelectField = (row, column) => {
        const board = cloneBoard(this.state.board);
        invertFlag(board, row, column);
        const won = wonGame(board);

        if(won) {
            Alert.alert('Ganhou!')
        }

        this.setState({ board, won });
    }

    render() {
        return(
            <View style={styles.container}>
                <Header flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
                    onNewGame={() => this.setState(this.createState())}></Header>
                <View style={styles.board}>
                    <MineField board={this.state.board}
                        onOpenField={this.onOpenField}
                        onSelectField={this.onSelectField}></MineField>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end'
     },

     board: {
        alignItems: 'center'
     }
})
