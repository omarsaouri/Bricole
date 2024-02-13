const {createClient} = require('@supabase/supabase-js');
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);

try {
  supabase; // Ensure supabase is defined
} catch (error) {
  console.error('Error initializing Supabase client:', error);
}

module.exports = supabase;
