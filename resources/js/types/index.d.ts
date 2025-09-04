import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    url: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}





export interface PageProps extends SharedData {
    flash: {
        success?: string;
        error?: string;
    };
}


export interface PageProps extends SharedData {
    flash: {
        success?: string;
        error?: string;
    };
}
export interface AcademicRecord {
  reg_no: number;
 student_id_no: string; 
  class_id: number;
  distance_to_school: number | null;
  method_of_coming_to_school: string | null;
  grade_6_9_asthectic_subjects: string | null;
  grade_10_11_basket1_subjects: string | null;
  grade_10_11_basket2_subjects: string | null;
  grade_10_11_basket3_subjects: string | null;
  receiving_any_scholarship: boolean;
   receiving_any_grade_5_scholarship: boolean;
  receiving_any_samurdhi_aswesuma: boolean;
  admission_date: string;
}

export type PersonalRecord = {
  reg_no: number;
  student_id_no: string;
  class_id: number;
  full_name: string;
  full_name_with_initial: string;
  birthday: string;
  ethnicity: string;
  religion: string;
  gender: string;
  birth_certificate_number?: string | null;
  address: string;
  nic_number: string | null;
  postal_ic_number: string | null;
  age: number;
  special_needs: string | null;
  height: number | null;
  weight: number | null;
};

export type FamilyRecord = {
  reg_no: number;
  student_id_no: string;
  class_id: number;
  mother_name: string;
  mother_occupation?: string | null;
  mother_income?: number | null;
  mother_working_place?: string | null;
  mother_contact?: string | null;
  mother_email?: string | null;
  mother_whatsapp?: string | null;
  father_name: string;
  father_occupation?: string | null;
  father_income?: number | null;
  father_working_place?: string | null;
  father_contact?: string | null;
  father_email?: string | null;
  father_whatsapp?: string | null;
};

export type SiblingsRecord = {
  reg_no: number;
  student_id_no: string;
  class_id: number;
  sibling_name?: string | null;
  relationship?: string | null;
  sibling_age?: number | null;
  occupation?: string | null;
  contact?: string | null;
};
export interface Student {
  reg_no: number;
  student_id_no: string; // ✅ Add this field
  class_id: number;
  distance_to_school: number | null;
  method_of_coming_to_school: string | null;
  grade_6_9_asthectic_subjects: string | null;
  grade_10_11_basket1_subjects: string | null;
  grade_10_11_basket2_subjects: string | null;
  grade_10_11_basket3_subjects: string | null;
  receiving_any_grade_5_scholarship: boolean;
  receiving_any_samurdhi_aswesuma: boolean;
  receiving_any_scholarship: boolean;
  admission_date: string;
  personal?: PersonalRecord;
  family?: FamilyRecord;
  siblings?: SiblingsRecord[];
}




