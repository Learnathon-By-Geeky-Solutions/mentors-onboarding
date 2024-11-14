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

type License = {
  id: string;
  licenseKey: string;
  usedBy: string | null;
  usedAt: Date | null;
  createdAt: Date;
};

export function LicenseList({ initialLicenses }: { initialLicenses: License[] }) {
  const [licenses, setLicenses] = useState(initialLicenses);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/licenses/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete license');

      setLicenses(licenses.filter((license) => license.id !== id));
      toast({
        title: 'Success',
        description: 'License key deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete license key',
        variant: 'destructive',
      });
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>License Key</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Used By</TableHead>
          <TableHead>Used At</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {licenses.map((license) => (
          <TableRow key={license.id}>
            <TableCell className="font-mono">{license.licenseKey}</TableCell>
            <TableCell>
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  license.usedBy
                    ? 'bg-red-100 text-red-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {license.usedBy ? 'Used' : 'Available'}
              </span>
            </TableCell>
            <TableCell>{license.usedBy || '-'}</TableCell>
            <TableCell>
              {license.usedAt
                ? format(new Date(license.usedAt), 'MMM d, yyyy')
                : '-'}
            </TableCell>
            <TableCell>
              {format(new Date(license.createdAt), 'MMM d, yyyy')}
            </TableCell>
            <TableCell className="text-right">
              <Button
                className="bg-primary hover:bg-primary/90"
                size="sm"
                onClick={() => handleDelete(license.id)}
                disabled={!!license.usedBy}
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