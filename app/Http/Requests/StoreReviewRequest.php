<?php

namespace App\Http\Requests;

use App\Models\Review;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class StoreReviewRequest extends FormRequest
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
            'reviewable_type' => [
                'required',
                'string',
                Rule::in(['App\\Models\\Agency', 'App\\Models\\Destination'])
            ],
            'reviewable_id' => [
                'required',
                'integer',
                'min:1',
            ],
            'rating' => [
                'required',
                'integer',
                'min:1',
                'max:5'
            ],
            'comment' => [
                'nullable',
                'string',
                'min:10',
                'max:1000'
            ],
            'images' => [
                'nullable',
                'array',
                'max:5' // Maximum 5 images
            ],
            'images.*' => [
                'image',
                'mimes:jpeg,png,jpg,webp',
                'max:2048' // 2MB max per image
            ]
        ];
    }

    /**
     * Get custom messages for validator errors.
     */
    public function messages(): array
    {
        return [
            'reviewable_type.required' => 'Please specify what you are reviewing.',
            'reviewable_type.in' => 'You can only review agencies or destinations.',
            'reviewable_id.required' => 'Please specify which item you are reviewing.',
            'rating.required' => 'Please provide a rating.',
            'rating.min' => 'Rating must be at least 1 star.',
            'rating.max' => 'Rating cannot be more than 5 stars.',
            'comment.min' => 'Comment must be at least 10 characters.',
            'comment.max' => 'Comment cannot exceed 1000 characters.',
            'images.max' => 'You can upload maximum 5 images.',
            'images.*.image' => 'All uploaded files must be images.',
            'images.*.mimes' => 'Images must be jpeg, png, jpg, or webp format.',
            'images.*.max' => 'Each image must be less than 2MB.',
        ];
    }
}
