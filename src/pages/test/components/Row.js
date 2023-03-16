import React, { lazy, useEffect, useState } from 'react';
import { Grid } from '@mui/material';

const importPlot = () => 
    lazy(() =>
        import('./Plot').catch(() =>{
            import('./NullView')
        })
    );

function Row({
    data,
    number_of_plots,
    requestedDate,
    plotToShow,

}){
    const [plots, setPlots] = useState([]) 
    const extract_data = response => response.data.children.map(({data}) => data);
    // console.log(data)
    const datum = async query => ({
      data: {
        children: data
      }  
    })
    // console.log(datum())
    useEffect(() => {
        async function loadPlots() {
            const plotToShow = await datum('plots data').then(extract_data)
            // console.log('',plotToShow)
            let unique_keys = []
            const componentPromises = plotToShow.map(async data => {
                let new_unique_key = Math.floor(Math.random()*100)
                while (unique_keys.includes(new_unique_key)){
                    new_unique_key = Math.floor(Math.random()*100)
                }
                unique_keys.push(new_unique_key)
                const Plot = await importPlot()
                return <Plot 
                    {...data}
                    color='dark'
                    description='Test'
                    key={new_unique_key}
                    requestedDate={requestedDate}
                />
            })
            Promise.all(componentPromises).then(setPlots)
        }
        loadPlots()
    }, [plotToShow])
    return (
        <div>
            <Grid container spacing={3}>
                {plots}
            </Grid>
        </div>
    )
}
export default Row;