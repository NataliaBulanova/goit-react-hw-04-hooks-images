import "./App.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import SearchBar from "./components/Searchbar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import Loader from "./components/Loader/Loader";

axios.defaults.baseURL = "https://pixabay.com/api";

const App = () => {
  const [images, setImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onSubmitHandler = (query) => {
    setQuery(query);
    setPage(1);
    console.log(query);
  };

  const onLoadMoreHandler = () => {
    setPage((prev) => prev + 1);
  };

  const handleModalOpener = (largeImageURL) => {
    toggleModal();
    console.log(largeImageURL);
    setLargeImageURL(largeImageURL);
  };

  useEffect(() => {
    const FetchImagesWithQuery = async (searchQuery, page) => {
      setLoader(true);
      try {
        const response = await axios.get(
          `?key=24354649-5345b0d4fac46ed3dd7873120&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=12&&page=${page}`
        );
        const imagesFound = response.data.hits.map(
          ({ id, webformatURL, tags, largeImageURL }) => ({
            id,
            webformatURL,
            tags,
            largeImageURL,
          })
        );
        return imagesFound;
      } catch (error) {
        toast("Something was going wrong");
      } finally {
        setLoader(false);
      }
    };

    page > 1
      ? FetchImagesWithQuery(query, page).then((imagesFound) => {
          imagesFound.length
            ? setImages((prev) => [...prev, ...imagesFound])
            : toast("Sorry,No more images for your query");
        })
      : query
      ? FetchImagesWithQuery(query, page).then((imagesFound) => {
          setImages([]);
          imagesFound.length
            ? setImages([...imagesFound])
            : toast("Sorry, Nothing was found");
        })
      : setImages([]);
  }, [page, query]);

  return (
    <div className="App">
      <SearchBar onSubmit={onSubmitHandler} />
      <ToastContainer autoClose={2500} />
      {loader && <Loader />}
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL}></Modal>
      )}
      {images.length > 0 && (
        <ImageGallery images={images} onImage={handleModalOpener} />
      )}
      {images.length > 0 && <Button handleClick={onLoadMoreHandler} />}
    </div>
  );
};

export default App;
