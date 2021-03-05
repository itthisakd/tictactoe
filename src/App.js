import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import styled from "@emotion/styled";

function App() {
  const [n, setN] = useState(0);
  const [grid, setGrid] = useState([]);
  const [player, setPlayer] = useState(true);
  let number = player ? "X" : "O";
  const [active, setActive] = useState(true);
  const [hasWon, setHasWon] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const Row = styled.div`
    height: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding: 0;
    margin: 0;
  `;
  const Box = styled.div`
    width: 50px;
    height: 50px;
    border: 1px black solid;
    padding: 0;
    margin: 0;
    text-align: center;
    font-size: 45px;
  `;

  const A = styled.div`
    margin: auto;
    padding: 0;
  `;

  const handleInputChange = (e) => {
    setN(e.target.value);
  };

  const createGrid = (k) => {
    let newGrid = [[]];
    for (let z = 0; z < k; z++) {
      newGrid[z] = [];
      for (let y = 0; y < k; y++) {
        newGrid[z] = [...newGrid[z], [""]];
      }
    }

    // for (let y = 0; y < newGrid.length; y++) {
    //   for (let x = 0; x < newGrid[y].length; x++) {
    //     newGrid[y][x] = [""];
    //   }
    // }
    return newGrid;
  };

  const handleClick = (y, x) => {
    let arr = [...grid];
    if (arr[y][x][0] === "") {
      player ? (arr[y][x] = ["X"]) : (arr[y][x] = ["O"]);
      setGrid(arr);
      checkWin();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGrid(createGrid(n));
    setSubmitted(true);
    setHasWon(false);
  };

  const readGrid = (arr) => {
    // onClick={() => handleClick(props.yy, props.xx)}     String(y) + "-" + String(x)
    return arr?.map((row, indexY) => {
      return (
        <Row>
          {row.map((box, indexX) => (
            <Box
              x={indexX}
              y={indexY}
              onClick={() => handleClick(indexY, indexX)}
            >
              <A>{box}</A>
            </Box>
          ))}
        </Row>
      );
    });
  };

  const checkWin = () => {
    let checkHori = false;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        checkHori =
          grid[y][x][0] === grid[y][0][0] && grid[y][0][0] !== ""
            ? true
            : false;
        if (checkHori === false) break;
      }
      if (checkHori === true) break;
    }
    let checkVert = false;
    for (let x = 0; x < n; x++) {
      for (let y = 0; y < n; y++) {
        checkVert =
          grid[y][x][0] === grid[0][x][0] && grid[0][x][0] !== ""
            ? true
            : false;
        if (checkVert === false) break;
      }
      if (checkVert === true) break;
    }


    //check diagonal downwards
    let checkDiagDown = false;
    for (let x = 0; x < n; x++) {
      checkDiagDown =
        grid[x][x][0] === grid[0][0][0] && grid[0][0][0] !== "" ? true : false;
      if (checkDiagDown === false) break;
    }

    let checkDiagUp = false;
    const checkDiagonalUp = () => {
      //check diagonal upwards
      let i = 0;
      let j = Number(n) - 1;
      while (i < n && j >= 0) {
        checkDiagUp =
          grid[j][i][0] === grid[Number(n) - 1][0][0] &&
          grid[Number(n) - 1][0][0] !== ""
            ? true
            : false;
        if (checkDiagUp === false) break;
        i++;
        j--;
      }
    };
    checkDiagonalUp();

    if (checkVert || checkHori || checkDiagUp || checkDiagDown) {
      setTimeout(() => {
        setHasWon(true);
        setSubmitted(false);
      }, 1500);
    } else {
      setPlayer(!player);
    }
  };

  const handleResetClick = () => {
    setSubmitted(false);
  };

  return (
    <div className="App">
      <div
        css={css`
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 0 20px 10px 0;
          border: 1px solid black;
        `}
      >
        <h1
          css={css`
            padding: 0 15px;
          `}
        >
          TIC TAC TOE
        </h1>
        {!submitted && (
          <form onSubmit={handleSubmit}>
            <h3>Choose grid size: </h3>
            <input type="number" onChange={handleInputChange} />
            <button type="submit">
              <i className="fas fa-check"></i>
            </button>
          </form>
        )}
        {submitted && (
          <button
            css={css`
              font-size: 20px;
            `}
            type="text"
            onClick={handleResetClick}
          >
            <strong>RESET GAME</strong>
          </button>
        )}
      </div>
      <br />
      <div>
        {submitted && (
          <body>
            <h3
              css={css`
                text-align: center;
              `}
            >
              {number} 's TURN
            </h3>
            <div>{readGrid(grid)}</div>
          </body>
        )}

        {hasWon && (
          <div>
            <h1
              css={css`
                text-align: center;
              `}
            >
              PLAYER {number} HAS WON
            </h1>
            <h3
              css={css`
                text-align: center;
              `}
            >
              Please enter grid size to start new game!
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
