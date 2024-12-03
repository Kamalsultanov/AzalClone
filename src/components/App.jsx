import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";
import Layout from "../Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Offers from "./main/Offers/Offers";
import OfferDetailPage from "./main/offers/OfferDetailPage";

function App() {


  // useEffect(() => {
  //   fetch("http://localhost:3000/locations")
  //     .then((r) => r.json())
  //     .then((d) => console.log(d));
  // });

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" index element={<Main />} />
        <Route path="/offers" element={<Offers/>} /> 
        <Route path="/offers/:offerId" element={<OfferDetailPage />}/>
      </Route>
    </Routes>
  );
}

export default App;
