import { z } from "zod";

export const siblingSchema = z.object({
    sibiling_name: z.string().min(1, "Name is required"),
    relationship: z.string(),
    sibling_age: z.number().min(0),
    occupation: z.string().optional(),
    contact: z.string().optional(),
});

export const studentFormSchema = z.object({
    reg_no: z.string().min(1, "Registration No required"),
    class_id: z.string().min(1, "Class is required"),
    distance_to_sschool: z.string().optional(),
    method_of_coming_to_school: z.string().optional(),
    grade_6_9_asthectic_subjects: z.string().optional(),
    grade_10_11_basket1_subjects: z.string().optional(),
    grade_10_11_basket2_subjects: z.string().optional(),
    grade_10_11_basket3_subjects: z.string().optional(),
    receiving_any_grade_5_scholarship: z.boolean(),
    receiving_any_samurdhi_aswesuma: z.boolean(),
    receiving_any_scholarship: z.boolean(),
    full_name: z.string().min(1, "Full name required"),
    full_name_with_initial: z.string().optional(),
    photo: z.any().nullable(),
    birthday: z.string().min(1, "Birthday required"),
    ethnicity: z.string().min(1, "Ethnicity required"),
    religion: z.string().min(1, "Religion required"),
    gender: z.string().min(1, "Gender required"),
    birth_certificate_number: z.string().optional(),
    address: z.string().min(1, "Address required"),
    nic_number: z.string().optional(),
    postal_ic_number: z.string().optional(),
    age: z.string(),
    special_needs: z.boolean(),
    height: z.string().optional(),
    weight: z.string().optional(),
    mother_name: z.string().optional(),
    father_name: z.string().optional(),

    sibilings: z.array(siblingSchema),
});


export type StudentFormValues = z.infer<typeof studentFormSchema>;