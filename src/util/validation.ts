// Validation
export interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

export function validate(validatableInput: Validatable) {
  let isValid = true;

  if (validatableInput.required) {
    isValid = isValid && validatableInput.value.toString().trim().length !== 0;
  }

  switch (true) {
    case validatableInput.minLength != null && typeof validatableInput.value === 'string':
      isValid = isValid && validatableInput.value.length >= validatableInput.minLength;
      break;
    case validatableInput.maxLength != null && typeof validatableInput.value === 'string':
      isValid = isValid && validatableInput.value.length <= validatableInput.maxLength;
      break;
    case validatableInput.min != null && typeof validatableInput.value === 'number':
      isValid = isValid && validatableInput.value >= validatableInput.min;
      break;
    case validatableInput.max != null && typeof validatableInput.value === 'number':
      isValid = isValid && validatableInput.value <= validatableInput.max;
      break;
  }

  return isValid;
}