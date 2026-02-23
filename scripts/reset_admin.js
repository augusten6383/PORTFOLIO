const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env.local
const result = dotenv.config({ path: path.resolve(__dirname, '../.env.local') });
if (result.error) {
    console.error('Error loading .env.local:', result.error);
}

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Error: Supabase URL or Service Role Key missing from .env.local');
    console.error('Ensure .env.local exists in the root directory and contains NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
    process.exit(1);
}

// Clean up keys
supabaseUrl = supabaseUrl.split('#')[0].trim();
supabaseServiceKey = supabaseServiceKey.split('#')[0].trim();

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
});

const email = process.argv[2];
const newPassword = process.argv[3];

async function main() {
    if (!email || !newPassword) {
        console.log('Usage: node scripts/reset_admin.js <email> <new_password>');
        console.log('\nListing available users...');

        const { data: { users }, error } = await supabase.auth.admin.listUsers();

        if (error) {
            console.error('Error listing users:', error.message);
            return;
        }

        if (!users || users.length === 0) {
            console.log('No users found.');
            return;
        }

        console.log('Found users:');
        users.forEach(u => {
            console.log(`- ${u.email} (ID: ${u.id})`);
        });

        console.log('\nRun the command again with the email and new password to reset.');
        return;
    }

    console.log(`Resetting password for user: ${email}...`);

    // Find user by email to get ID (optional, updateUserById is safer if we had ID, but strictly strictly strictly strictly strictly strictly strictly strictly strictly striclty, updateUser can take attributes directly? No, admin.updateUserById)
    // Actually admin.updateUserById is the method. admin.updateUser doesn't exist?
    // Let's check documentation or types. createClient returns SupabaseClient. auth.admin is GoTrueAdminApi.
    // It has updateUserById(uid, attributes).

    // So first I need the ID.
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers();
    if (listError) {
        console.error('Error finding user:', listError.message);
        return;
    }

    const user = users.find(u => u.email === email);
    if (!user) {
        console.error(`User with email ${email} not found.`);
        return;
    }

    const { data, error: updateError } = await supabase.auth.admin.updateUserById(
        user.id,
        { password: newPassword }
    );

    if (updateError) {
        console.error('Error updating password:', updateError.message);
    } else {
        console.log('Password updated successfully!');
        console.log(`You can now login with: ${email} / ${newPassword}`);
    }
}

main().catch(err => console.error('Unexpected error:', err));
