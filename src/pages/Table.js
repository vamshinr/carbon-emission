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
import {FaPencilAlt, FaTrashAlt} from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import './Table.css';
import AddEditPageComponent from './AddEditModalComponent';
import { useState } from 'react';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import HptAddEditTool from './HptAddEditTool';
import BatteryCon from "../connections/BatteryCon";
import MotorCon from '../connections/MotorCon';
import SeaTransportCon from "../connections/SeaTransportCon";
import GroundTransportCon from "../connections/GroundTransportCon";
import HptCon from '../connections/HptCon';

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
  const [hptEdit, setHPTEdit] = React.useState(false);
  const [curRow, setCurRow] = React.useState({});
  // var curRow = {};

  const handleClickOpenEdit = (rowdata) => {
    console.log("params in table component",rowdata);
    // curRow = rowdata;
    setCurRow(rowdata);
    // this.props.open(false);
    if(type === "HPT"){
      setHPTEdit(true);
    }
    else{
      setOpenEdit(true);
    }

  };

  const handleClickOpenDelete = (rowdata) => {
    console.log("On Delete");
    if(type === "Sea Route"){
      SeaTransportCon.searoute_delete(rowdata.id).then(response =>{
        // params.close(false);
        setAlertContent("Success! Deleted Sea Route Details");
        setAlertSeverity("success");
        setAlert(true);
        console.log(response);
        setTimeout(() => window.location.reload(false), 2000);
      }).catch(error =>{
          console.log(error);
          setAlertContent("Failure! Couldn't Delete Sea Route Details");
          setAlertSeverity("error")
          setAlert(true);
      });
       
    }
    else if(type === "Ground Transport"){
      GroundTransportCon.groundroute_delete(rowdata.id).then(response =>{
        // params.close(false);
        setAlertContent("Success! Deleted Ground Transport Details");
        setAlertSeverity("success");
        setAlert(true);
        console.log(response);
        setTimeout(() => window.location.reload(false), 2000);
      }).catch(error =>{
          console.log(error);
          setAlertContent("Failure! Couldn't Delete Ground Transport Details");
          setAlertSeverity("error")
          setAlert(true);
      });
    }
    else if(type === 'Battery'){
      BatteryCon.battery_delete(rowdata.id).then(response =>{
        // params.close(false);
        setAlertContent("Success! Deleted Battery Details");
        setAlertSeverity("success");
        setAlert(true);
        console.log(response);
        setTimeout(() => window.location.reload(false), 2000);
      }).catch(error =>{
          console.log(error);
          setAlertContent("Failure! Couldn't Delete Battery Details");
          setAlertSeverity("error")
          setAlert(true);
      });
    }
    else if(type === 'Motor'){
      MotorCon.motor_delete(rowdata.id).then(response =>{
        // params.close(false);
        setAlertContent("Success! Editted Motor Details");
        setAlertSeverity("success");
        setAlert(true);
        console.log(response);
        setTimeout(() => window.location.reload(false), 2000);
      }).catch(error =>{
          console.log(error);
          setAlertContent("Failure! Couldn't Delete Motor Details");
          setAlertSeverity("error")
          setAlert(true);
      });
    }
    else if(type === "HPT"){
      HptCon.hpt_delete(rowdata.id).then(response =>{
        // params.close(false);
        setAlertContent("Success! Deleted HPT Details");
        setAlertSeverity("success");
        setAlert(true);
        console.log(response);
        setTimeout(() => window.location.reload(false), 2000);
      }).catch(error =>{
          console.log(error);
          setAlertContent("Failure! Couldn't Delete HPT Details");
          setAlertSeverity("error")
          setAlert(true);
      });
    }
  }

  const handleChild = (isOpen) =>{
      setOpenEdit(isOpen);
      setHPTEdit(isOpen);
      console.log(isOpen);
      setAlertContent("Success! Updated "+ type +" Details");
      setAlertSeverity("success");
      setAlert(true);
  }

  const handleChildExit = (isOpen) =>{
    setOpenEdit(isOpen);
    setHPTEdit(isOpen);
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

  const [alert, setAlert] = useState(false);
  const [alertContent, setAlertContent] = useState('');
  const [alertSeverity, setAlertSeverity] = useState('');
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setAlertContent("");
    setAlertSeverity("");
    setAlert(false);
  };

  const vertical = 'top';
  const horizontal = 'center';

  var order_num = 0;
  return (
    <>
    {alert ? 
          <Snackbar open={alert} autoHideDuration={5000} onClose={handleAlertClose} anchorOrigin={{vertical,horizontal}}>
            <Alert onClose={handleAlertClose} severity={alertSeverity} sx={{ width: '100%' }}>
              {alertContent}
            </Alert>
          </Snackbar>      
      : <></>}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead style={{backgroundColor:'#0f5132'}}>
            <TableRow >
            <TableCell style={{color:'#fff'}} align="center" >Order Number</TableCell>
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
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>HPT ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Tool Type</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Battery ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Motor ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Sea Route ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Ground Transport ID</TableCell>
            <TableCell style={{color:'#fff'}} align="center" hidden={admin}>Total CO<sub>2</sub> Emitted</TableCell>
            <TableCell style={{color:'#fff'}} align="center" >Actions</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={order_num}>
              <TableCell style={{ width: 140 }} align="center" >
                {order_num+=1}
              </TableCell>
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
                {row.trackNum}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {row.rouID}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {row.co2}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
              {/* {type === "Sea Route" ? row.sID : row.tID}{} */}
              {row.transportID}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {row.fuelCo}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {row.labCo}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={route}>
                {row.custCo}
              </TableCell>
              
              {/* Admin Components Table */}
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.serialNumAdmin}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.tooltype}
              </TableCell>
              <TableCell style={{ width: 160 }}align="center" hidden={admin}>
                {row.batteryid}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.motorid}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.seaid}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.groundid}
              </TableCell>
              <TableCell style={{ width: 160 }} align="center" hidden={admin}>
                {row.co2}
              </TableCell>
              <TableCell style={{width: 160}} align="center">
                <Button id="edit" onClick={()=>handleClickOpenEdit(row)} title="Edit Battery Details" style={{color:'#004e38', backgroundColor:'#fff', border:'0.5px solid #fff'}}><FaPencilAlt /></Button>
                <Button id="delete" title="Delete Battery Details" onClick={()=>handleClickOpenDelete(row)} style={{color:'#dc3545', backgroundColor:'#fff', border:'0.5px solid #fff'}}><FaTrashAlt /></Button>
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
              colSpan={type === 'Battery' || type === 'Motor' ? 8 : 9}
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
              style={{marginBottom:'0px'}}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    {openEdit?<AddEditPageComponent  open={true} exit={handleChildExit} close={handleChild} type={params.type} row={curRow}></AddEditPageComponent> :<></>}
    {hptEdit? <HptAddEditTool open={true} exit={handleChildExit} close={handleChild} type={params.type} row={curRow}></HptAddEditTool>: <></>}
    </>
  );
}

