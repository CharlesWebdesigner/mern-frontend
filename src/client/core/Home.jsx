import { styled } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent  from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import Img from '../../assets/unicornbike.jpg'
import './index.css'

const Home = () => {
  return (
    <Card className='card'>
        <Typography variant="h6" className='title'>
            Home Page
        </Typography>
        <CardMedia component="img" image={Img} title="unicorn bike image" alt="unicorn bike" className='media'/>
        <Typography variant="body2" component="p" color="textSecondary" className='credit'>Photo by <a href="https://unsplash.com/@boudewijn_huysmans" target="_blank" rel="noopener noreferrer">Boudewijn Huysmans</a> on Unsplash</Typography>
        <CardContent>
            <Typography variant="body1" component="p">
                Welcome to home page
            </Typography>
        </CardContent>
    </Card>
  )
}
export default Home