import React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

export default function SampleData() {
  function createData(name, latitude, longitude) {
    return { name, latitude, longitude };
  }

  const rows = [
    createData('Thessaloniki', '40.629269', '22.947412'),
    createData('Tokyo', '35.6839', '139.7744'),
    createData('New York', '40.6943', '-73.9249'),
    createData('Mumbai', '18.9667', '72.8333'),
    createData('Sao Paulo', '-23.5504', '-46.6339'),
  ];

  return (
    <Grid item xs={12} md={6}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 200 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sample Data</TableCell>
              <TableCell align="right">Latitude</TableCell>
              <TableCell align="right">Longitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.latitude}</TableCell>
                <TableCell align="right">{row.longitude}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
}
