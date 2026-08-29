export type ReviewTargetType =
  | 'professor'
  | 'advisor'
  | 'course'
  | 'dorm'
  | 'university';

export type PersonType = 'professor' | 'advisor' | 'both';

export interface University {
  id: string;
  name: string;
  domain: string;
  location: string;
  slug: string;
}

export interface Department {
  id: string;
  university_id: string;
  name: string;
  code: string | null;
}

export interface Professor {
  id: string;
  department_id: string;
  name: string;
  type: PersonType;
  email: string | null;
  title: string | null;
  is_verified: boolean;
}

export interface Course {
  id: string;
  department_id: string;
  course_code: string;
  course_name: string;
  credits: number | null;
  is_verified: boolean;
}

export interface Dorm {
  id: string;
  university_id: string;
  building_name: string;
  campus_zone: string | null;
  capacity: number | null;
  is_verified: boolean;
}

export interface DirectorySearchResult {
  kind: 'university' | 'department' | 'professor' | 'course' | 'dorm';
  id: string;
  label: string;
  subtitle: string | null;
  university_id: string | null;
  department_id: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  limit: number;
  offset: number;
}

export interface ReviewCreatePayload {
  target_type: ReviewTargetType;
  target_id?: string;
  user_token: string;
  ratings: Record<string, number>;
  qualitative_tags?: string[];
  comment?: string;
  create_professor?: {
    name: string;
    type: PersonType;
    department_id?: string;
    department_name?: string;
    university_id?: string;
  };
  create_course?: {
    course_code: string;
    course_name: string;
    department_id?: string;
    department_name?: string;
    university_id?: string;
  };
  create_dorm?: {
    building_name: string;
    campus_zone?: string;
    university_id: string;
  };
}

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  AddEntry: undefined;
  Profile: undefined;
};
