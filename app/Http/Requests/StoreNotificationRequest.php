<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreNotificationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'user_id' => 'required|exists:users,id',
            'type' => 'required|string|in:booking_confirmation,booking_reminder,booking_cancellation,payment_confirmation,system_update,promotional',
            'message' => 'required|string|max:1000',
            'is_read' => 'nullable|boolean',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'user_id.required' => 'User is required.',
            'user_id.exists' => 'Selected user does not exist.',
            'type.required' => 'Notification type is required.',
            'type.in' => 'Invalid notification type.',
            'message.required' => 'Message is required.',
            'message.max' => 'Message cannot exceed 1000 characters.',
        ];
    }
}
