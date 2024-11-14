import { db } from '@/lib/db';
import { techStacks, participants, jetbrainsLicenses } from '@/lib/schema';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Layers, Key } from 'lucide-react';

export default async function DashboardPage() {
  const [
    participantsCount,
    stacksCount,
    licensesCount
  ] = await Promise.all([
    db.select().from(participants).execute(),
    db.select().from(techStacks).execute(),
    db.select().from(jetbrainsLicenses).execute(),
  ]);

  const stats = [
    {
      name: 'Total Participants',
      value: participantsCount.length,
      icon: Users,
      color: 'text-blue-600',
    },
    {
      name: 'Tech Stacks',
      value: stacksCount.length,
      icon: Layers,
      color: 'text-green-600',
    },
    {
      name: 'Available Licenses',
      value: licensesCount.filter(l => !l.usedBy).length,
      icon: Key,
      color: 'text-purple-600',
    },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.name}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}