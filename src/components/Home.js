import Products from './Products'
import Message from './Message'


function Home() {
  return (
    <div>
      <main id="mainContainer">
        <div className="container">
          <Products />
          <Message />
        </div>
      </main>
    </div>
  );
}

export default Home;
