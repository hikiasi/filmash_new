// This is the page for the car configurator.
// The full implementation will be done in Task 7.

interface ConfiguratorPageProps {
  params: {
    brand: string;
    model: string;
  };
}

export default function ConfiguratorPage({ params }: ConfiguratorPageProps) {
  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold">Configurator</h1>
      <p>Brand: {params.brand}</p>
      <p>Model: {params.model}</p>
      <p className="mt-4 text-zinc-400">
        (This is a placeholder page. The full configurator UI will be built in Task 7.)
      </p>
    </div>
  );
}
