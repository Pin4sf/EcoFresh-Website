declare global {
    interface Window {
        VANTA: {
            FOG: (config: any) => any;
            CELLS: (config: any) => any;
            TOPOLOGY: (config: any) => any;
        };
    }
}

export {};
