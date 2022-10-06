import React from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import logo from './logos/sac_state_logo.jpg';
const item = 
        {
            id: 'HPT123' ,
            name: ' - HPT Driller Machine',
            description: 'Hornet Power Tools is a Web Application developed by Team 4 for tracking Carbon emission for all the products used by Hornet family.'

        };

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Breakdown(){
    return(
        <div>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon style={{color: '#fff'}}/>} aria-controls="panel1a-content" id="panel1a-header" style={{backgroundColor:'#00573d', color:'#fff'}}>
            <Typography>CO<sub>2</sub> Emission Breakdown</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {/* <Typography> */}
            <Box sx={{ width: '100%' }}>
                <Stack spacing={2}>
                    <Item>
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-3 col-xs-12">
                            <img src={logo} alt='Sacramento State' style={{width: '125px', height: '110px'}} />
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12">
                            <span>
                                {item.description}
                            </span>
                        </div>
                    </div>
                    </Item>
                    <Item>Item 2</Item>
                    <Item>Item 3</Item>
                </Stack>
            </Box>
            {/* </Typography> */}
          </AccordionDetails>
        </Accordion>
        </div>
    );
}