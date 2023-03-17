import { useState, ChangeEvent, useEffect } from 'react';
import { Link, useLoaderData, useParams, useNavigate, Form, useSearchParams } from 'react-router-dom';
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

export async function getCities(page = 1, search = '') {
    const response = await fetch(`/api/cities?limit=9&page=${page}&search=${search}`);
    if (!response.ok) {
        const errorMessage = `An error occured: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
    }
    return await response.json();
}
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
    search: any;
}

interface MetaProps {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export async function loader({ params, request }: any): Promise<LoaderProps> {
    //console.log('loader ~ request:', request);
    //console.log('loader ~ params:', params);
    const url = new URL(request.url);
    const search = url.searchParams.get('search') ?? '';
    //console.log('loader ~ searchTerm:', searchTerm);
    const data = await getCities(params.page, search);
    return { data, search };
}

export default function CitiesList() {
    const { page } = useParams();
    const navigate = useNavigate();
    const { data, search } = useLoaderData() as LoaderProps;
    //console.log('CitiesList ~ data:', data);
    const { items, meta } = data;
    //console.log('CitiesList ~ search:', search);

    const [cities, setCities] = useState<CityProps[]>(items);
    const [pageNumber, setPageNumber] = useState<number>(parseInt(page ?? '1'));
    const [searchTerm, setSearchTerm] = useSearchParams();

    const searchInput = searchTerm.get('search') ?? '';

    const handleSearchChange = (event: any) => {
        //console.log('handleSearchChange ~ e:', event);
        //setSearchTerm(e);
        /*         console.log('handleSearchChange ~ event.target.value.length:', event.target.value.length);
        if (event.target.value.length === 1 && pageNumber !== 1) {
            console.log('change');
            setPageNumber(1);
            navigate(`/cities/page/1`);
        } */
        setSearchTerm({ search: event.target.value });
    };

    useEffect(() => {
        setCities(items);
    }, [items]);

    //pagination would work also while search is used
    useEffect(() => {
        console.log('CitiesList ~ pageNumber:', pageNumber);
        console.log('CitiesList ~ page:', page);
        //console.log('change');
        if (parseInt(page ?? '1') !== pageNumber) {
            console.log('update');
        }
        setPageNumber(parseInt(page ?? '1'));
        /*         const search = searchTerm.get('search') ? `?search=${searchTerm.get('search')}` : '';
        navigate(`/cities/page/${pageNumber}${search}`); */
        //setPageNumber(parseInt(page ?? '1'));
    }, [page]);

    useEffect(() => {
        const search = searchTerm.get('search') ? `?search=${searchTerm.get('search')}` : '';
        navigate(`/cities/page/${pageNumber}${search}`);
    }, [pageNumber]);

    /*     useEffect(() => {
        setCities(items);
    }, [items]); */

    /*     useEffect(() => {
        console.log('handleSearchChange ~ search:', searchTerm.get('search'));
        //console.log('search:', search);
        if ((searchTerm.get('search') === '' || searchTerm.get('search') === null) && pageNumber !== 1) {
            console.log('change2');
            setPageNumber(1);
            navigate(`/cities/page/1`);
        }
    }, [searchTerm]); */

    const handleChangePage = (event: ChangeEvent<unknown>, newPage: number) => {
        setPageNumber(newPage);
        /*  const search = searchTerm.get('search') ? `?search=${searchTerm.get('search')}` : '';
        navigate(`/cities/page/${newPage}${search}`); */
    };

    return (
        <Container>
            <Gutter size={60} />
            <Form id="search-form" role="search">
                {/* <input
                    aria-label="Search contacts"
                    type="text"
                    value={searchTerm.get('search') ?? ''}
                    onChange={handleSearchChange}
                /> */}
                <SearchBar value={searchInput} onChange={handleSearchChange} />
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
