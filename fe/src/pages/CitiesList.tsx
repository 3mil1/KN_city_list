import { useState, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import {
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Card,
    CardMedia,
    CardContent,
    Typography,
    CardActions,
    Button,
    Container,
    Pagination,
    Stack,
} from '@mui/material';
import SearchBar from '../components/Searchbar';

const cities = [
    {
        id: 1,
        name: 'Tokyo',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Skyscrapers_of_Shinjuku_2009_January.jpg/500px-Skyscrapers_of_Shinjuku_2009_January.jpg',
    },
    {
        id: 2,
        name: 'Jakarta',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Jakarta_Pictures-1.jpg/327px-Jakarta_Pictures-1.jpg',
    },
    {
        id: 3,
        name: 'Delhi',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/IN-DL.svg/439px-IN-DL.svg.png',
    },
    {
        id: 4,
        name: 'Mumbai',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Mumbai_Skyline_at_Night.jpg/500px-Mumbai_Skyline_at_Night.jpg',
    },
    {
        id: 5,
        name: 'Manila',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/Manila_Cathedral_Facade_at_Sunset.jpg/500px-Manila_Cathedral_Facade_at_Sunset.jpg',
    },
    {
        id: 6,
        name: 'Shanghai',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Pudong_Shanghai_November_2017_panorama.jpg/500px-Pudong_Shanghai_November_2017_panorama.jpg',
    },
    {
        id: 7,
        name: 'Seoul',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/%EB%8D%95%EC%88%98%EA%B6%81_2011%EB%85%84_11%EC%9B%94_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C_%EB%AA%85%EC%86%8C_%28Seoul_best_attractions%29_%EC%82%AC%EB%B3%B8_-1S6O1452.jpg/500px-%EB%8D%95%EC%88%98%EA%B6%81_2011%EB%85%84_11%EC%9B%94_%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD_%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C_%EB%AA%85%EC%86%8C_%28Seoul_best_attractions%29_%EC%82%AC%EB%B3%B8_-1S6O1452.jpg',
    },
    {
        id: 8,
        name: 'Mexico City',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Montaje.Ciudad_de_M%C3%A9xico.jpg/250px-Montaje.Ciudad_de_M%C3%A9xico.jpg',
    },
    /* {
        id: 9,
        name: 'Mexico City',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Montaje.Ciudad_de_M%C3%A9xico.jpg/250px-Montaje.Ciudad_de_M%C3%A9xico.jpg',
    },
    {
        id: 10,
        name: 'Mexico City',
        photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/Montaje.Ciudad_de_M%C3%A9xico.jpg/250px-Montaje.Ciudad_de_M%C3%A9xico.jpg',
    }, */
];

interface CitiesProps {
    id: number;
    name: string;
    photo: string;
}

export default function CitiesList(/* cities: CitiesProps[] */) {
    /*  const [imgSrc, setImgSrc] = useState('');
    const handleError = (e: any) => {
        e.stopPropagation();
        setImgSrc('./images/image_not_found.jpg');
    }; */

    const [page, setPage] = useState(1);
    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        setPage(newPage);
    };

    return (
        <Container>
            <SearchBar />
            <ImageList cols={3} rowHeight={300}>
                {cities.map((city) => (
                    <ImageListItem key={city.photo}>
                        <Card
                            sx={{ maxWidth: 375, textDecoration: 'none' }}
                            component={Link}
                            to={`detail/${city.id}`}
                        >
                            <CardMedia sx={{ height: 200 }} image={city.photo} title={city.name} />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="div">
                                    {city.name}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ImageListItem>
                ))}
            </ImageList>
            <Stack direction="row" alignItems="center" justifyContent="right" spacing={0}>
                <Pagination count={10} shape="rounded" page={page} onChange={handleChangePage} />
            </Stack>
        </Container>
    );
}
