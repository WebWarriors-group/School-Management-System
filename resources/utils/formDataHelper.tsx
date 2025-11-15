export const appendFormData = (formData: FormData, data: Record<string, any> , prefix = "") => {
    for (const key in data) {
        const value = data[key];
        const fullKey = prefix ? `${prefix}[${key}]` : key;

        if (value instanceof File) formData.append(fullKey, value);
        else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
            appendFormData(formData, value, fullKey);
        } else if (Array.isArray(value)) {
            value.forEach((item, index) => appendFormData(formData, item, `${fullKey}[${index}]`));
        } else {
            formData.append(fullKey, String(value ?? ""));
        }
    }
};