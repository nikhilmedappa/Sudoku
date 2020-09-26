function solveSudoku(board) {
    const rows = [], columns = [], boxes = [],
          boxIdx = (row, col) => parseInt(row / 3) * 3 + parseInt(col / 3);
    let isSolved = false;
    for (let row = 0; row < board.length; row++) {
        rows.push(new Array(board.length + 1).fill(0));
        for (let col = 0; col < board.length; col++) {
            if (columns.length === col) {
                columns.push(new Array(board.length + 1).fill(0));
            }
            if (boxes.length === boxIdx(row, col)) {
                boxes.push(new Array(board.length + 1).fill(0));
            }
            if (board[row][col] !== '0') {
                place(row, col, board[row][col]);
            }
        }       
    }
    return backtrack(0, 0);
     
    function isAvailable(row, col, val) {
        return rows[row][val] === 0 && columns[col][val] === 0 && boxes[boxIdx(row, col)][val] === 0;
    }

    function place (row, col, val) {
        rows[row][val]++;
        columns[col][val]++;
        boxes[boxIdx(row, col)][val]++;
        board[row][col] = val + "";
    }
    
    function remove (row, col, val) {
        rows[row][val] = 0;
        columns[col][val] = 0;
        boxes[boxIdx(row, col)][val] = 0;
        board[row][col] = '0';
    }
    
    function next(row, col) {
        if (row === board.length - 1 && col === board.length - 1) {
            isSolved = true;
        } else {
            col === board.length - 1 ? backtrack(row + 1, 0) : backtrack(row, col + 1);
        }
    }
    
    function backtrack(row, col) {
        if (board[row][col] === '0') {
            for (let x = 1; x <= board.length; x++) {
                if (isAvailable(row, col, x)) {
                    place(row, col, x);
                    next(row, col);
                    if (!isSolved) {
                        remove(row, col, x);
                    }
                }
            }
        } else {
            next(row, col);
        }
    }
};

var board = [
    [0,0,0,2,6,0,7,0,1],
    [6,8,0,0,7,0,0,9,0],
    [1,9,0,0,0,4,5,0,0],
    [8,2,0,1,0,0,0,4,0],
    [0,0,4,6,0,2,9,0,0],
    [0,5,0,0,0,3,0,2,8],
    [0,0,9,3,0,0,0,7,4],
    [0,4,0,0,5,0,0,3,6],
    [7,0,3,0,1,8,0,0,0],
    ];

solveSudoku(board);
console.log(board);
