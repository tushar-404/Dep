import DeployForm from "../components/deployer/DeployerForm";

export default function Home() {
  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_25%,rgba(11,24,56,0.75)_0%,transparent_70%)]"
        aria-hidden="true"
      />

      <main className="relative z-10 min-h-dvh flex flex-col items-center justify-center px-5 py-12 gap-8">
        <header className="flex flex-col items-center gap-4 text-center max-w-[680px] mt-6">
          <h1 className="text-[clamp(2.5rem,6vw,3.75rem)] font-bold tracking-[-0.035em] leading-[1.1] text-white">
            What will you{" "}
            <em className="italic text-blue-400 not-italic" style={{ fontStyle: "italic" }}>
              deploy
            </em>{" "}
            today?
          </h1>
          <p className="text-[1rem] text-gray-400 leading-relaxed max-w-[400px]">
            Drop your HTML file and get a shareable live URL in seconds.
          </p>
        </header>

        <DeployForm />

        <div className="flex items-center gap-3 text-gray-600 text-sm">
          <span>or update an existing page</span>
          <span className="w-px h-3 bg-gray-700" />
          <span className="text-gray-500">use Update Existing mode</span>
        </div>
      </main>
    </>
  );
}