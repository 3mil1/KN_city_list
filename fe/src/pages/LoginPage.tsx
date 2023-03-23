import { useState } from 'react';
import { Form } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Button, Container, Stack, Typography, Snackbar, Alert } from '@mui/material';
import Gutter from '../components/UI/Gutter';
import { useAuth } from '../hooks/useAuth';
import Loader from '../components/UI/Loader';

export interface LoginProps {
    email: string;
    password: string;
}

export default function LoginPage() {
    const { login } = useAuth();
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(false);
    const [isErrorMessageOpen, setIsErrorMessageOpen] = useState(false);

    const defaultValues = {
        email: '',
        password: '',
    };

    const { control, handleSubmit, reset } = useForm<LoginProps>({
        mode: 'onChange',
        defaultValues: defaultValues,
    });

    const emailFieldRule = {
        required: 'Please add username',
    };

    const passwordFieldRule = {
        required: 'Please add password',
    };

    const onSubmit: SubmitHandler<LoginProps> = async (data) => {
        try {
            setLoading(true);
            setError(null);
            if (data) {
                await login(data);
            }
            reset(defaultValues);
        } catch (error: unknown) {
            setError(error as Error);
            setIsErrorMessageOpen(true);
        } finally {
            setLoading(false);
        }
    };

    const handleCloseErrorMessage = () => {
        setIsErrorMessageOpen(false);
    };

    return loading ? (
        <Loader />
    ) : (
        <>
            <Snackbar
                open={isErrorMessageOpen}
                autoHideDuration={6000}
                onClose={handleCloseErrorMessage}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseErrorMessage} severity="error" sx={{ width: '100%' }}>
                    {error?.message}
                </Alert>
            </Snackbar>
            <Container sx={{ width: '30%' }}>
                <Gutter size={32} />
                <Typography variant="h5">Login</Typography>
                <Gutter size={32} />
                <Form method="put" onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        control={control}
                        rules={emailFieldRule}
                        name="email"
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <TextField
                                autoFocus
                                fullWidth
                                label="Email"
                                name="email"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />
                    <Gutter size={16} />
                    <Controller
                        control={control}
                        rules={passwordFieldRule}
                        name="password"
                        render={({ field: { value, onChange }, fieldState: { error } }) => (
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                variant="outlined"
                                value={value}
                                onChange={onChange}
                                error={!!error}
                                helperText={error?.message}
                            />
                        )}
                    />
                </Form>
                <Gutter size={16} />
                <Stack direction="row" alignItems="center" justifyContent="end" spacing={0}>
                    <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                        Login
                    </Button>
                </Stack>
            </Container>
        </>
    );
}
