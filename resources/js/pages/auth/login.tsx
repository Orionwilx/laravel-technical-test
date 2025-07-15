import Checkbox from '@/components/Checkbox';
import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail, Truck } from 'lucide-react';
import { FormEventHandler, useEffect, useState } from 'react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, [reset]);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post('/login', {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Iniciar Sesión - Puerto Brisa" />

            <div className="flex min-h-screen">
                {/* Left side - Login Form */}
                <div className="flex flex-1 items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        {/* Logo and Header */}
                        <div className="text-center">
                            <div className="flex justify-center">
                                <div className="rounded-full bg-blue-600 p-3">
                                    <Truck className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <h2 className="mt-6 text-3xl font-bold text-gray-900">Bienvenido a Puerto Brisa</h2>
                            <p className="mt-2 text-sm text-gray-600">Inicia sesión para acceder a tu cuenta</p>
                        </div>

                        {/* Status Message */}
                        {status && (
                            <div className="rounded-md border border-green-200 bg-green-50 p-4">
                                <div className="text-sm text-green-800">{status}</div>
                            </div>
                        )}

                        {/* Login Form */}
                        <form className="mt-8 space-y-6" onSubmit={submit}>
                            <div className="space-y-4">
                                {/* Email Field */}
                                <div>
                                    <InputLabel htmlFor="email" value="Correo Electrónico" />
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <TextInput
                                            id="email"
                                            type="email"
                                            name="email"
                                            value={data.email}
                                            className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            autoComplete="username"
                                            isFocused={true}
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="ejemplo@correo.com"
                                        />
                                    </div>
                                    <InputError message={errors.email} className="mt-2" />
                                </div>

                                {/* Password Field */}
                                <div>
                                    <InputLabel htmlFor="password" value="Contraseña" />
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <TextInput
                                            id="password"
                                            type={showPassword ? 'text' : 'password'}
                                            name="password"
                                            value={data.password}
                                            className="block w-full rounded-md border-gray-300 pl-10 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            autoComplete="current-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Ingresa tu contraseña"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                        </button>
                                    </div>
                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                {/* Remember Me */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Checkbox
                                            id="remember"
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', (e.target.checked || false) as false)}
                                        />
                                        <label htmlFor="remember" className="ml-2 block text-sm text-gray-900">
                                            Recordarme
                                        </label>
                                    </div>

                                    {canResetPassword && (
                                        <div className="text-sm">
                                            <Link href="/forgot-password" className="font-medium text-blue-600 hover:text-blue-500">
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <PrimaryButton
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    disabled={processing}
                                >
                                    {processing ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                                </PrimaryButton>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    ¿No tienes cuenta?{' '}
                                    <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                                        Regístrate aquí
                                    </Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right side - Background Image */}
                <div className="relative hidden w-0 flex-1 lg:block">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-800">
                        <div className="absolute inset-0 bg-black opacity-20"></div>
                        <div className="relative flex h-full items-center justify-center">
                            <div className="px-8 text-center text-white">
                                <div className="mb-8">
                                    <div className="inline-block rounded-full bg-yellow-400 p-4">
                                        <Truck className="h-16 w-16 text-blue-900" />
                                    </div>
                                </div>
                                <h1 className="mb-4 text-4xl font-bold">Sistema de Gestión de Envíos</h1>
                                <p className="mb-8 text-xl text-blue-100">Administra tus envíos portuarios de manera eficiente y segura</p>
                                <div className="space-y-4">
                                    <div className="flex items-center text-blue-100">
                                        <div className="mr-3 rounded-full bg-blue-500 p-1">
                                            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        Validación de placas colombianas
                                    </div>
                                    <div className="flex items-center text-blue-100">
                                        <div className="mr-3 rounded-full bg-blue-500 p-1">
                                            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        Notificaciones automáticas
                                    </div>
                                    <div className="flex items-center text-blue-100">
                                        <div className="mr-3 rounded-full bg-blue-500 p-1">
                                            <svg className="h-4 w-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </div>
                                        Reportes y exportación
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
