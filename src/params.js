import { Dimensions } from 'react-native';

const params = {
    blockSize: 30,
    borderSize: 5,
    fontSize: 15,
    headerRatio: 0.20,
    difficultLevel: 0.1,

    getColumnsAmount() {
        const totalWidth = Dimensions.get('window').width;
        return Math.floor(totalWidth / this.blockSize);
    },

    getRowsAmount() {
        const totalHeight = Dimensions.get('window').height;
        const boardHeight = totalHeight * (1 - this.headerRatio);
        return Math.floor(boardHeight / this.blockSize);
    },

    colors: {
        backgroundRegular: '#999',
        backgroundOpened: '#999',
        backgroundMineField: '#EEE',
        borderLeft: '#CCC',
        borderRight: '#333',
        borderOpened: '#777',
        exploded: '#F00',
        one: '#2A28D7',
        two: '#2B520F',
        three: '#F9060A',
        six: '#F221A9'
    }
}

export default params;