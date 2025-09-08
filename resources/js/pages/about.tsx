import AppLayout from "@/layouts/AppLayout";

export default function About() {
  return (
    <AppLayout title="About - Trip Vista">
      <div className="pt-32 pb-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">About Trip Vista</h1>
          <p className="text-lg text-muted-foreground">
            We are passionate about bringing unforgettable travel experiences to adventurers around the world.
          </p>
        </div>
      </div>
    </AppLayout>
  );
}
