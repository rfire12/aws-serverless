import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Tab } from '@material-ui/core';


const ReservationsTable = () => {

    const [reservations, setReservations] = useState([]);

    useEffect( () => {
      getReservations();
    }, [])

    const getReservations = () => {
        let response = [];
        const url    = process.env.AWS_ENDPOINT;
        const params = {
          method: 'GET',
          headers: {
            'content-type': 'application/json'
          }
        };

        fetch(url, params)
        .then(response => response.json())
        .then(data => setReservations(data.reservations))
        .catch(e => console.log(e));
    }
    
    return (
      <TableContainer component={Paper} className="table">
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="table-header-title" align="center">ID</TableCell>
              <TableCell className="table-header-title" align="center">Name</TableCell>
              <TableCell className="table-header-title" align="center">Lab</TableCell>
              <TableCell className="table-header-title" align="center">Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((row) => (
              <TableRow key={row.reservationId}>
                <TableCell align="center">
                  {row.id}
                </TableCell>
                <TableCell align="center">{row.name}</TableCell>
                <TableCell align="center">{row.lab}</TableCell>
                <TableCell align="center">{row.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </TableContainer>
    );
}

export default ReservationsTable;