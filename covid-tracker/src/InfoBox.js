import React from 'react'
import {Card,CardContent,Typography} from '@material-ui/core'

function InfoBox({title,cases,total, isRed, }) {
    return (
        <Card className = "infoBox">
            <CardContent>
                {/*title*/}
                <Typography className = 'infoBox__title' color = "textSecondary">
                    {title}
                </Typography>
                {/*number of cases*/}
                <h2 className = "infoBox__cases">{cases} Today</h2>
                {/*total cases*/}
                <Typography className = "infoBox__total" color = "textSecondary">
                    {total} Total
                </Typography>
            </CardContent>
        </Card>
    )
}
export default InfoBox
