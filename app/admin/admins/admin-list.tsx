'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

type Admin = {
  id: string;
  email: string;
  createdAt: Date;
};

export function AdminList({ initialAdmins }: { initialAdmins: Admin[] }) {
  const [admins, setAdmins] = useState(initialAdmins);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/admins/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete administrator');

      setAdmins(admins.filter((admin) => admin.id !== id));
      toast({
        title: 'Success',
        description: 'Administrator removed successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove administrator',
        variant: 'destructive',
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Email</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {admins.map((admin) => (
          <TableRow key={admin.id}>
            <TableCell>{admin.email}</TableCell>
            <TableCell>
              {format(new Date(admin.createdAt), 'MMM d, yyyy')}
            </TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDelete(admin.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}