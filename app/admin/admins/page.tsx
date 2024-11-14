import { db } from '@/lib/db';
import { admins } from '@/lib/schema';
import { AddAdminButton } from './add-admin-button';
import { AdminList } from './admin-list';

export default async function AdminsPage() {
  const adminList = await db.select().from(admins);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Administrators</h1>
        <AddAdminButton />
      </div>
      
      <AdminList initialAdmins={adminList} />
    </div>
  );
}