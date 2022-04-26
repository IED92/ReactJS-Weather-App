import { Box } from '@mui/system';
import { useState, useEffect } from 'react';
import Loader from './Loader';
import WeatherCard from './WeatherCard';
import * as dayjs from 'dayjs'

const kelvinToC = (kTemp) => {
    return (kTemp - 273.15).toFixed(0);
};

const myFunc = (data) => Array.from(data).slice(0, 5)

const unixToDate = (data) => dayjs.unix(data).format('ddd')

export default function WeatherContainer() {

    const [isLoading, setIsLoading] = useState({});
    const [apiData, setApiData] = useState({});

    const lat = '49.2827'
    const long = '-123.1207'

    const apiKey = ''
    const apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${apiKey}`;

    useEffect(() => {
        fetch(apiUrl)
            .then((res) => res.json())
            .then((data) => {
                console.log('data', data)
                // transform the data here
                const normalizedData = myFunc(data.daily);
                // set the data into setAPI
                setApiData(normalizedData)
                return normalizedData;
            })
            .catch(e => console.log(e))
            .finally(() => {
                console.log('setting to false');
                setIsLoading(false)
            })
    }, [apiUrl]);

    useEffect(() => {
        console.log('data', apiData)

    }, [apiData])



    const WeatherItems = () => {
        return apiData.map(item => 
        <WeatherCard 
            maxTemp={kelvinToC(item.temp.max)} 
            minTemp={kelvinToC(item.temp.min)}
            icon={item.weather[0].icon}
            date={unixToDate(item.dt)}
            data={item} />)
    }

    return (
        <Box sx={{display: 'flex'}}>
            {isLoading ? <Loader /> : <WeatherItems />}
        </Box>
    )

}
