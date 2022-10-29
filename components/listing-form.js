import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";

const ListingForm = ({
  initialValues = null,
  redirectPath = '',
  buttonText = 'Submit',
  onSubmit = () => null,
}) => {
  return (
    <div>
      {buttonText}
    </div>
  );
};

export default ListingForm;
