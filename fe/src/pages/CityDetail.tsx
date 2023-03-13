import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { TextField, Stack, Button, Container } from '@mui/material';
import Gutter from '../components/Gutter';
import { redirect } from 'react-router-dom';

interface EditCityFormProps {
    name: string;
    photoUrl: string;
}

export default function CityDetail() {
    const defaultValues = {
        name: '',
        photoUrl: '',
    };

    const { control, handleSubmit, reset } = useForm<EditCityFormProps>({
        mode: 'onChange',
        defaultValues: defaultValues,
    });

    const nameFieldRule = {
        required: 'Please add name',
    };

    const photoUrlFieldRule = {
        required: 'Please add photo url',
    };

    const onSubmit: SubmitHandler<EditCityFormProps> = (data) => {
        //TODO: add submitting logic in future tasks,
        console.log(data);
        reset(defaultValues);
        return redirect('/');
    };

    const onCancel = () => {
        reset(defaultValues);
    };
    return (
        <Container sx={{ width: '40%' }}>
            <form>
                <Controller
                    control={control}
                    rules={nameFieldRule}
                    name="name"
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Name"
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
                    rules={photoUrlFieldRule}
                    name="photoUrl"
                    render={({ field: { value, onChange }, fieldState: { error } }) => (
                        <TextField
                            fullWidth
                            id="outlined-basic"
                            label="Photo URL"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            error={!!error}
                            helperText={error?.message}
                        />
                    )}
                />
            </form>
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
