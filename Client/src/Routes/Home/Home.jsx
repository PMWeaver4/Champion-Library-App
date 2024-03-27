import Navbar from "../../Components/Navbar/Navbar";
export default function Home() {
  return (
    // home page that contains the "dashboard or main page once logged in"
    <main className="home-page">
      <Navbar />
      <div className="home-banner">
        <h1 className="welcome-msg">Welcome to South Meadow's Lending Library!</h1>
        <h2 className="slogan">Building Community Beyond Books</h2>
      </div>
    </main>
  );
}
