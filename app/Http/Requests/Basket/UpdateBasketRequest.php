<?php

namespace App\Http\Requests\Basket;

use App\Utils\Enum\Unit;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBasketRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'store_id' => [
                'required',
                function ($attribute, $value, $fail) {
                    if ($value !== 'new' && $value !== null && $value !== '') {
                        if (!\Illuminate\Support\Str::isUuid($value)) {
                            $fail('The ' . $attribute . ' field must be a valid UUID.');
                            return;
                        }
                        if (!\App\Models\Store::where('id', $value)->exists()) {
                            $fail('The selected ' . $attribute . ' is invalid.');
                        }
                    }
                },
            ],
            'new_store_name' => [
                Rule::requiredIf($this->store_id === 'new'),
                'nullable',
                'string',
                'max:255'
            ],
            'items' => ['required', 'array', 'min:1'],
            'items.*.product_id' => [
                'required_without:items.*.new_product_name',
                'nullable',
                function ($attribute, $value, $fail) {
                    if ($value !== 'new' && $value !== null && $value !== '') {
                        if (!\Illuminate\Support\Str::isUuid($value)) {
                            $fail('The ' . $attribute . ' field must be a valid UUID.');
                            return;
                        }
                        if (!\App\Models\Product::where('id', $value)->exists()) {
                            $fail('The selected ' . $attribute . ' is invalid.');
                        }
                    }
                },
            ],
            'items.*.new_product_name' => ['required_without:items.*.product_id', 'nullable', 'string', 'max:255'],
            'items.*.amount' => ['required', 'numeric', 'min:0.01'],
            'items.*.unit' => ['required', Rule::enum(Unit::class)],
            'items.*.weight' => ['required', 'integer', 'min:0'],
        ];
    }
}
