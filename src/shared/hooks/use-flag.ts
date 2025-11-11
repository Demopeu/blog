import {useCallback, useState } from 'react';

export function useFlag(initialValue: boolean = false): readonly [boolean, () => void] {
    const [flag, setFlag] = useState<boolean>(initialValue);

    const toggleFlag = useCallback(() => {
        setFlag((prev) => !prev);
    }, []);
    return [flag, toggleFlag];
}
