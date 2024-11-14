'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

type Stack = {
  id: string;
  name: string;
  icon: string;
  discordUrl: string | null;
};

type EditStackDialogProps = {
  stack: Stack | null;
  onClose: () => void;
  onUpdate: (stack: Stack) => void;
};

export function EditStackDialog({ stack, onClose, onUpdate }: EditStackDialogProps) {
  const [formData, setFormData] = useState<Stack>({
    id: '',
    name: '',
    icon: '',
    discordUrl: '',
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (stack) {
      setFormData({
        id: stack.id,
        name: stack.name,
        icon: stack.icon,
        discordUrl: stack.discordUrl || '',
      });
    }
  }, [stack]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/stacks/${formData.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to update stack');

      const updatedStack = await res.json();
      onUpdate(updatedStack);
      toast({
        title: 'Success',
        description: 'Tech stack updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update tech stack',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={!!stack} onOpenChange={() => onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Tech Stack</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Stack Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>
          <div>
            <Input
              placeholder="DevIcon Class (e.g., devicon-react-plain)"
              value={formData.icon}
              onChange={(e) =>
                setFormData({ ...formData, icon: e.target.value })
              }
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Find icons at <a href="https://devicon.dev" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">devicon.dev</a>
            </p>
          </div>
          <div>
            <Input
              placeholder="Discord Invite URL"
              value={formData.discordUrl || ''}
              onChange={(e) =>
                setFormData({ ...formData, discordUrl: e.target.value })
              }
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Stack'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}