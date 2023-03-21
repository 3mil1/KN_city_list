import { Typography, Container } from '@mui/material';

export default function ErrorPage({ error }: { error: Error | null }) {
    return (
        <Container>
            <Typography gutterBottom variant="h5" component="div">
                Sorry, an unexpected error has occurred.
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
                {error?.message}
            </Typography>
        </Container>
    );
}
