import { useState, ChangeEvent, useEffect, useMemo } from 'react';
import { Link, useLoaderData, useParams, useNavigate, Form, useSearchParams } from 'react-router-dom';
import debounce from 'lodash.debounce';
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
import EditIcon from '@mui/icons-material/Edit';
import SearchBar from '../components/Searchbar';
import { Gutter } from '../components/Gutter/index.style';

export interface CityProps {
    id: number;
    name: string;
    photo: string;
}

export interface CitiesListProps {
    items: CityProps[];
    meta: MetaProps;
}

interface LoaderProps {
    data: CitiesListProps;
}

interface MetaProps {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export async function getCities(page = 1, search = '') {
    //console.log('getCities ~ response:', page);
    const response = await fetch(`/api/cities?limit=9&page=${page}&search=${search}`);
    if (!response.ok) {
        const errorMessage = `An error occured: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
}

export async function loader({ params, request }: any): Promise<LoaderProps> {
    const url = new URL(request.url);
    const search = url.searchParams.get('search') ?? '';
    const data = await getCities(params.page, search);
    if (data.status === 404) {
        throw new Response('Not Found', { status: 404 });
    }
    return { data };
}

export default function CitiesList() {
    const { page } = useParams();
    const navigate = useNavigate();
    const { data } = useLoaderData() as LoaderProps;
    const { items, meta } = data;

    const [cities, setCities] = useState<CityProps[]>(items);
    const [pageNumber, setPageNumber] = useState<number>(parseInt(page ?? '1'));
    const [searchTerm, setSearchTerm] = useSearchParams();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm({ search: event.target.value });
    };

    const debouncedOnChange = useMemo(() => {
        return debounce(handleSearchChange, 300);
    }, []);

    useEffect(() => {
        setCities(items);
    }, [items]);

    useEffect(() => {
        const pageNum = parseInt(page ?? '1');
        setPageNumber(pageNum);
        //otherwise back button does not work at all, with this it will work "time-to-time"
        const search = searchTerm.get('search') ? `?search=${searchTerm.get('search')}` : '';
        navigate(`/cities/page/${pageNum}${search}`);
    }, [page]);

    //otherwise list wont't change if page is changed
    useEffect(() => {
        console.log('useeffect -pagenumber', pageNumber);
        const search = searchTerm.get('search') ? `?search=${searchTerm.get('search')}` : '';
        navigate(`/cities/page/${pageNumber}${search}`);
    }, [pageNumber]);

    //set pagenumber to 1 if search input is changed
    useEffect(() => {
        if (pageNumber !== 1 && searchTerm.get('search')) {
            setPageNumber(1);
        }
    }, [searchTerm]);

    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        setPageNumber(newPage);
    };

    return (
        <Container>
            <Gutter size={60} />
            <Form id="search-form" role="search">
                <SearchBar onChange={debouncedOnChange} />
            </Form>
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
                                            <Stack
                                                direction="row"
                                                alignItems="center"
                                                justifyContent="space-between"
                                                spacing={0}
                                            >
                                                <Typography gutterBottom variant="h5" component="div">
                                                    {city.name}
                                                </Typography>
                                                <EditIcon color="primary" />
                                            </Stack>
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
