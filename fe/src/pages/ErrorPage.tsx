import { useRouteError } from 'react-router-dom';
import { Typography, Container } from '@mui/material';

export default function ErrorPage() {
    const error: any = useRouteError();

    return (
        <Container>
            <Typography gutterBottom variant="h5" component="div">
                Sorry, an unexpected error has occurred.
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
                {error.statusText || error.message}
            </Typography>
        </Container>
    );
}
