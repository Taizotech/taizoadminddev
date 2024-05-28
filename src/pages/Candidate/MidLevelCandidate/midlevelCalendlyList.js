/* eslint-disable react/jsx-pascal-case */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable eqeqeq */
import { useEffect, useState } from "react";
import { GetcalendlyMeeting } from "../../../apiServices";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { Ddmmmyyyy_date, textTruncate } from "../../../utility";

const CanlentlyMeetingDetails = ({ email }) => {
  const [meetingList, setMeetingList] = useState([]);

  useEffect(() => {
    GetcalendlyMeeting(email).then((data) => {
      if (data.statuscode == 404) {
        return;
      }

      setMeetingList(data.data);
    });
  }, []);

  function addHoursAndMinutesToDate(hours, mins, input) {
    // Make a copy of the input date to avoid modifying the original date
    var newDate = new Date(input);

    // Add 5 hours and 30 minutes
    newDate.setHours(newDate.getHours() + hours);
    newDate.setMinutes(newDate.getMinutes() + mins);

    return newDate;
  }
  return (
    <>
      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650, maxHeight: 400, overflowX: "scroll" }}
          stickyHeader
          aria-label="sticky table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Meeting Url</TableCell>
              <TableCell>Meeting Time</TableCell>
              <TableCell>Meeting Owner</TableCell>

              <TableCell>Event Type</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {meetingList &&
              meetingList.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <a
                      href={row.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {textTruncate(row.joinUrl, 20)}
                    </a>
                  </TableCell>
                  <TableCell>
                    {" "}
                    <Ddmmmyyyy_date
                      dateValue={addHoursAndMinutesToDate(
                        5,
                        30,
                        row.meetingStartTime
                      )}
                    />{" "}
                  </TableCell>
                  <TableCell>{row.ownerName}</TableCell>

                  <TableCell>{row.eventName}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      {meetingList.length === 0 ? (
        <>
          <p class="text-danger text-center mt-5">
            No Meeting details Available
          </p>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default CanlentlyMeetingDetails;
