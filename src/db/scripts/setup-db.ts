import { execSync } from 'child_process';

async function setupDatabase() {
  try {
    console.log('🚀 Starting complete database setup...\n');

    console.log('💣 Step 1: Dropping database...');
    execSync('rm -f 8bitmanager.db', { stdio: 'inherit' });
    console.log('✅ Database dropped successfully!\n');

    console.log('📋 Step 2: Pushing database schema...');
    execSync('pnpm run db:push', { stdio: 'inherit' });
    console.log('✅ Database schema pushed successfully!\n');

    console.log('⚡ Step 3: Setting up database triggers...');
    execSync('pnpm run db:triggers', { stdio: 'inherit' });
    console.log('✅ Database triggers setup completed!\n');

    console.log('🌱 Step 4: Seeding database...');
    execSync('pnpm run db:seed', { stdio: 'inherit' });
    console.log('✅ Database seeding completed!\n');

    console.log('🎉 Complete database setup finished successfully!');
  } catch (error) {
    console.error('❌ Error during database setup:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  setupDatabase();
}
