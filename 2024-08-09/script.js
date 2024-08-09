$(document).ready(function() {
    const puzzleContainer = $('.puzzle-container');
    let tiles = [];
    let emptyTileIndex = 15;

    function initPuzzle() {
        tiles = [...Array(15).keys()].map(x => x + 1); // Numbers 1 to 15
        tiles.push(null); // The empty space represented by `null`
        renderTiles();
    }

    function renderTiles() {
        puzzleContainer.empty();
        tiles.forEach((tile, index) => {
            const tileElement = $('<div class="tile"></div>');
            if (tile !== null) {
                tileElement.text(tile);
                tileElement.click(() => moveTile(index));
            } else {
                tileElement.addClass('empty');
            }
            puzzleContainer.append(tileElement);
        });
    }

    function moveTile(tileIndex) {
        const validMoves = [emptyTileIndex - 1, emptyTileIndex + 1, emptyTileIndex - 4, emptyTileIndex + 4];
        if (validMoves.includes(tileIndex)) {
            // Swap tiles
            [tiles[emptyTileIndex], tiles[tileIndex]] = [tiles[tileIndex], tiles[emptyTileIndex]];
            emptyTileIndex = tileIndex;
            renderTiles();
            checkWinCondition();
        }
    }

    function shuffleTiles() {
        for (let i = 0; i < 1000; i++) {
            const validMoves = getValidMoves();
            const randomMove = validMoves[Math.floor(Math.random() * validMoves.length)];
            moveTile(randomMove);
        }
    }

    function getValidMoves() {
        const moves = [];
        if (emptyTileIndex % 4 !== 0) moves.push(emptyTileIndex - 1); // Can move left
        if (emptyTileIndex % 4 !== 3) moves.push(emptyTileIndex + 1); // Can move right
        if (emptyTileIndex > 3) moves.push(emptyTileIndex - 4); // Can move up
        if (emptyTileIndex < 12) moves.push(emptyTileIndex + 4); // Can move down
        return moves;
    }

    function checkWinCondition() {
        if (tiles.slice(0, 15).every((val, idx) => val === idx + 1)) {
            alert('Congratulations! You solved the puzzle!');
        }
    }

    initPuzzle();
});
