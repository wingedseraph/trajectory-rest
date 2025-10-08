import { useState } from "react";

export function useValidationError() {
  const [error, setError] = useState("");

  const setValidationError = (message: string) => {
    setError(message);
  };

  const clearError = () => {
    setError("");
  };

  const hasError = error.length > 0;

  return {
    error,
    setValidationError,
    clearError,
    hasError,
  };
}
