export interface Post {
    id: number;
    status?: string;
    image_urls?: string[];
    category?: string;
    featured?: boolean;
    price?: string; // Ensure this is 'string' or handle undefined cases
    name?: string;
    salary?: string;
    job_location?: string;
    location?: string;
    created_at?: string;
    user_id?: number;
    category_id: number;
    complete?: boolean;
    company?: string;
    ingredients?: string;
    property_type?: string;
    valid_until?: string;
    color?: string;
    dimensions?: string;
  }
  