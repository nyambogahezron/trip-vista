import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import AppLayout from '@/layouts/app-layout';
import { update } from '@/routes/admin/agencies';
import { Head, useForm } from '@inertiajs/react';

interface Agency {
    id: number;
    name: string;
    description: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    logo: string;
    featured_image: string;
}

interface EditAgencyProps {
    agency: Agency;
}

export default function EditAgency({ agency }: EditAgencyProps) {
    const { data, setData, put, processing, errors } = useForm({
        name: agency.name || '',
        description: agency.description || '',
        email: agency.email || '',
        phone: agency.phone || '',
        address: agency.address || '',
        website: agency.website || '',
        logo: null as File | null,
        featured_image: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(update(agency.id).url);
    };

    return (
        <AppLayout>
            <Head title={`Edit ${agency.name}`} />
            <div className="mx-auto max-w-2xl p-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Agency</CardTitle>
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
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" type="text" value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                                {errors.phone && <p className="text-sm text-red-500">{errors.phone}</p>}
                            </div>

                            <div>
                                <Label htmlFor="address">Address</Label>
                                <Input id="address" type="text" value={data.address} onChange={(e) => setData('address', e.target.value)} />
                                {errors.address && <p className="text-sm text-red-500">{errors.address}</p>}
                            </div>

                            <div>
                                <Label htmlFor="website">Website</Label>
                                <Input id="website" type="url" value={data.website} onChange={(e) => setData('website', e.target.value)} />
                                {errors.website && <p className="text-sm text-red-500">{errors.website}</p>}
                            </div>

                            <div>
                                <Label htmlFor="description">Description</Label>
                                <Textarea id="description" value={data.description} onChange={(e) => setData('description', e.target.value)} />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Agency'}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
