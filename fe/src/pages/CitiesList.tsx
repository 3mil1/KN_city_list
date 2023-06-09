import { useEffect, ChangeEvent } from 'react';
import { Form, Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import {
    Card,
    CardContent,
    CardMedia,
    Container,
    ImageList,
    ImageListItem,
    Pagination,
    Stack,
    Typography,
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Gutter } from '../components/UI/Gutter/index.style';
import { useCitiesData } from '../hooks/useCitiesData';
import jwt_decode from 'jwt-decode';
import SearchBar from '../components/UI/Searchbar';
import ErrorPage from './ErrorPage';
import Loader from '../components/UI/Loader';
import useDebounce from '../hooks/useDebounce';
import { useAuth } from '../hooks/useAuth';

export interface DecodedProps {
    email: string;
    exp: number;
    iat: number;
    roles: string[];
    sub: string;
}

export default function CitiesList() {
    const { token, logout } = useAuth();
    const { page } = useParams();
    const pageNumber = page ?? '1';
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const search = searchParams.get('search') ?? '';
    const debouncedSearch = useDebounce<string>(search, 500);
    const { data, error, loading } = useCitiesData(parseInt(pageNumber), debouncedSearch, token);

    //move to the first page if search is entered
    useEffect(() => {
        if (parseInt(page ?? '') !== 1 && searchParams.get('search')) {
            const search = searchParams.get('search') ? `?search=${searchParams.get('search')}` : '';
            navigate(`/cities/page/1${search}`);
        }
    }, [searchParams]);

    const isEditAllowed = () => {
        const decoded: DecodedProps = jwt_decode(token);
        if (decoded.roles.includes('ROLE_ALLOW_EDIT')) {
            return true;
        }
        return false;
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        const newSearchValue = event.target.value;
        setSearchParams({ search: newSearchValue });
    };

    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        const search = searchParams.get('search') ?? '';
        const searchQueryString = search ? `?search=${search}` : '';
        navigate(`/cities/page/${newPage}${searchQueryString}`);
    };

    const handleLogOut = () => {
        logout();
    };

    const { cities, meta } = data || {};

    if (error) {
        return <ErrorPage error={error} />;
    }

    return loading && !search ? (
        <Loader />
    ) : (
        <Container>
            {token && (
                <Stack direction="row" alignItems="center" justifyContent="right" spacing={0}>
                    <Button type="button" onClick={handleLogOut}>
                        Sign Out
                    </Button>
                </Stack>
            )}
            <Gutter size={60} />
            <Form id="search-form" role="search">
                <SearchBar value={search} onChange={handleSearchChange} />
            </Form>
            {cities?.length ? (
                <>
                    <ImageList cols={3} rowHeight={300}>
                        {cities.map((city) => (
                            <ImageListItem key={city.id}>
                                <Card sx={{ maxWidth: 375, textDecoration: 'none' }}>
                                    <CardMedia sx={{ height: 200 }} image={city.photo} title={city.name} />
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
                                            {isEditAllowed() ? (
                                                <Link to={`/city/${city.id}`} state={{ data: city }}>
                                                    <EditIcon color="primary" />
                                                </Link>
                                            ) : (
                                                <></>
                                            )}
                                        </Stack>
                                    </CardContent>
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
