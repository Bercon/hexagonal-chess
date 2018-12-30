const N = parseInt(process.argv[2] || '4') - 1;

console.log('Hexagonal Chess: 2N-1 Queens for N =', N + 1);
console.time("Time");

const hexes = [];
let largestFound = [];

for (let x = -N; x <= N; x++) {
  let ys = x < 0 ? N : N - x;
  let ye = x < 0 ? -N - x : -N;
  for (let y = ys; y >= ye; y--) {
    hexes.push([x, y, -y - x]);
  }
}

function filterHexes(hexes, queen) {
  return hexes.filter(function(hex) {
    return !(hex[0] === queen[0] || hex[1] === queen[1] || hex[2] === queen[2])
      && !(Math.abs(hex[0] - queen[0]) === Math.abs(hex[1] - queen[1]))
      && !(Math.abs(hex[1] - queen[1]) === Math.abs(hex[2] - queen[2]))
      && !(Math.abs(hex[2] - queen[2]) === Math.abs(hex[0] - queen[0]))
  });
}

function maxQueens(freeHexes, queens) {
  for (let i = 0; i < freeHexes.length; i++) {
    const hex = freeHexes[i];
    const freeAfter = filterHexes(freeHexes, hex);
    const queensAfter = [...queens, hex];
    if (freeAfter.length > 0)
      maxQueens(freeAfter, queensAfter);
    else {
      if (largestFound.length < queensAfter.length) {
        largestFound = queensAfter;
      }
    }
  }
}

maxQueens(hexes, []);

console.timeEnd("Time");
console.log('Largest found:\n', largestFound);
console.log('Queens:', largestFound.length);
console.log('Goal:', (N + 1) * 2 - 1);

function alternate(even, odd, count) {
  const buffer = [];
  for (let x = 0; x < count; x++) {
    if (x % 2 == 0)
      Array.prototype.push.apply(buffer, even.split(''));
    else
      Array.prototype.push.apply(buffer, odd.split(''));
  }
  return buffer;
}

function createBoard(width, height) {
  const board = [];
  board.push(alternate('  _____', '       ', width));
  for (let y = 0; y < height; y++) {
    board.push(alternate(' /     \\', '      ', width));
    board.push(alternate('/       \\', '_____', width));
    board.push(alternate('\\       /', '     ', width));
    board.push(alternate(' \\_____/', '      ', width));
  }
  return board;
}

const board = createBoard((N + 1) * 2 - 1, (N + 1) * 2);

//printBoard(5,5);

function writeBoard(board, offsetX, offsetY, str) {
  const arr = str.split('');
  if (arr.length > 5)
    for (let i = 0; i < 5; i++)
      board[offsetY][offsetX + i] = 'X';
  else
    for (let i = 0; i < arr.length; i++)
      board[offsetY][offsetX + i] = arr[i];
}

function printHex(board, hex, queen = false) {
  var col = hex[0] + N;
  var row = N % 2 === 0 ? hex[2] + (hex[0] - (hex[0] & 1)) / 2 + N
    : hex[2] + (hex[0] + (hex[0] & 1)) / 2 + N;
  var offsetX = 2 + col * 7;
  var offsetY = 1 + row * 4 + (col % 2) * 2;
  if (queen) {
    writeBoard(board, offsetX, offsetY, '     ');
    writeBoard(board, offsetX, offsetY + 1, 'QUEEN');
    writeBoard(board, offsetX, offsetY + 2, '     ');
  } else {
    //writeBoard(board, offsetX, offsetY, 'X=' + col);
    //writeBoard(board, offsetX, offsetY + 1, 'Y=' + row);
    writeBoard(board, offsetX, offsetY, 'X' + hex[0]);
    writeBoard(board, offsetX, offsetY + 1, 'Y' + hex[1]);
    writeBoard(board, offsetX, offsetY + 2, 'Z' + hex[2]);
  }
}


for (let i = 0; i < hexes.length; i++) {
  printHex(board, hexes[i]);
}

for (let i = 0; i < largestFound.length; i++) {
  printHex(board, largestFound[i], true);
}


for (let i = 0; i < board.length; i++) {
  console.log(board[i].join(''));
}
