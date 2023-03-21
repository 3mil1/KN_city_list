import { Form, Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    ImageList,
    ImageListItem,
    Pagination,
    Stack,
    Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Gutter } from '../../components/Gutter/index.style';
import { useCitiesData } from './useCitiesData';
import { ChangeEvent, useMemo } from 'react';
import SearchBar from '../../components/Searchbar';
import ErrorPage from '../ErrorPage';
import Loader from '../../components/Loader';
import debounce from 'lodash.debounce';

export default function CitiesList() {
    const { page } = useParams();
    const pageNumber = page ?? '1';
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') ?? '';
    const { data, error, loading } = useCitiesData(parseInt(pageNumber), search);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchValue = event.target.value;
        setSearchParams({ search: newSearchValue });
    };

    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        const searchQueryString = search ? `?search=${search}` : '';
        navigate(`/cities/page/${newPage}${searchQueryString}`);
    };

    const debouncedOnChange = useMemo(() => {
        return debounce(handleSearchChange, 300);
    }, []);

    const { cities, meta } = data || {};

    if (error) {
        return <ErrorPage error={error} />;
    }

    return loading && !search ? (
        <Loader />
    ) : (
        <Container>
            <Gutter size={60} />
            <Form id="search-form" role="search">
                <SearchBar onChange={debouncedOnChange} />
            </Form>
            {cities?.length ? (
                <>
                    <ImageList cols={3} rowHeight={300}>
                        {cities.map((city) => (
                            <ImageListItem key={city.id}>
                                <Card
                                    sx={{ maxWidth: 375, textDecoration: 'none' }}
                                    component={Link}
                                    to={`/city/${city.id}`}
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
                            count={meta?.totalPages}
                            shape="rounded"
                            page={parseInt(pageNumber)}
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
