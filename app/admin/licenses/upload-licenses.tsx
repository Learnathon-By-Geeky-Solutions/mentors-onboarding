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
import { useToast } from '@/hooks/use-toast';
import { Upload } from 'lucide-react';
import { Input } from '@/components/ui/input';

export function UploadLicenses() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const content = event.target?.result as string;
        const licenses = content.split('\n').filter(Boolean);

        const res = await fetch('/api/admin/licenses/bulk', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ licenses }),
        });

        if (!res.ok) throw new Error('Failed to upload licenses');

        toast({
          title: 'Success',
          description: `${licenses.length} license keys uploaded successfully`,
        });
        setOpen(false);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to upload license keys',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="upload-licenses-button">
          <Upload className="h-4 w-4 mr-2" />
          Upload Licenses
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload License Keys</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Upload a text file with one license key per line.
          </p>
          <Input
            type="file"
            accept=".txt"
            onChange={handleFileUpload}
            disabled={loading}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}