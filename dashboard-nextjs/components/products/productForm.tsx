"use client";

import { useState } from "react";
import { createProductSchema, type createProduct } from "@/schemas/productSchema";

type FormErrors = Partial<Record<keyof createProduct, string>>;

type ProductFormProps = {
  mode: "create" | "edit";
  initialData?: createProduct & { id?: number };
  onSubmit: (data: createProduct) => Promise<void>;
  onClose?: () => void;
};
type FieldProps = {
  label: string;
  error?: string;
  children: React.ReactNode;
};
function Field({ label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {children}
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
export default function ProductForm({ mode, initialData, onSubmit, onClose }: ProductFormProps) {
  const [name, setName] = useState(initialData?.name || "");
  const [price, setPrice] = useState<string>(initialData?.price?.toString() || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [status, setStatus] = useState<createProduct["status"]>(initialData?.status || "In Stock");
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFieldErrors({});
    setSubmitError("");

    const parsed = createProductSchema.safeParse({
      name,
      price: Number(price),
      description: description || undefined,
      status,
    });

    if (!parsed.success) {
      const errors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as keyof FormErrors;
        if (field) errors[field] = issue.message;
      }
      setFieldErrors(errors);
      return;
    }

    try {
      setLoading(true);
      await onSubmit(parsed.data);
      onClose?.();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">
            {mode === "create" ? "Add New Product" : "Update Product"}
          </h2>
          {onClose && (
            <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors text-2xl leading-none">
              &times;
            </button>
          )}
        </div>

        {submitError && (
          <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
            {submitError}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
          <Field label="Product Name *" error={fieldErrors.name}>
            <input
              type="text"
              placeholder="e.g. Wireless Headphones"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 transition
                ${fieldErrors.name ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"}`}
            />
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Price ($) *" error={fieldErrors.price}>
              <input
                type="number"
                placeholder="0.00"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={`border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 transition
                  ${fieldErrors.price ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"}`}
              />
            </Field>

            <Field label="Status" error={fieldErrors.status}>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as createProduct["status"])}
                className="border border-gray-300 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition bg-white"
              >
                <option value="In Stock">In Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </Field>
          </div>

          <Field label="Description" error={fieldErrors.description}>
            <textarea
              placeholder="Short product description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className={`border rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 transition resize-none
                ${fieldErrors.description ? "border-red-400 focus:ring-red-200" : "border-gray-300 focus:ring-blue-200 focus:border-blue-400"}`}
            />
          </Field>

          <div className="flex gap-3 pt-2">
            {onClose && (
              <button type="button" onClick={onClose} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition">
                Cancel
              </button>
            )}
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-blue-600 text-white py-2.5 rounded-lg text-sm font-medium hover:bg-blue-500 disabled:opacity-50 transition"
            >
              {loading ? "Saving…" : mode === "create" ? "Create Product" : "Update Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}