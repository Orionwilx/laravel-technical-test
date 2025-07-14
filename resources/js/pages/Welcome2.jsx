import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Puerto Brisa" />
            <div className="min-h-screen bg-gray-50">
                <div className="container mx-auto px-4 py-8">
                    <header className="mb-8 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-800">Puerto Brisa</h1>
                        <p className="text-xl text-gray-600">Sistema de Gestión de Cargas</p>
                    </header>

                    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md">
                        <div className="text-center">
                            {auth.user ? (
                                <div>
                                    <p className="mb-4 text-gray-700">¡Bienvenido, {auth.user.name}!</p>
                                    <Link
                                        href={route('dashboard')}
                                        className="inline-block rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                                    >
                                        Ir al Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div>
                                    <p className="mb-4 text-gray-700">Inicia sesión para acceder al sistema</p>
                                    <div className="space-y-2">
                                        <Link
                                            href={route('login')}
                                            className="block w-full rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
                                        >
                                            Iniciar Sesión
                                        </Link>
                                        <Link
                                            href={route('register')}
                                            className="block w-full rounded bg-gray-500 px-4 py-2 font-bold text-white hover:bg-gray-600"
                                        >
                                            Registrarse
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <footer className="mt-8 text-center text-gray-500">
                        <p>
                            Laravel v{laravelVersion} - PHP v{phpVersion}
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}
