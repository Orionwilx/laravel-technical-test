<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreShipmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'truck_plate' => [
                'required',
                'string',
                'max:10',
                'regex:/^[A-Z]{3}-\d{3}$|^[A-Z]{3}\d{2}[A-Z]$|^[A-Z]{3}\d{3}$/',
            ],
            'product_name' => 'required|string|max:255',
            'notes' => 'nullable|string|max:1000',
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'truck_plate.required' => 'La placa del camión es obligatoria.',
            'truck_plate.regex' => 'La placa del camión debe tener un formato válido colombiano (ej: ABC-123, ABC12D, ABC123).',
            'product_name.required' => 'El nombre del producto es obligatorio.',
            'product_name.max' => 'El nombre del producto no puede exceder 255 caracteres.',
            'notes.max' => 'Las notas no pueden exceder 1000 caracteres.',
        ];
    }

    /**
     * Get custom attributes for validator errors.
     */
    public function attributes(): array
    {
        return [
            'truck_plate' => 'placa del camión',
            'product_name' => 'nombre del producto',
            'notes' => 'notas',
        ];
    }
}
