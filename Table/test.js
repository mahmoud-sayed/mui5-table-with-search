// import React, { useEffect, useState } from 'react';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TableFooter, TablePagination, Box, } from '@mui/material';
// import { useTheme } from '@mui/material/styles';
// import IconButton from '@mui/material/IconButton';
// import LastPageIcon from '@mui/icons-material/LastPage';
// import FirstPageIcon from '@mui/icons-material/FirstPage';
// import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
// import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
// import PropTypes from 'prop-types';
// import axios from 'axios';


// function TablePaginationActions(props) {
//   const theme = useTheme();
//   const { count, page, rowsPerPage, onPageChange } = props;

//   const handleFirstPageButtonClick = (event) => {
//     onPageChange(event, 0);
//   };

//   const handleBackButtonClick = (event) => {
//     onPageChange(event, page - 1);
//   };

//   const handleNextButtonClick = (event) => {
//     onPageChange(event, page + 1);
//   };

//   const handleLastPageButtonClick = (event) => {
//     onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
//   };

//   return (
//     <Box sx={{ flexShrink: 0, ml: 2.5 }}>
//       <IconButton
//         onClick={handleFirstPageButtonClick}
//         disabled={page === 0}
//         aria-label="first page"
//       >
//         {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
//       </IconButton>
//       <IconButton
//         onClick={handleBackButtonClick}
//         disabled={page === 0}
//         aria-label="previous page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
//       </IconButton>
//       <IconButton
//         onClick={handleNextButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="next page"
//       >
//         {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
//       </IconButton>
//       <IconButton
//         onClick={handleLastPageButtonClick}
//         disabled={page >= Math.ceil(count / rowsPerPage) - 1}
//         aria-label="last page"
//       >
//         {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
//       </IconButton>
//     </Box>
//   );
// }

// TablePaginationActions.propTypes = {
//   count: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   page: PropTypes.number.isRequired,
//   rowsPerPage: PropTypes.number.isRequired,
// };


// export default function BasicTable() {
//   const [data, setData] = useState();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);


//   const URL = 'http://localhost:5000/cars';


//   // Avoid a layout jump when reaching the last page with empty rows.
//   const emptyRows =
//     page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };


//   console.log(data);
//   useEffect(() => {
//     try {
//       const fetchData = async () => {
//         const response = await axios.get(URL);
//         setData(response.data);
//       };
//       fetchData();
//     } catch (error) {
//       console.log(error);
//     }
//   }, []);

//   return (

//     <TableContainer component={Paper}>

//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>Car name</TableCell>
//             <TableCell align="right">Miles per Gallon</TableCell>
//             <TableCell align="right">Cylinders</TableCell>
//             <TableCell align="right">Displacement</TableCell>
//             <TableCell align="right">Horsepower</TableCell>
//             <TableCell align="right">Weight in lbs</TableCell>
//             <TableCell align="right">Acceleration</TableCell>
//             <TableCell align="right">Year</TableCell>
//             <TableCell align="right">Origin</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {(rowsPerPage > 0
//             ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
//             : data
//           ).map((row) => (

//             <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
//               <TableCell component="th" scope="row"></TableCell>
//               <TableCell align="right">{row.Miles_per_Gallon}</TableCell>
//               <TableCell align="right">{row.Cylinders}</TableCell>
//               <TableCell align="right">{row.Displacement}</TableCell>
//               <TableCell align="right">{row.Horsepower}</TableCell>
//               <TableCell align="right">{row.Weight_in_lbs}</TableCell>
//               <TableCell align="right">{row.Acceleration}</TableCell>
//               <TableCell align="right">{row.Year}</TableCell>
//               <TableCell align="right">{row.Origin}</TableCell>
//             </TableRow>
//           ))}
//           {emptyRows > 0 && (
//             <TableRow style={{ height: 53 * emptyRows }}>
//               <TableCell colSpan={6} />
//             </TableRow>
//           )}
//         </TableBody>
//         <TableFooter>
//           <TableRow>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
//               colSpan={3}
//               count={data.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               SelectProps={{
//                 inputProps: {
//                   'aria-label': 'rows per page',
//                 },
//                 native: true,
//               }}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               ActionsComponent={TablePaginationActions}
//             />
//           </TableRow>
//         </TableFooter>
//       </Table>
//     </TableContainer>
//   );
// }
