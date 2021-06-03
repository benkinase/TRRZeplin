import { IContact } from "../../types";

type validationTypes = {
  company: {
    message: string;
    pattern: string;
    custom: string;
  };
  name: {
    message: string;
    pattern?: string;
    custom: string;
  };
  email: {
    message: string;
    pattern: string;
    custom?: string;
  };
  phone: {
    message: string;
    pattern: string;
    custom: string;
  };
};
const errorVals: validationTypes = {
  company: {
    message: "Company name is required",
    pattern: "Only letter is allowed",
    custom: "Company name cannot be more 80 characters",
  },
  name: {
    message: "Name is required",
    custom: "Name cannot be more 50 characters",
  },
  email: {
    message: "Email is required",
    pattern: "Please enter a valid email.",
  },
  phone: {
    message: "Phone number is required",
    pattern: "Only number is allowed",
    custom: "Number must be between 7 and 14 digits",
  },
};
// input level validation
export const validateRealTime = (field: string, value: string) => {
  let errors = {
    company: "",
    name: "",
    email: "",
    phone: "",
  };

  // validate company name

  if (field === "company") {
    if (!requiredValidator(value)) {
      errors.company = errorVals.company.message;
    } else if (!companyValidator(value)) {
      errors.company = errorVals.company.pattern;
    } else if (lengthValidator(field, value)) {
      errors.company = errorVals.company.custom;
    }
  }

  // validate name
  if (field === "name") {
    if (!requiredValidator(value)) {
      errors.name = errorVals.name.message;
    } else if (lengthValidator(field, value)) {
      errors.name = errorVals.name.custom;
    }
  }

  // validate email
  if (field === "email") {
    if (!requiredValidator(value)) {
      errors.email = errorVals.email.message;
    } else if (!emailValidator(value)) {
      errors.email = errorVals.email.pattern;
    }
  }

  // validate phone number
  if (field === "phone") {
    if (!requiredValidator(value)) {
      errors.phone = errorVals.phone.message;
    } else if (!isNumber(value)) {
      errors.phone = errorVals.phone.pattern;
    } else if (!phoneNumberValidator(value)) {
      errors.phone = errorVals.phone.custom;
    }
  }

  return errors;
};

// submission level validation
export const validate = (values: IContact) => {
  let errors = {
    company: "",
    name: "",
    email: "",
    phone: "",
  };

  // validate company name
  if (!requiredValidator(values.company)) {
    errors.company = errorVals.company.message;
  } else if (!companyValidator(values.company)) {
    errors.company = errorVals.company.pattern;
  } else if (values.company.length > 80) {
    errors.company = errorVals.company.custom;
  }

  // validate name
  if (!requiredValidator(values.name)) {
    errors.name = errorVals.name.message;
  } else if (values.name.length > 50) {
    errors.name = errorVals.name.custom;
  }
  // validate email
  if (!requiredValidator(values.email)) {
    errors.email = errorVals.email.message;
  } else if (!emailValidator(values.email)) {
    errors.email = errorVals.email.pattern;
  }

  // validate phone number
  if (!requiredValidator(values.phone)) {
    errors.phone = errorVals.phone.message;
  } else if (!isNumber(values.phone)) {
    errors.phone = errorVals.phone.pattern;
  }

  return errors;
};

// VALIDATION HELPER FUNCTIONS

//Require value validation
export const requiredValidator = (value: string | number | undefined) => {
  return value === "string" ? value.trim() : value;
};
// Character length
const lengthValidator = (field: string, value: string) => {
  return field === "name" ? value.length > 50 : value.length > 80;
};
// company field validation func
export const companyValidator = (value: string) => {
  let re = /^[^0-9]+$/;
  return re.test(value);
};

//Email field validation
export const emailValidator = (value: string) =>
  new RegExp(/\S+@\S+\.\S+/).test(value);

//Phone number field validation
export function isNumber(value: any) {
  let re = /^-?(\d+\.?\d*)$|(\d*\.?\d+)$/;
  return re.test(value.toString());
}
export function phoneNumberValidator(value: any) {
  let re = /([0-9\s-]{7,})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
  return re.test(value.toString());
}
//!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
export function validateNumber(phone: string) {
  let regex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

  if (regex.test(phone)) {
    console.log("Valid international phone number");
  } else {
    console.log("Invalid international phone number");
  }
}
