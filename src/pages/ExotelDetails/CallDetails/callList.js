import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch } from "react-redux";
import { showHideDetailsActions } from "../../../redux-store/store";
import style from "./callList.module.scss";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function DenseTable() {
  const Dispatch = useDispatch();

  const openDrawer = (event) => {
    console.log("clickeddddddddddddd");
    Dispatch(showHideDetailsActions.setExotelCallDetails(true));
  };

  return (
    <TableContainer component={Paper} elevation={3}>
      <Table
        sx={{ minWidth: 650, cursor: "pointer" }}
        size="small"
        aria-label="a dense table"
      >
        <TableHead>
          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell>FROM</TableCell>
            <TableCell align="center">TO</TableCell>
            <TableCell align="center">DIRECTION</TableCell>
            <TableCell align="center">TIME</TableCell>
            <TableCell align="center">OUTCOME</TableCell>
            <TableCell align="center">CALL DURATION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              onClick={(e) => openDrawer(e)}
              className={`${style["table-row"]}`}
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.calories}</TableCell>
              <TableCell align="center">{row.fat}</TableCell>
              <TableCell align="center">{row.carbs}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
              <TableCell align="center">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
