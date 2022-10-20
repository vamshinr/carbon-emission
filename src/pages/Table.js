import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import {FaPencilAlt} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Autocomplete from '@mui/material/Autocomplete';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { useState } from 'react';
import './Table.css';
import AddEditPageComponent from './AddEditModalComponent';

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

// function createData(name, calories, fat) {
//   return { name, calories, fat };
// }

// const rows = [];

export default function CustomPaginationActionsTable(params) {
  const rows = params.rows;
  console.log("rows",rows);
  const type = params.type;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  var field = false;
  var route = true;
  var admin = true;
  console.log(type);

  // Show fields when its Battery and Motor. Add route to the fields when its sea and ground. Show only HPT fields for admin page.
  if(type === "Sea Route" || type === "Ground Transport"){
    route = false;
    field = true;
    admin = true;
  }
  else if(type === 'Battery' || type === 'Motor'){
      field = false;
      route = true;
      admin = true;
  }
  else if(type === "HPT"){
      admin = false;
      field = true;
      route = true;
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [openEdit, setOpenEdit] = React.useState(false);

  const [curRow, setCurRow] = React.useState({});
  // var curRow = {};

  const handleClickOpenEdit = (rowdata) => {
    debugger;
    console.log("params in table component",rowdata);
    // curRow = rowdata;
    setCurRow(rowdata);
    setOpenEdit(true);
    // this.props.open(false);
  };

  const handleChild = (isOpen) =>{
      setOpenEdit(isOpen);
      console.log(isOpen);
  }

  // function handleCloseModal(event, data) {
  //   console.log(event, data);
  //   setOpenEdit(false);
  // }

  // function handleAfterOpen(event, data) {
  //   console.log(event, data);
  // }
  // const [field, setField] = React.useState(false);
  // const [route, setRoute] = React.useState(false);

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead style={{backgroundColor:'#0f5132'}}>
            <TableRow >
            <TableCell style={{color:'#fff'}} align="center" hidden={field}>Serial Number</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={field}>Part Number</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={field}>CO<sub>2</sub> Emitted</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={field}>Cost of Manufacture ($)</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={field}>Date Manufactured</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={field}>Sales Price ($)</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={route}>Tracking Number</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={route}>Route ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={route}>CO<sub>2</sub></TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={route}>{type === "Sea Route" ? "Ship ID" : "Truck ID"}</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={route}>Fuel Cost ($)</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={route}>Labour Cost ($)</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={route}>Customer Cost ($)</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Serial Number</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>HPT ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Battery ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Motor ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Sea Route ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Ground Transport ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Total CO<sub>2</sub> Emitted</TableCell>
            <TableCell style={{color:'#fff'}} align="center" >Edit</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              {/* Battery and Motor Components Table */}
              <TableCell style={{ width: 140 }} align="center" hidden={field}>
                {row.serialNum}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={field}>
                {row.partNum}
              </TableCell>
              <TableCell style={{ width: 160 }}align="center" hidden={field}>
                {row.co2}
              </TableCell>
              <TableCell style={{ width: 170 }} align="center" hidden={field}>
                {row.costManu}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={field}>
                {row.dateManu}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={field}>
                {row.salesPr}
              </TableCell>
              {/* Sea and Road Transport cols*/}
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {rows.trackNum}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {rows.routeID}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {rows.co2}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {rows.shipID}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {rows.fuelCost}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {rows.labourCost}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {rows.customerCost}
              </TableCell>
              
              {/* Admin Components Table */}
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.serialNum}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.hptId}
              </TableCell>
              <TableCell style={{ width: 160 }}align="center" hidden={admin}>
                {row.batteryId}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.motorId}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.seaRouteId}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.groundId}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.totalCo2}
              </TableCell>
              <TableCell style={{width: 160}} align="center">
                <Button id="edit" onClick={()=>handleClickOpenEdit(row)} title="Edit Battery Details" style={{color:'#004e38', backgroundColor:'#fff', border:'0.5px solid #004e38'}}><FaPencilAlt /></Button>
              </TableCell>
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    {openEdit?<AddEditPageComponent  open={true} close={handleChild} type={params.type} row={curRow}></AddEditPageComponent> :<></>}
    </>
  );
}

