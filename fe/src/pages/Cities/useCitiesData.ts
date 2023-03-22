import { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';

interface MetaProps {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}

export interface City {
    id: number;
    name: string;
    photo: string;
}

interface CitiesData {
    cities: City[];
    meta: MetaProps;
}

const initialState: CitiesData = {
    cities: [],
    meta: {
        totalItems: 0,
        itemCount: 0,
        itemsPerPage: 0,
        totalPages: 0,
        currentPage: 0,
    },
};

export function useCitiesData(page: number, search: string, token: string) {
    const [data, setData] = useState<CitiesData | null>(initialState);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const result = await getCities(page, search, token);
                setData({
                    cities: result.items,
                    meta: result.meta,
                });
                setError(null);
            } catch (error: unknown) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [page, search]);

    return { data, error, loading };
}

export async function getCities(page = 1, search = '', token = '') {
    const headers = { Authorization: `Bearer ${token}` };
    const response = await fetch(`/api/cities?limit=9&page=${page}&search=${search}`, { headers: headers });
    if (!response.ok) {
        const errorMessage = `An error occured: ${response.status} - ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return await response.json();
}
