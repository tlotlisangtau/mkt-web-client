import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mrcrgxijqzzfzrmhfkjb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1yY3JneGlqcXp6ZnpybWhma2piIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjI3Njg2MzEsImV4cCI6MjAzODM0NDYzMX0.Bt3BIYkQPHlSgg66AsaHbC0PmNETDr-npdmc6gRnEAs';

const supabase = createClient(supabaseUrl, supabaseKey);

export const getSignedUrl = async (path: string): Promise<string> => {
  const { data, error } = await supabase.storage
    .from('images')
    .createSignedUrl(path, 60); // URL expires in 60 seconds

  if (error) {
    console.error('Error creating signed URL:', error);
    throw error;
  }

  return data.signedUrl;
};

export default supabase;
