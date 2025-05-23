export default function MainHeader() {
  return (
    <header className="p-4 bg-primary text-white">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-xl font-semibold">Event Buddy</h1>
        <nav>
          <a href="/" className="mr-4">
            Home
          </a>
          <a href="/signin">Sign In</a>
        </nav>
      </div>
    </header>
  );
}
