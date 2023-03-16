import { useState, ChangeEvent, useEffect } from 'react';
import { Link, useLoaderData, useParams, useNavigate } from 'react-router-dom';
import {
    ImageList,
    ImageListItem,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Container,
    Pagination,
    Stack,
    CardActionArea,
} from '@mui/material';
import SearchBar from '../components/Searchbar';
import { Gutter } from '../components/Gutter/index.style';

export async function getCities(page = 1) {
    const response = await fetch(`/api/cities?limit=9&page=${page}`);
    if (!response.ok) {
        const errorMessage = `An error occured: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
    }
    return await response.json();
}

export async function loader({ params }: any) {
    const data = await getCities(params.page);
    return data;
}

export interface CityProps {
    id: number;
    name: string;
    photo: string;
}

export interface CitiesListProps {
    items: CityProps[];
}

interface MetaProps {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

interface MetaListProps {
    meta: MetaProps;
}

export default function CitiesList() {
    const { page } = useParams();
    const navigate = useNavigate();
    const { items } = useLoaderData() as CitiesListProps;
    const { meta } = useLoaderData() as MetaListProps;
    const [cities, setCities] = useState<CityProps[]>(items);
    const [pageNumber, setPageNumber] = useState<number>(parseInt(page ?? '1'));

    useEffect(() => {
        navigate(`/cities/page/${pageNumber}`);
    }, [page]);

    useEffect(() => {
        setCities(items);
    }, [items]);

    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        setPageNumber(newPage);
        navigate(`/cities/page/${newPage}`);
    };

    return (
        <Container>
            <Gutter size={60} />
            <SearchBar />
            {cities.length ? (
                <>
                    <ImageList cols={3} rowHeight={300}>
                        {cities.map((city) => (
                            <ImageListItem key={city.id}>
                                <Card
                                    sx={{ maxWidth: 375, textDecoration: 'none' }}
                                    component={Link}
                                    to={`city/${city.id}`}
                                    state={{ data: city }}
                                >
                                    <CardActionArea>
                                        <CardMedia
                                            sx={{ height: 200 }}
                                            image={city.photo}
                                            title={city.name}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {city.name}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </ImageListItem>
                        ))}
                    </ImageList>
                    <Stack direction="row" alignItems="center" justifyContent="right" spacing={0}>
                        <Pagination
                            count={meta.totalPages}
                            shape="rounded"
                            page={pageNumber}
                            onChange={handleChangePage}
                        />
                    </Stack>
                </>
            ) : (
                <Typography>No cities available</Typography>
            )}
        </Container>
    );
}
