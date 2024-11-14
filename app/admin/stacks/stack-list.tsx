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
import { Pencil, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { EditStackDialog } from './edit-stack-dialog';

type Stack = {
  id: string;
  name: string;
  icon: string;
  discordUrl: string | null;
};

export function StackList({ initialStacks }: { initialStacks: Stack[] }) {
  const [stacks, setStacks] = useState(initialStacks);
  const [editingStack, setEditingStack] = useState<Stack | null>(null);
  const { toast } = useToast();

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/stacks/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) throw new Error('Failed to delete stack');

      setStacks(stacks.filter((stack) => stack.id !== id));
      toast({
        title: 'Success',
        description: 'Tech stack deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete tech stack',
        variant: 'destructive',
      });
    }
  };

  const handleEdit = (stack: Stack) => {
    setEditingStack(stack);
  };

  const handleUpdate = (updatedStack: Stack) => {
    setStacks(stacks.map(stack => 
      stack.id === updatedStack.id ? updatedStack : stack
    ));
    setEditingStack(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Icon</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Discord URL</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stacks.map((stack) => (
            <TableRow key={stack.id}>
              <TableCell>
                <i className={`${stack.icon} text-2xl`} />
              </TableCell>
              <TableCell>{stack.name}</TableCell>
              <TableCell>{stack.discordUrl || '-'}</TableCell>
              <TableCell className="text-right space-x-2">
                <Button
                  className="bg-primary hover:bg-primary/90"
                  size="sm"
                  onClick={() => handleEdit(stack)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  className="bg-primary hover:bg-primary/90"
                  size="sm"
                  onClick={() => handleDelete(stack.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <EditStackDialog
        stack={editingStack}
        onClose={() => setEditingStack(null)}
        onUpdate={handleUpdate}
      />
    </>
  );
}