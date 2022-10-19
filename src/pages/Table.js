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
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { useState } from 'react';
import './Table.css';

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
  const type = params.type;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(2);

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

  const handleClickOpenEdit = () => {
      setOpenEdit(true);
      if(type === "Sea Route" || type === "Ground Transport"){
        setField(true);
        setRoute(true);
      }
      else if(type === "HPT"){
        setField(true);
      }

    
  };

  const handleCloseEdit = () => {
      setOpenEdit(false);
  };

  const [co2, setCO2] = useState();
  const [costManufactured, setCostManufactured] = useState();
  const [dateManufactured, setDateManufactured] = React.useState(null);
  const [partNumber, setPartNumber] = useState();
  const [salesPrice, setSalesPrice] = useState();
  const [serialNumber, setSerialNumber] = useState();


  const [field, setField] = React.useState(false);
  const [route, setRoute] = React.useState(false);

  return (
    <>
    <Dialog open={openEdit} onClose={handleCloseEdit}>
        <DialogTitle><span style={{paddingRight:'10px'}}><FaPencilAlt/></span>Edit {type} Details</DialogTitle>
        <DialogContent>
            <DialogContentText>
                Edit existing battery details here.
            </DialogContentText>

            <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'0px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
              <div  hidden={field}>
                  <TextField required id="serialNumber" variant='outlined' label="Product Serial Number" defaultValue="" value={serialNumber} onChange={e => setSerialNumber(e.target.value)}/>
              </div>
              <div  hidden={field}>
                  <TextField required id="partNumber" variant='outlined' label="Part Number" defaultValue="" value={partNumber} onChange={e => setPartNumber(e.target.value)}/>
              </div>
              <div hidden={field}>
                  <TextField required id="co2" variant='outlined' label="CO2" type="number" defaultValue="" value={co2} onChange={e =>{setCO2(e.target.value);}  }/>
              </div>
              <div hidden={field}>
                  <TextField required id="costManufactured" variant='outlined' label="Cost of Manufacture ($)" type="number" defaultValue="" value={costManufactured} onChange={e => setCostManufactured(e.target.value)}/>
              </div>
              <div  hidden={field}>
                  {/* <TextField required id="dateManufactured" variant='outlined' label="Date Manufactured" type="date" defaultValue=""/> */}
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker label="Date Manufactured" renderInput={(params) => <TextField {...params} />} value={dateManufactured} onChange={(newVal) => setDateManufactured(newVal)} />
                  </LocalizationProvider>
              </div>
              <div  hidden={field}>
                  <TextField required id="salesPrice" variant='outlined' label="Sales Price ($)" type="number" defaultValue="" value={salesPrice} onChange={e => setSalesPrice(e.target.value)}/>
              </div>

              <div hidden={!field}>
                  <Autocomplete disablePortal id="hptID" options={top100Films} renderInput={(params) => <TextField {...params} label="HPT ID" />}/>                       
              </div>
              <div hidden={!field}>
                  <Autocomplete disablePortal id="batteryID" options={top100Films} renderInput={(params) => <TextField {...params} label="Battery ID" />}/>                       
              </div>
              <div hidden={!field}>
                  <Autocomplete disablePortal id="motorID" options={top100Films} renderInput={(params) => <TextField {...params} label="Motor ID" />}/>                       
              </div>
              <div hidden={!field}>
                  <Autocomplete disablePortal id="seaRouteID" options={top100Films} renderInput={(params) => <TextField {...params} label="Sea Route" />}/>                       
              </div>
              <div hidden={!field}>
                  <Autocomplete disablePortal id="groundRouteID" options={top100Films} renderInput={(params) => <TextField {...params} label="Ground Transport Route" />}/>                       
              </div>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseEdit} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Cancel</Button>
            <Button onClick={handleCloseEdit} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Submit</Button>
        </DialogActions>
    </Dialog>
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
            <TableCell style={{color:'#fff'}} align="center" hidden={field && route}>Route</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={!field}>Serial Number</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={!field}>HPT ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={!field}>Battery ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={!field}>Motor ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={!field}>Sea Route ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={!field}>Ground Transport ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={!field}>Total CO<sub>2</sub> Emitted</TableCell>
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
              <TableCell style={{ width: 160 }} align="center" hidden={field && route}>
                {rows.route}
              </TableCell>
              {/* Admin Components Table */}
              <TableCell style={{ width: 160 }} align="center" hidden={!field}>
                {row.serialNum}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={!field}>
                {row.hptId}
              </TableCell>
              <TableCell style={{ width: 160 }}align="center" hidden={!field}>
                {row.batteryId}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={!field}>
                {row.motorId}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={!field}>
                {row.seaRouteId}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={!field}>
                {row.groundId}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={!field}>
                {row.totalCo2}
              </TableCell>
              <TableCell style={{width: 160}} align="center">
                <Button id="edit" onClick={handleClickOpenEdit} title="Edit Battery Details" style={{color:'#004e38', backgroundColor:'#fff', border:'0.5px solid #004e38'}}><FaPencilAlt /></Button>
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
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
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
    </>
  );
}

const top100Films = [
 ];