console.log('Hexagonal Chess: 2N-1 Queens');

const N = 3;

const hexes = [];


for (let x = -N; x <= N; x++) {
  let ys = x < 0 ? N : N - x;
  let ye = x < 0 ? -N - x : -N;
  for (let y = ys; y >= ye; y--) {
    //console.log(x, y, -y - x);
    hexes.push([x, y, -y - x]);
  }
  //console.log('');
}


function cubeToOffsetCoordinates(hex) {
  var col = hex[0];
  var row = hex[2] + (hex[0] - (hex[0] & 1)) / 2;
  console.log(hex.join(), [col + N, row + N].join());
  return [col + N, row + N];
}

function alternate(even, odd, count) {
  const buffer = [];
  for (let x = 0; x < count ; x++) {
    if (x % 2 == 0)
      Array.prototype.push.apply(buffer, even.split(''));
      //buffer.push(even.split(''));
    else
      Array.prototype.push.apply(buffer, odd.split(''));
      //buffer.push(odd.split(''));
  }
  //buffer.push('\n');
  //return buffer.join('');
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

const board = createBoard((N+1) * 2 - 1, (N+1) * 2);

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

function printHex(board, hex) {
  var col = hex[0] + N;
  var row = hex[2] + (hex[0] + (hex[0] & 1)) / 2 + N;
  console.log(col, row, 'hex', hex.join());
  var offsetX = 2 + col * 7;
  var offsetY = 1 + row * 4 + (col % 2) * 2;
  //writeBoard(board, offsetX, offsetY, 'X=' + col);
  //writeBoard(board, offsetX, offsetY + 1, 'Y=' + row);
  //writeBoard(board, offsetX, offsetY, 'X=' + hex[0]);
  //writeBoard(board, offsetX, offsetY + 1, 'Y=' + hex[1]);
  //writeBoard(board, offsetX, offsetY + 2, 'Z=' + hex[2]);

  writeBoard(board, offsetX, offsetY + 1, 'Queen');
}



for (let i = 0; i < hexes.length; i++) {
  printHex(board, hexes[i]);
}


for (let i = 0; i < board.length; i++) {
  console.log(board[i].join(''));
}

/*


x   0      1       2       3     4

y=0
2

  _____         _____
 /     \       /     \
/       \_____/       \
\       /     \       /
 \_____/       \_____/
       \       /
        \_____/



*/