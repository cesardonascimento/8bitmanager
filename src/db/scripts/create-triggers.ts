import { execSync } from 'child_process';
import { join } from 'path';

export async function createTriggers() {
  const triggersPath = join(__dirname, '../sql/triggers.sql');

  execSync(`sqlite3 8bitmanager.db < "${triggersPath}"`, {
    stdio: 'inherit',
    cwd: process.cwd(),
  });
}

if (require.main === module) {
  createTriggers();
}
