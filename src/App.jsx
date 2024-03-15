import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FiSearch } from "react-icons/fi";
import { collection, onSnapshot } from "firebase/firestore";
import { AiFillPlusCircle } from "react-icons/ai";
import { FaRegCircleUser } from "react-icons/fa6";
import { db } from "./config/firebase";
import { getDocs } from "firebase/firestore";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import ContactCard from "./components/ContactCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddAndUpdate from "./AddAndUpdate";
import useDisclose from "./hooks/useDisclose";
import NotFoundContact from "./components/NotFoundContact";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDisclose();

  useEffect(() => {
    // fetch("http://localhost:3001/contacts")
    //   .then((response) => response.json())
    //   .then((data) => setContacts(data));
    const getContacts = async () => {
      try {
        const contactsRef = collection(db, "contacts");
        onSnapshot(contactsRef, (snapshot) => {
          const contactLists = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactLists);
          return contactLists;
        });
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactsRef = collection(db, "contacts");
    onSnapshot(contactsRef, (snapshot) => {
      const contactLists = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactLists.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] mx-auto px-4">
        <Navbar />
        <div className="flex gap-3 ">
          <div className="flex relative items-center flex-grow">
            <FiSearch className="text-white text-3xl absolute ml-1 " />
            <input
              onChange={filterContacts}
              type="text"
              name=""
              id=""
              className="flex-grow bg-transparent border border-white rounded-md h-10 text-white pl-10"
            />
          </div>
          <AiFillPlusCircle
            onClick={onOpen}
            className="flex justify-center items-center text-5xl text-white cursor-pointer"
          />
        </div>

        <div className="mt-4 gap-3 flex flex-col">
          {contacts.length <= 0 ? (
            <NotFoundContact />
          ) : (
            contacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))
          )}
        </div>
      </div>
      <AddAndUpdate onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center" />
    </>
  );
};

export default App;
