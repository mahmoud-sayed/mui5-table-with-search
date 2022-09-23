import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import SearchBar from "material-ui-search-bar";


const columns = [
  { id: 'Name', label: 'Car name', minWidth: 170 },
  { id: 'Miles_per_Gallon', label: 'Miles per Gallon', align: 'center', minWidth: 80 },
  {
    id: 'Cylinders',
    label: 'Cylinders',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'Displacement',
    label: 'Displacement',
    minWidth: 50,
    align: 'center',
  }
  ,
  {
    id: 'Horsepower',
    label: 'Horsepower',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'Weight_in_lbs',
    label: 'Weight_in_lbs',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'Acceleration',
    label: 'Acceleration',
    minWidth: 50,
    align: 'center',
  },
  {
    id: 'Year',
    label: 'Year',
    minWidth: 50,
    align: 'center',
  }
  ,
  {
    id: 'Origin',
    label: 'Origin',
    minWidth: 50,
    align: 'center',
  }
];




const StickyHeadTable = () => {
  const [rows, setRows] = useState([]);
  const [searchResult, setSearchResult] = useState();
  const [searched, setSearched] = useState("");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const URL = 'http://localhost:5000/cars';
  console.log(searchResult);
  useEffect(() => {
    try {
      const fetchData = async () => {
        const response = await axios.get(URL);
        const data = response.data;
        setRows(data);
      };
      fetchData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const requestSearch = (searchedVal) => {
    const filteredRows = rows.filter((row) => {
      return row.Name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setSearchResult(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);

  };


  return (

    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <SearchBar
        value={searched}
        onChange={(searchVal) => requestSearch(searchVal)}
        onCancelSearch={() => cancelSearch()}
      />
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchResult ? searchResult.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.name} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }) : rows &&
            rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.name} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
export default StickyHeadTable;