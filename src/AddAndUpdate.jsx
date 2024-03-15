import React from "react";
import Modal from "./components/Modal";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "./config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const AddAndUpdate = ({ isOpen, onClose, isUpdate, contact }) => {
  const addContact = async (contact) => {
    try {
      const contactRef = collection(db, "contacts");
      await addDoc(contactRef, contact);
      onClose();
      toast.success("Contact Added Succesfully");
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactRef = doc(db, "contacts");
      await updateDoc(contactRef, contact);
      onClose();
      toast.success("Contact Updated Succesfully");
    } catch (error) {
      console.log("Error adding document: ", error);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Formik
          validationSchema={contactSchemaValidation}
          initialValues={
            isUpdate
              ? {
                  name: contact.name,
                  email: contact.email,
                }
              : {
                  name: "",
                  email: "",
                }
          }
          onSubmit={(values) => {
            isUpdate
              ? updateContact(values, contact.id)
              : addContact({ ...values });
            onClose();
          }}
        >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="name">Name:</label>
              <Field type="text" name="name" className="border h-10 px-2" />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="name" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email:</label>
              <Field type="email" name="email" className="border h-10 px-2" />
              <div className="text-red-500 text-xs">
                <ErrorMessage name="email" />
              </div>
            </div>

            <button className="bg-orange px-3 py-1.5 border self-end">
              {isUpdate ? "Update" : "Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modal>
    </div>
  );
};

export default AddAndUpdate;
