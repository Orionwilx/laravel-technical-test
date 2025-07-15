import { User } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowRight, BarChart3, FileText, Mail, Shield, Truck, Users } from 'lucide-react';

interface Props {
    auth: {
        user: User;
    };
    laravelVersion: string;
    phpVersion: string;
}

export default function Welcome({ auth, laravelVersion, phpVersion }: Props) {
    return (
        <>
            <Head title="Puerto Brisa - Sistema de Gestión de Envíos" />

            {/* Header */}
            <header className="bg-gradient-to-r from-blue-900 to-blue-800 text-white shadow-lg">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <div className="rounded-lg bg-yellow-400 p-2">
                                <Truck className="h-8 w-8 text-blue-900" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold">Puerto Brisa</h1>
                                <p className="text-sm text-blue-200">Sistema de Gestión de Envíos</p>
                            </div>
                        </div>

                        <nav className="flex items-center space-x-4">
                            {auth.user ? (
                                <div className="flex items-center space-x-4">
                                    <span className="text-blue-200">Bienvenido, {auth.user.name}</span>
                                    <Link
                                        href={route('dashboard')}
                                        className="rounded-md bg-yellow-400 px-4 py-2 font-medium text-blue-900 transition-colors hover:bg-yellow-500"
                                    >
                                        Dashboard
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link href={route('login')} className="text-blue-200 transition-colors hover:text-white">
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="rounded-md bg-yellow-400 px-4 py-2 font-medium text-blue-900 transition-colors hover:bg-yellow-500"
                                    >
                                        Registrarse
                                    </Link>
                                </div>
                            )}
                        </nav>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="bg-gradient-to-b from-blue-50 to-white py-20">
                <div className="container mx-auto px-4 text-center">
                    <div className="mx-auto max-w-4xl">
                        <h2 className="mb-6 text-5xl font-bold text-gray-900">
                            Gestión Eficiente de
                            <span className="text-blue-600"> Envíos Portuarios</span>
                        </h2>
                        <p className="mb-8 text-xl leading-relaxed text-gray-600">
                            Plataforma integral para la gestión de anuncios de carga, seguimiento de envíos y administración portuaria en tiempo real.
                        </p>

                        {!auth.user && (
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Link
                                    href={route('register')}
                                    className="flex items-center justify-center rounded-lg bg-blue-600 px-8 py-3 font-medium text-white transition-colors hover:bg-blue-700"
                                >
                                    Comenzar Ahora
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                                <Link
                                    href={route('login')}
                                    className="rounded-lg border-2 border-blue-600 px-8 py-3 font-medium text-blue-600 transition-colors hover:bg-blue-600 hover:text-white"
                                >
                                    Iniciar Sesión
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-16 text-center">
                        <h3 className="mb-4 text-3xl font-bold text-gray-900">Funcionalidades Principales</h3>
                        <p className="text-lg text-gray-600">Todo lo que necesitas para gestionar tus envíos portuarios</p>
                    </div>

                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-100">
                                <Truck className="h-8 w-8 text-blue-600" />
                            </div>
                            <h4 className="mb-2 text-xl font-semibold text-gray-900">Gestión de Envíos</h4>
                            <p className="text-gray-600">
                                Anuncia y administra envíos con validación de placas colombianas y seguimiento en tiempo real.
                            </p>
                        </div>

                        <div className="rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-green-100">
                                <Shield className="h-8 w-8 text-green-600" />
                            </div>
                            <h4 className="mb-2 text-xl font-semibold text-gray-900">Seguridad Avanzada</h4>
                            <p className="text-gray-600">Sistema de roles y permisos con autenticación segura y validación de datos.</p>
                        </div>

                        <div className="rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-purple-100">
                                <BarChart3 className="h-8 w-8 text-purple-600" />
                            </div>
                            <h4 className="mb-2 text-xl font-semibold text-gray-900">Reportes y Analytics</h4>
                            <p className="text-gray-600">Exportación de datos a Excel y reportes detallados del estado de envíos.</p>
                        </div>

                        <div className="rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-yellow-100">
                                <Mail className="h-8 w-8 text-yellow-600" />
                            </div>
                            <h4 className="mb-2 text-xl font-semibold text-gray-900">Notificaciones</h4>
                            <p className="text-gray-600">
                                Sistema automatizado de correos electrónicos para mantener informados a todos los usuarios.
                            </p>
                        </div>

                        <div className="rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-red-100">
                                <Users className="h-8 w-8 text-red-600" />
                            </div>
                            <h4 className="mb-2 text-xl font-semibold text-gray-900">Gestión de Usuarios</h4>
                            <p className="text-gray-600">Administración completa de usuarios externos con roles y permisos personalizados.</p>
                        </div>

                        <div className="rounded-lg border p-6 text-center transition-shadow hover:shadow-lg">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-indigo-100">
                                <FileText className="h-8 w-8 text-indigo-600" />
                            </div>
                            <h4 className="mb-2 text-xl font-semibold text-gray-900">Documentación</h4>
                            <p className="text-gray-600">Documentación completa del sistema con guías de usuario y soporte técnico.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-blue-600 py-20 text-white">
                <div className="container mx-auto px-4 text-center">
                    <div className="mx-auto max-w-3xl">
                        <h3 className="mb-4 text-3xl font-bold">¿Listo para optimizar tu gestión portuaria?</h3>
                        <p className="mb-8 text-xl text-blue-100">Únete a Puerto Brisa y lleva tu administración de envíos al siguiente nivel</p>

                        {!auth.user && (
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Link
                                    href="/register"
                                    className="rounded-lg bg-white px-8 py-3 font-medium text-blue-600 transition-colors hover:bg-gray-100"
                                >
                                    Crear Cuenta Gratuita
                                </Link>
                                <Link
                                    href="/login"
                                    className="rounded-lg border-2 border-white px-8 py-3 font-medium text-white transition-colors hover:bg-white hover:text-blue-600"
                                >
                                    Iniciar Sesión
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 py-12 text-white">
                <div className="container mx-auto px-4">
                    <div className="grid gap-8 md:grid-cols-4">
                        <div className="space-y-4">
                            <div className="flex items-center space-x-2">
                                <div className="rounded bg-yellow-400 p-1">
                                    <Truck className="h-5 w-5 text-blue-900" />
                                </div>
                                <span className="font-bold">Puerto Brisa</span>
                            </div>
                            <p className="text-sm text-gray-400">Sistema integral de gestión de envíos portuarios con tecnología de vanguardia.</p>
                        </div>

                        <div>
                            <h4 className="mb-4 font-semibold">Funcionalidades</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Gestión de Envíos</li>
                                <li>Validación de Placas</li>
                                <li>Notificaciones</li>
                                <li>Reportes Excel</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 font-semibold">Soporte</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Documentación</li>
                                <li>Guía de Usuario</li>
                                <li>Pruebas Demo</li>
                                <li>Soporte Técnico</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="mb-4 font-semibold">Tecnología</h4>
                            <ul className="space-y-2 text-sm text-gray-400">
                                <li>Laravel {laravelVersion}</li>
                                <li>React + TypeScript</li>
                                <li>PHP {phpVersion}</li>
                                <li>Tailwind CSS</li>
                            </ul>
                        </div>
                    </div>

                    <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
                        <p>&copy; 2025 Puerto Brisa. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </>
    );
}
