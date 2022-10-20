import React, { Component } from 'react';
// import LineChart from 'react-linechart';
 

function createData(year, co2) {
    return { x:year ,y:co2};
}

export default class History extends Component {
     
    render() {
        const data1 = [
            createData(2001,102),
            createData(2002,134),
            createData(2003,112),
            createData(2004,56),
            createData(2005,15),
            createData(2006,154),
        ]
        const data = [
            {									
                color: "steelblue", 
                points : data1
            }
        ];
        return (
            <div>
                <div className = 'app'>
                        <h1>LineChart</h1>
                        {/* <LineChart 
                            width={600}
                            height={400}
                            data={data}
                        /> */}
                    </div>		
            </div>		
        );
    }
}



