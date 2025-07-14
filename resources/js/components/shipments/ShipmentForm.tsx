import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shipment, ShipmentFormData } from '@/types';
import { Link, useForm } from '@inertiajs/react';
import { ArrowLeft, Save } from 'lucide-react';

interface ShipmentFormProps {
    shipment?: Shipment;
    isEdit?: boolean;
}

export default function ShipmentForm({ shipment, isEdit = false }: ShipmentFormProps) {
    const { data, setData, post, put, processing, errors } = useForm<ShipmentFormData>({
        truck_plate: shipment?.truck_plate || '',
        product_name: shipment?.product_name || '',
        notes: shipment?.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && shipment) {
            put(`/shipments/${shipment.id}`, {
                preserveScroll: true,
            });
        } else {
            post('/shipments', {
                preserveScroll: true,
            });
        }
    };

    const handlePlateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.toUpperCase();

        // Auto-format the plate
        if (value.length === 3 && !value.includes('-')) {
            value = value + '-';
        }

        setData('truck_plate', value);
    };

    return (
        <div className="mx-auto max-w-2xl">
            <div className="mb-6 flex items-center space-x-4">
                <Button asChild variant="outline" size="sm">
                    <Link href="/shipments">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Volver
                    </Link>
                </Button>
                <h1 className="text-2xl font-bold">{isEdit ? 'Editar Envío' : 'Nuevo Envío'}</h1>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{isEdit ? 'Editar información del envío' : 'Información del envío'}</CardTitle>
                    <CardDescription>
                        {isEdit ? 'Modifique los datos del envío' : 'Complete los datos para anunciar el envío de carga'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="truck_plate">Placa del Camión</Label>
                            <Input
                                id="truck_plate"
                                type="text"
                                value={data.truck_plate}
                                onChange={handlePlateChange}
                                maxLength={7}
                                placeholder="ABC-123"
                                className={errors.truck_plate ? 'border-red-500' : ''}
                            />
                            {errors.truck_plate && <p className="text-sm text-red-500">{errors.truck_plate}</p>}
                            <p className="text-sm text-gray-600">Formato: ABC-123 (3 letras, guión, 3 números)</p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="product_name">Nombre del Producto</Label>
                            <Input
                                id="product_name"
                                type="text"
                                value={data.product_name}
                                onChange={(e) => setData('product_name', e.target.value)}
                                placeholder="Ej: Café en grano, Flores, Banano"
                                className={errors.product_name ? 'border-red-500' : ''}
                            />
                            {errors.product_name && <p className="text-sm text-red-500">{errors.product_name}</p>}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notas (Opcional)</Label>
                            <Textarea
                                id="notes"
                                value={data.notes}
                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setData('notes', e.target.value)}
                                placeholder="Información adicional sobre el envío"
                                rows={3}
                                className={errors.notes ? 'border-red-500' : ''}
                            />
                            {errors.notes && <p className="text-sm text-red-500">{errors.notes}</p>}
                        </div>

                        <div className="flex justify-end space-x-3">
                            <Button type="button" variant="outline" asChild>
                                <Link href="/shipments">Cancelar</Link>
                            </Button>
                            <Button type="submit" disabled={processing}>
                                <Save className="mr-2 h-4 w-4" />
                                {processing ? 'Guardando...' : isEdit ? 'Actualizar' : 'Crear Envío'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Validation info */}
            <Card className="mt-6">
                <CardHeader>
                    <CardTitle className="text-lg">Información</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <p>• La placa debe seguir el formato colombiano: ABC-123</p>
                        <p>• El producto debe tener un nombre descriptivo</p>
                        <p>• Las notas son opcionales pero recomendadas</p>
                        <p>• Una vez creado el envío, se enviará un correo de confirmación</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
