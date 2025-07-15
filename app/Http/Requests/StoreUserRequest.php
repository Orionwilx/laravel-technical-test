<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check() && Auth::user()->isAdmin();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user')?->id;

        $rules = [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email' . ($userId ? ',' . $userId : ''),
            'status' => 'required|in:active,inactive',
        ];

        // Si es creación, password es requerido
        if ($this->isMethod('post')) {
            $rules['password'] = 'required|string|min:8|confirmed';
        } else {
            // Si es actualización, password es opcional
            $rules['password'] = 'nullable|string|min:8|confirmed';
        }

        return $rules;
    }
}
