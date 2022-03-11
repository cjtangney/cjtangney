import { C3ResizeObserver } from 'utils';

const resizeObserver = new C3ResizeObserver();

export default async () => {
    // Bind any global functions that might be needed (WINDOW OBJECT)
    globalThis.resizeObserver = resizeObserver;
};
