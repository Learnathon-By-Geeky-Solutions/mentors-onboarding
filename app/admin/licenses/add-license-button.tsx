'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Plus } from 'lucide-react';

export function AddLicenseButton() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [licenseKey, setLicenseKey] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/licenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ licenseKey }),
      });

      if (!res.ok) throw new Error('Failed to add license');

      toast({
        title: 'Success',
        description: 'License key added successfully',
      });
      setOpen(false);
      setLicenseKey('');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add license key',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="add-license-button">
          <Plus className="h-4 w-4 mr-2" />
          Add License
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New License Key</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Enter JetBrains License Key"
              value={licenseKey}
              onChange={(e) => setLicenseKey(e.target.value)}
              required
            />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Adding...' : 'Add License Key'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}