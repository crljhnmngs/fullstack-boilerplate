import { useMemo } from 'react';
import locationsData from '../assets/data/world-cities.json';

export const useLocations = () => {
    return useMemo(() => locationsData, []);
};
