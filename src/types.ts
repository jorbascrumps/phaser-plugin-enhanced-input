export type InputCallback = () => void;

export type InputMap = {
    [key: string]: {
        binding: number;
        pressed?: InputCallback;
        held?: InputCallback;
        released?: InputCallback;
    }
};
