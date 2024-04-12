import { createContext, useState, useContext } from 'react';

const ScanContext = createContext();

export const useScan = () => useContext(ScanContext);

export default function ScanProvider({ children }) {
    const [active, setActive] = useState(false);

    const startScanning = () => setActive(true);
    const stopScanning = () => setActive(false);

    return (
        <ScanContext.Provider value={{ active, startScanning, stopScanning }}>
            {children}
        </ScanContext.Provider>
    );
};
