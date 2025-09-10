<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateDestinationRequest extends FormRequest
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
        $destination = request()->route('destination');
        $destinationId = $destination ? $destination->id : null;

        return [
            'agency_id' => 'required|exists:agencies,id',
            'name' => [
                'required',
                'string',
                'max:255',
                Rule::unique('destinations', 'name')->ignore($destinationId)
            ],
            'description' => 'nullable|string|max:1000',
            'location' => 'nullable|string|max:255',
            'featured_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'category' => 'nullable|string|max:100',
            'rating' => 'nullable|numeric|min:0|max:5',
            'price' => 'nullable|numeric|min:0',
            'activities' => 'required|array|min:1',
            'activities.*' => 'string|max:100',
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     */
    public function messages(): array
    {
        return [
            'agency_id.required' => 'Please select an agency.',
            'agency_id.exists' => 'Selected agency does not exist.',
            'name.required' => 'Destination name is required.',
            'name.unique' => 'A destination with this name already exists.',
            'featured_image.image' => 'Featured image must be an image file.',
            'featured_image.max' => 'Featured image file size must not exceed 2MB.',
            'price.numeric' => 'Price must be a number.',
            'price.min' => 'Price cannot be negative.',
            'rating.numeric' => 'Rating must be a number.',
            'rating.min' => 'Rating must be at least 0.',
            'rating.max' => 'Rating cannot exceed 5.',
            'activities.required' => 'At least one activity is required.',
            'activities.array' => 'Activities must be provided as a list.',
            'activities.min' => 'At least one activity is required.',
        ];
    }
}
