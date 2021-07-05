import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { SERVER } from '../util';
axios.defaults.withCredentials = true;
interface Props {
    full: boolean,
    admin?: boolean,
    logout: () => void
}
interface DayWeather {
    timepoint: number,
    weather: string,
    temp2m: {
        max: number,
        min: number
    },
}
export default function Navbar(props: Props) {
    const [weather, setWeather] = React.useState<DayWeather | undefined>(undefined);
    const [error, setError] = React.useState('');
    const selectIcon = (input: string) => {
        input = input.toLocaleLowerCase();
        switch (input) {
            case 'lightrain':
                return 'cloud';
            case 'rain':
                return 'cloud';
            case 'tsrain':
                return 'lightning';
            case 'ts':
            case 'clear':
                return 'sun';
            default:
                return 'cloud';
        }
    }
    React.useEffect(() => {
        axios.get('http://www.7timer.info/bin/api.pl?lon=113.17&lat=23.09&product=civillight&output=json', { withCredentials: false }).then(value => {

            setWeather({ ...value.data.dataseries[0] });
        }).catch(err => {
            setError('Could not connect to the weather api');
        })
    }, [])
    return (

        <Menu inverted color='black' borderless fluid>
            <Menu.Item icon={selectIcon(weather ? weather.weather : '')} />
            {error === '' ? (<Menu.Item className='inverted' >
                Temrature {(weather) ? `min: ${weather.temp2m.min}    max: ${weather.temp2m.max}C` : 'connecting'}
            </Menu.Item>) : (
                <Menu.Item className='inverted'>
                    {error}
                </Menu.Item>
            )}
            {
                props.full ? (
                    <>
                        <Menu.Item as={Link} color='yellow' to='/'>Home</Menu.Item>
                        <Menu.Item as={Link} to='/books'>Books</Menu.Item>
                        {
                            props.admin && (

                                <Menu.Item as={Link} to='/dashboard'>Dashboard</Menu.Item>


                            )
                        }
                        <Menu.Menu position='right'>


                            <Menu.Item onClick={async () => {
                                await axios.post(SERVER + '/logout');
                                props.logout();
                            }}>logout</Menu.Item>
                        </Menu.Menu>
                    </>
                ) : (
                    <Menu.Menu position='right'>
                        <Menu.Item as={Link} to='/login'>Login</Menu.Item>


                        <Menu.Item as={Link} to='/register'>Register</Menu.Item>
                    </Menu.Menu>
                )
            }
        </Menu>

    )
}
