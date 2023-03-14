import { useRouteError } from 'react-router-dom';
import { Typography } from '@mui/material';

export default function ErrorPage() {
    const error: any = useRouteError();
    console.error(error);

    return (
        <>
            <Typography gutterBottom variant="h5" component="div">
                Sorry, an unexpected error has occurred.
            </Typography>
            <Typography gutterBottom variant="subtitle1" component="div">
                <i>{error.statusText || error.message}</i>
            </Typography>
        </>
    );
}
