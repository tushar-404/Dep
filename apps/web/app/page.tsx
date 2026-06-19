import DeployForm from "../components/deployer/DeployerForm";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-3">
            HTML Deployer
          </h1>
          <p className="text-lg text-gray-500">
            Instantly host your single-page HTML applications.
          </p>
        </div>
        
        <DeployForm />
      </div>
    </div>
  );
}