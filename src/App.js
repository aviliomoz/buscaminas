import React, { useState } from 'react';
import { BiBomb } from 'react-icons/bi';

export const App = () => {
  const [board, setBoard] = useState([]);

  const columns = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
  const rows = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  const generateBoard = () => {
    const newEmptyBoard = [];
    const bombsLocation = generateBombs();

    for (let n = 0; n < 10; n++) {
      const newEmptyRow = [];

      for (let i = 0; i < 10; i++) {
        const id = `${columns[i]}${rows[n]}`;
        const bomb = bombsLocation.includes(id) ? true : false;

        newEmptyRow.push({ id, bomb });
      }

      newEmptyBoard.push(newEmptyRow);
    }

    setBoard(newEmptyBoard);
  };

  const generateBombs = () => {
    const bombs = [];

    for (let i = 0; i < 10; i++) {
      const id = generateRandomId();

      while (!bombs.includes(id)) {
        bombs.push(id);
      }
    }

    return bombs;
  };

  const generateRandomId = () => {
    const ramdomColumn = columns[Math.floor(Math.random() * 10)];
    const ramdomRow = rows[Math.floor(Math.random() * 10)];

    return `${ramdomColumn}${ramdomRow}`;
  };

  const countBombs = (id) => {
    const columnId = rows.indexOf(id.slice(1));
    const rowId = columns.indexOf(id.slice(0, 1));

    const aroundBoxes = getAroundBoxes(columnId, rowId);

    let bombsCounter = 0;

    aroundBoxes.forEach((box) => {
      box.bomb && bombsCounter++;
    });

    return bombsCounter;
  };

  const getAroundBoxes = (cid, rid) => {
    const outsideBox = { id: '', bomb: false };

    if (cid === 0) {
      return [
        board[cid][rid - 1] || outsideBox,
        board[cid + 1][rid - 1] || outsideBox,
        board[cid + 1][rid] || outsideBox,
        board[cid][rid + 1] || outsideBox,
        board[cid + 1][rid + 1] || outsideBox,
      ];
    }

    if (cid === 9) {
      return [
        board[cid - 1][rid - 1] || outsideBox,
        board[cid][rid - 1] || outsideBox,
        board[cid - 1][rid] || outsideBox,
        board[cid - 1][rid + 1] || outsideBox,
        board[cid][rid + 1] || outsideBox,
      ];
    }

    return [
      board[cid - 1][rid - 1] || outsideBox,
      board[cid][rid - 1] || outsideBox,
      board[cid + 1][rid - 1] || outsideBox,
      board[cid - 1][rid] || outsideBox,
      board[cid + 1][rid] || outsideBox,
      board[cid - 1][rid + 1] || outsideBox,
      board[cid][rid + 1] || outsideBox,
      board[cid + 1][rid + 1] || outsideBox,
    ];
  };

  const getBoxClassName = (rowIndex, boxIndex) => {
    if ((rowIndex + boxIndex) % 2 === 0) {
      return 'box hidden';
    } else {
      return 'box odd hidden';
    }
  };

  const showBoxContent = (e, counter) => {
    e.target.classList.remove('hidden');

    if (counter === 0) {
      e.target.classList.add('zero');
    }
    if (counter === 1) {
      e.target.classList.add('one');
    }
    if (counter === 2) {
      e.target.classList.add('two');
    }
    if (counter === 3) {
      e.target.classList.add('three');
    }
    if (counter === 4) {
      e.target.classList.add('four');
    }
    if (counter === 5) {
      e.target.classList.add('five');
    }
  };

  return (
    <div className="app">
      <header></header>
      <main>
        {board.length !== 0 && (
          <div className="board">
            {board.map((row, rowIndex) => {
              return (
                <div className="row" key={rows[rowIndex]}>
                  {row.map((box, boxIndex) => {
                    return (
                      <div
                        onClick={(e) => showBoxContent(e, countBombs(box.id))}
                        className={getBoxClassName(rowIndex, boxIndex)}
                        key={box.id}
                      >
                        {box.bomb ? <BiBomb /> : countBombs(box.id)}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </main>
      {board.length === 0 && <button onClick={generateBoard}>Jugar</button>}
    </div>
  );
};
