import * as React from 'react';
import { Box } from '@mui/system';
import { FaTools, FaPlus} from 'react-icons/fa';
import './Page.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Autocomplete from '@mui/material/Autocomplete';
import CustomPaginationActionsTable from './Table';
import NavbarApp from "../pages/NavbarApp";
import FooterApp from './FooterApp';


function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Cupcake', 305, 3.7),
    createData('Donut', 452, 25.0),
    createData('Eclair', 262, 16.0),
    createData('Frozen yoghurt', 159, 6.0),
    createData('Gingerbread', 356, 16.0),
    createData('Honeycomb', 408, 3.2),
    createData('Ice cream sandwich', 237, 9.0),
    createData('Jelly Bean', 375, 0.0),
    createData('KitKat', 518, 26.0),
    createData('Lollipop', 392, 0.2),
    createData('Marshmallow', 318, 0),
    createData('Nougat', 360, 19.0),
    createData('Oreo', 437, 18.0),
  ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

export default function AdminComponent(){

    const [openNew, setOpenNew] = React.useState(false);

    const handleClickOpenNew = () => {
        setOpenNew(true);
    };

    const handleCloseNew = () => {
        setOpenNew(false);
    };

    return(
        <>
        <NavbarApp></NavbarApp>
        <div className="hpt-body" style={{ backgroundColor:'#d8d2b8', padding:'20px'}}>
            <div className='row' style={{paddingBottom:'20px'}}>
                <div className='col-lg-10 col-md-10 col-sm-8 col-xs-6'>
                    <Typography gutterBottom variant="h5" component="div" align="left">
                    <span style={{color:'#004e38', fontSize:'35px', padding:'15px'}}><FaTools/></span> Hornet Power Tools
                    </Typography>
                </div>
                <div className='col-lg-2 col-md-2 col-sm-4 col-xs-6' style={{textAlign:'right'}}>
                <Button onClick={handleClickOpenNew} title="Add New HPT Details" style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38', marginTop:'10px'}}><FaPlus /><span style={{paddingLeft:'10px'}}>New Tool</span></Button>
                <Dialog open={openNew} onClose={handleCloseNew}>
                    <DialogTitle><span style={{paddingRight:'10px'}}><FaPlus/></span>New Tool</DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                         Add New tool details here.
                    </DialogContentText>

                    <Box component="form" sx={{'& .MuiTextField-root': { m: 1, width: '40ch', backgroundColor:'#fff' }, paddingLeft:'0px', '& .MuiButton-root':{backgroundColor: '#0fa153'}}} noValidate autoComplete="off">
                        <div>
                            <Autocomplete disablePortal id="hptID" options={top100Films} renderInput={(params) => <TextField {...params} label="HPT ID" />}/>                       
                        </div>
                        <div>
                            <Autocomplete disablePortal id="batteryID" options={top100Films} renderInput={(params) => <TextField {...params} label="Battery ID" />}/>                       
                        </div>
                        <div>
                            <Autocomplete disablePortal id="motorID" options={top100Films} renderInput={(params) => <TextField {...params} label="Motor ID" />}/>                       
                        </div>
                        <div>
                            <Autocomplete disablePortal id="seaRouteID" options={top100Films} renderInput={(params) => <TextField {...params} label="Sea Route" />}/>                       
                        </div>
                        <div>
                            <Autocomplete disablePortal id="groundRouteID" options={top100Films} renderInput={(params) => <TextField {...params} label="Ground Transport Route" />}/>                       
                        </div>
                    </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseNew} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Cancel</Button>
                        <Button onClick={handleCloseNew} style={{color:'#fff', backgroundColor:'#004e38', border:'0.5px solid #004e38'}}>Submit</Button>
                    </DialogActions>
                </Dialog>
                </div>
            </div>
            <CustomPaginationActionsTable rows={rows} type="HPT"></CustomPaginationActionsTable>
        </div>
        <FooterApp></FooterApp>
        </>
    );
}

const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
    { label: 'The Godfather', year: 1972 },
    { label: 'The Godfather: Part II', year: 1974 },
    { label: 'The Dark Knight', year: 2008 },
    { label: '12 Angry Men', year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: 'Pulp Fiction', year: 1994 }];