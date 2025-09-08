import AppLayout from "@/layouts/AppLayout";
import { destinations } from "@/data/destinations";

interface Props {
  id: string;
}

export default function DestinationDetails({ id }: Props) {
  const destination = destinations.find(d => d.id === parseInt(id));

  if (!destination) {
    return (
      <AppLayout title="Destination Not Found">
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Destination Not Found</h1>
          <p>Sorry, we could not find the destination you are looking for.</p>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout title={`${destination.name} - Trip Vista`}>
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <img
              src={destination.image}
              alt={destination.name}
              className="w-full h-96 object-cover rounded-xl mb-8"
            />
            <h1 className="text-4xl font-bold mb-4">{destination.name}</h1>
            <p className="text-lg text-muted-foreground mb-6">{destination.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Country</h3>
                <p className="text-muted-foreground">{destination.country}</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Price</h3>
                <p className="text-muted-foreground">{destination.price}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
