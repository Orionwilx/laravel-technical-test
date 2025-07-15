import InputError from '@/components/InputError';
import InputLabel from '@/components/InputLabel';
import PrimaryButton from '@/components/PrimaryButton';
import TextInput from '@/components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeOff, Lock, Mail, Truck, User } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post('/register', {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <>
            <Head title="Registrarse - Puerto Brisa" />

            <div className="flex min-h-screen">
                {/* Left side - Registration Form */}
                <div className="flex flex-1 items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md space-y-8">
                        {/* Logo and Header */}
                        <div className="text-center">
                            <div className="flex justify-center">
                                <div className="rounded-full bg-blue-600 p-3">
                                    <Truck className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <h2 className="mt-6 text-3xl font-bold text-gray-900">Únete a Puerto Brisa</h2>
                            <p className="mt-2 text-sm text-gray-600">Crea tu cuenta para acceder al sistema</p>
                        </div>

                        {/* Registration Form */}
                        <form className="mt-8 space-y-6" onSubmit={submit}>
                            <div className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <InputLabel htmlFor="name" value="Nombre Completo" />
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <User className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <TextInput
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            autoComplete="name"
                                            isFocused={true}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Ingresa tu nombre completo"
                                            required
                                        />
                                    </div>
                                    <InputError message={errors.name} className="mt-2" />
                                </div>

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
                                            onChange={(e) => setData('email', e.target.value)}
                                            placeholder="ejemplo@correo.com"
                                            required
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
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password', e.target.value)}
                                            placeholder="Crea una contraseña segura"
                                            required
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

                                {/* Confirm Password Field */}
                                <div>
                                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                                    <div className="relative mt-1">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <TextInput
                                            id="password_confirmation"
                                            type={showConfirmPassword ? 'text' : 'password'}
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            className="block w-full rounded-md border-gray-300 pl-10 pr-10 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            autoComplete="new-password"
                                            onChange={(e) => setData('password_confirmation', e.target.value)}
                                            placeholder="Confirma tu contraseña"
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 flex items-center pr-3"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                    <InputError message={errors.password_confirmation} className="mt-2" />
                                </div>
                            </div>

                            <div>
                                <PrimaryButton
                                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                    disabled={processing}
                                >
                                    {processing ? 'Creando cuenta...' : 'Crear Cuenta'}
                                </PrimaryButton>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    ¿Ya tienes cuenta?{' '}
                                    <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                                        Inicia sesión aquí
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
                                <h1 className="mb-4 text-4xl font-bold">Comienza tu experiencia</h1>
                                <p className="mb-8 text-xl text-blue-100">Únete a miles de empresas que confían en nuestro sistema</p>
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
                                        Configuración rápida y fácil
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
                                        Soporte técnico 24/7
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
                                        Acceso completo a todas las funciones
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
