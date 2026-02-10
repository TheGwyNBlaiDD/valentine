"use client";

import { useEffect, useState } from "react";

const OrientationGuard = ({ children }: { children: React.ReactNode }) => {
    const [isLandscape, setIsLandscape] = useState(false);

    useEffect(() => {
        const update = () => {
            setIsLandscape(window.innerWidth > window.innerHeight)
        }
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [])

    if (!isLandscape) {
        return (
            <div className="min-h-screen flex items-center justify-center p-6 text-center">
                <div className="max-w-md rounded-2xl border p-6">
                <p className="text-lg font-semibold">Поверни телефон горизонтально</p>
                <p className="mt-2 text-sm opacity-70">
                    Игра лучше смотрится в landscape 🙂
                </p>
                </div>
            </div>
        );
    }
    return <>{children}</>
}

export default OrientationGuard