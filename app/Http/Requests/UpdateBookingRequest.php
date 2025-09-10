<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateBookingRequest extends FormRequest
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
            'destination_id' => 'required|exists:destinations,id',
            'agency_id' => 'required|exists:agencies,id',
            'booking_date' => 'required|date',
            'travel_date' => 'required|date',
            'travel_time' => 'nullable|date_format:H:i',
            'number_of_people' => 'required|integer|min:1|max:50',
            'total_price' => 'nullable|numeric|min:0',
            'special_requests' => 'nullable|string|max:1000',
            'contact_phone' => 'nullable|string|max:20',
            'status' => 'nullable|in:pending,confirmed,cancelled,completed',
            'payment_status' => 'nullable|in:unpaid,paid,refunded',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'destination_id.required' => 'Please select a destination.',
            'destination_id.exists' => 'Selected destination does not exist.',
            'agency_id.required' => 'Please select an agency.',
            'agency_id.exists' => 'Selected agency does not exist.',
            'booking_date.required' => 'Booking date is required.',
            'travel_date.required' => 'Travel date is required.',
            'travel_time.date_format' => 'Travel time must be in HH:MM format.',
            'number_of_people.required' => 'Number of people is required.',
            'number_of_people.min' => 'At least 1 person is required.',
            'number_of_people.max' => 'Maximum 50 people allowed.',
            'total_price.numeric' => 'Total price must be a number.',
            'total_price.min' => 'Total price cannot be negative.',
        ];
    }
}
