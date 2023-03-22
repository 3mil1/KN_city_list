import { useEffect } from 'react';
import { Form, useLocation, useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { TextField, Button, Container, Stack, Typography } from '@mui/material';
import Gutter from '../components/UI/Gutter';
import { City } from './Cities/useCitiesData';

export default function CityDetail() {
    const location = useLocation();
    const navigate = useNavigate();
    const { token } = useAuth();
    const editableCity = location.state?.data;
    const defaultValues = {
        id: editableCity.id,
        name: editableCity.name,
        photo: editableCity.photo,
    };

    const { control, handleSubmit, reset, setValue } = useForm<City>({
        mode: 'onChange',
        defaultValues: defaultValues,
    });

    const nameFieldRule = {
        required: 'Please add name',
    };

    const photoFieldRule = {
        required: 'Please add photo url',
    };

    const saveCityData = async (data: City) => {
        const response = await fetch(`/api/cities`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Failed to save accesses');
        }
    };

    const onSubmit: SubmitHandler<City> = async (data) => {
        if (data) {
            await saveCityData({
                id: data.id,
                name: data.name,
                photo: data.photo,
            });
        }
        reset(defaultValues);
        navigate(-1);
    };

    const onCancel = () => {
        navigate(-1);
        reset(defaultValues);
    };

    useEffect(() => {
        setValue('id', editableCity.id);
        setValue('name', editableCity.name);
        setValue('photo', editableCity.photo);
    }, [editableCity]);

    return (
        <Container sx={{ width: '40%' }}>
            <Gutter size={32} />
            <Typography variant="h5">Edit city</Typography>
            <Gutter size={32} />
            <Form method="put" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    control={control}
                    rules={nameFieldRule}
                    name="name"
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                            autoFocus
                            fullWidth
                            id="outlined-basic"
                            label="Name"
                            name="name"
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
                    rules={photoFieldRule}
                    name="photo"
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                            multiline
                            rows={4}
                            fullWidth
                            id="outlined-basic"
                            label="Photo URL"
                            name="photo"
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
                    Save
                </Button>
            </Stack>
        </Container>
    );
}
