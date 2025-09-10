import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { store } from '@/routes/admin/agencies';
import { Head, useForm } from '@inertiajs/react';

export default function CreateAgency() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        email: '',
        phone: '',
        address: '',
        website: '',
        logo: null as File | null,
        featured_image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(store().url);
    };

    return (
        <AppLayout>
            <Head title="Create Agency" />
            <div className="mx-auto max-w-2xl p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Agency</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Agency Name</Label>
                                <Input id="name" type="text" value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                                {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                            </div>

                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} required />
                                {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <Button type="submit" disabled={processing}>
                                {processing ? 'Creating...' : 'Create Agency'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
