import { Card, CardContent, Typography } from '@mui/material'

export default function WeatherCard({ date, maxTemp, minTemp, icon }) {

    return (
        <Card sx={{ minWidth: 175 }}>
            <CardContent>
                <Typography fontWeight='600'>{date}</Typography> 
                <img // Move this to a seperate component
                    alt='weather icon'
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`} />
                <Typography variant="h5" component='div'> 
                    {maxTemp}&deg;
                    <span style={{
                        color: 'dimgray',
                        marginLeft: '10px'
                    }}>
                        {minTemp}&deg;</span>
                </Typography>
            </CardContent>
        </Card>
    );
}