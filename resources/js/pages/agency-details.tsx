import AppLayout from "@/layouts/AppLayout";
import { agencies } from "@/data/agencies";

interface Props {
  id: string;
}

export default function AgencyDetails({ id }: Props) {
  const agency = agencies.find(a => a.id === parseInt(id));

  if (!agency) {
    return (
      <AppLayout title="Agency Not Found">
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Agency Not Found</h1>
          <p>Sorry, we could not find the agency you are looking for.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`${agency.name} - Trip Vista`}>
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img
              src={agency.featuredImage}
              alt={agency.name}
              className="w-full h-96 object-cover rounded-xl mb-8"
            />
            <h1 className="text-4xl font-bold mb-4">{agency.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{agency.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Founded</h3>
                <p className="text-muted-foreground">{agency.foundedYear}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Rating</h3>
                <p className="text-muted-foreground">{agency.rating}/5</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
