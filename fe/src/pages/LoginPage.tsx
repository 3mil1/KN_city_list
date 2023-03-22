import { useEffect } from 'react';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import Gutter from '../components/UI/Gutter';
import { useAuth } from '../hooks/useAuth';

export interface LoginProps {
    email: string;
    password: string;
}

export default function LoginPage() {
    const { login } = useAuth();
    //const location = useLocation();
    const navigate = useNavigate();
    const defaultValues = {
        email: '',
        password: '',
    };

    const { control, handleSubmit, reset, setValue } = useForm<LoginProps>({
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
        //console.log('constonSubmit:SubmitHandler<LoginProps>= ~ data:', data);
        login(data);
        reset(defaultValues);
    };

    const onCancel = () => {
        //navigate(-1);
        reset(defaultValues);
    };

    /*     useEffect(() => {
        setValue('id', editableCity.id);
        setValue('name', editableCity.name);
        setValue('photo', editableCity.photo);
    }, [editableCity]); */

    return (
        <Container sx={{ width: '40%' }}>
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
                            id="outlined-basic"
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
                            multiline
                            rows={4}
                            fullWidth
                            id="outlined-basic"
                            label="Password"
                            name="password"
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
            <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={0}>
                <Button variant="text" onClick={onCancel}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit(onSubmit)}>
                    Login
                </Button>
            </Stack>
        </Container>
    );
}
