import { useState } from "react";

/**
 * Responsive 2-column form row (collapses to 1 column on mobile)
 */
export function FormRow({ children, className = "" }) {
  return <div className={`pulse-form-row ${className}`}>{children}</div>;
}

/**
 * Standard field wrapper with label, required indicator, helper text & error state
 */
export function FormField({
  label,
  htmlFor,
  required = false,
  hint,
  error,
  action,
  children,
  className = "",
}) {
  return (
    <div className={`pulse-form-field ${error ? "has-error" : ""} ${className}`}>
      {(label || action) && (
        <div className="pulse-form-label-row">
          {label && (
            <label className="pulse-form-label" htmlFor={htmlFor}>
              {label}
              {required && <span className="pulse-required-mark" aria-hidden="true">*</span>}
            </label>
          )}
          {action && <div className="pulse-form-label-action">{action}</div>}
        </div>
      )}
      {children}
      {hint && !error && <div className="pulse-form-hint">{hint}</div>}
      {error && (
        <div className="pulse-form-error" role="alert">
          <i className="bi bi-exclamation-circle-fill me-1"></i>
          {error}
        </div>
      )}
    </div>
  );
}

/**
 * Modern input with optional leading icon and built-in password toggle
 */
export function FormInput({
  id,
  label,
  required = false,
  icon,
  type = "text",
  hint,
  error,
  labelAction,
  className = "",
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const resolvedType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <FormField
      label={label}
      htmlFor={id}
      required={required}
      hint={hint}
      error={error}
      action={labelAction}
      className={className}
    >
      <div className={`pulse-input-shell ${icon ? "has-left-icon" : ""} ${isPassword ? "has-right-action" : ""}`}>
        {icon && <i className={`bi ${icon} pulse-input-icon`} aria-hidden="true"></i>}
        <input
          id={id}
          type={resolvedType}
          required={required}
          className="pulse-input"
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            className="pulse-input-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <i className={`bi ${showPassword ? "bi-eye-slash" : "bi-eye"}`}></i>
          </button>
        )}
      </div>
    </FormField>
  );
}

/**
 * Modern select dropdown with leading icon support
 */
export function FormSelect({
  id,
  label,
  required = false,
  icon,
  hint,
  error,
  options = [],
  children,
  className = "",
  ...props
}) {
  return (
    <FormField
      label={label}
      htmlFor={id}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      <div className={`pulse-input-shell pulse-select-shell ${icon ? "has-left-icon" : ""}`}>
        {icon && <i className={`bi ${icon} pulse-input-icon`} aria-hidden="true"></i>}
        <select id={id} required={required} className="pulse-input pulse-select" {...props}>
          {options.length > 0
            ? options.map((opt) =>
                typeof opt === "string" ? (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ) : (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                )
              )
            : children}
        </select>
        <i className="bi bi-chevron-down pulse-select-caret" aria-hidden="true"></i>
      </div>
    </FormField>
  );
}

/**
 * Modern textarea with consistent focus state
 */
export function FormTextarea({
  id,
  label,
  required = false,
  hint,
  error,
  rows = 3,
  className = "",
  ...props
}) {
  return (
    <FormField
      label={label}
      htmlFor={id}
      required={required}
      hint={hint}
      error={error}
      className={className}
    >
      <textarea
        id={id}
        rows={rows}
        required={required}
        className="pulse-input pulse-textarea"
        {...props}
      />
    </FormField>
  );
}

/**
 * Modern accessible checkbox / consent box
 */
export function FormCheckbox({ id, label, checked, onChange, required = false, className = "" }) {
  return (
    <label className={`pulse-checkbox-label ${className}`} htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        required={required}
        className="pulse-checkbox-input"
      />
      <span className="pulse-checkbox-box" aria-hidden="true">
        <i className="bi bi-check-lg"></i>
      </span>
      <span className="pulse-checkbox-text">{label}</span>
    </label>
  );
}
