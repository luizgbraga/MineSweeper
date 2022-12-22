function createBoard(rows, columns) {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                flagged: false, 
                mined: false,
                exploded: false,
                nearMines: 0
            }
        })
    });
}

function spreadMines(board, minesAmount) {
    const rows = board.length;
    const columns = board[0].length;
    let minesPlanted = 0;
    while(minesPlanted < minesAmount) {
        const rowSelected = Math.floor(Math.random() * rows);
        const columnSelected = Math.floor(Math.random() * columns);
        if(!board[rowSelected][columnSelected].mined) {
            board[rowSelected][columnSelected].mined = true;
            minesPlanted++;
        }
    }
}

function createMinedBoard(rows, columns, minesAmount) {
    const board = createBoard(rows, columns);
    spreadMines(board, minesAmount);
    return board;
}

function cloneBoard(board) {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field };
        })
    })
}

function getNeighbors(board, row, column) {
    const neighbors = [];
    const rows = [row - 1, row, row + 1];
    const columns = [column - 1, column, column + 1];
    rows.forEach(r => {
        columns.forEach(c => {
            const different = r !== row || c !== column;
            const validRow = r >= 0 && r < board.length;
            const validColumn = c >= 0 && c < board[0].length
            if(different && validRow && validColumn) {
                neighbors.push(board[r][c]);
            }
        })
    })
    return neighbors;
}

function safeNeighborhood(board, row, column) {
    return getNeighbors(board, row, column).reduce((result, neighbor) => {
        return result && !neighbor.mined;
    }, true);
}

function openField(board, row, column) {
    const field = board[row][column];
    if(!field.opened) {
        field.opened = true;
        if(field.mined) {
            field.exploded = true;
        } else if(safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column).forEach(
                n => openField(board, n.row, n.column)
            )
        } else {
            const neighbors = getNeighbors(board, row, column);
            field.nearMines = neighbors.filter(n => n.mined).length;
        }
    }
}

function fields(board) {
    return [].concat(...board);
}

function hadExplosion(board) {
    return fields(board).filter(field => field.exploded).length > 0;
}

function pending(field) {
    return (field.mined && !field.flagged) || (!field.mined && !field.opened);
}

function wonGame(board) {
    return fields(board).filter(pending).length === 0;
}

function showMines(board) {
    fields(board).filter(field => field.mined).forEach(
        n => n.opened = true
    )
}

function invertFlag(board, row, column) {
    const field = board[row][column];
    field.flagged = !field.flagged;
}

function flagsUsed(board) {
    return fields(board).filter(field => field.flagged).length;
}

export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines,
    invertFlag,
    flagsUsed
};