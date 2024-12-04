'use client'

import { useEffect, useState } from 'react';
import { AddAdminButton } from './add-admin-button';
import { AdminList } from './admin-list';
import { getAdmins } from './actions/admin';

export default function AdminsPage() {
    const [adminList, setAdminList] = useState<{
      id: string;
      email: string;
      password: string;
      createdAt: Date | null;
  }[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAdmins = async () => {
            try {
                const data = await getAdmins();
                setAdminList(data);
            } catch (error) {
                console.error('Error fetching administrators:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, []);

    if (loading) {
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900">Administrators</h1>
                    <AddAdminButton />
                </div>
                <div>Loading...</div>
            </div>
        );
    }

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