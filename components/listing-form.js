import { useState } from "react";
import { useRouter } from "next/router";
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from "react-hot-toast";
import { Formik, Form } from "formik";
import Input from "./input";
import ImageUpload from "./image-upload";

const ListingSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
  price: Yup.number().positive().integer().min(1).required(),
  guests: Yup.number().positive().integer().min(1).required(),
  beds: Yup.number().positive().integer().min(1).required(),
  baths: Yup.number().positive().integer().min(1).required(),
});

const ListingForm = ({
  initialValues = null,
  redirectPath = '',
  buttonText = 'Submit',
  onSubmit = () => null,
}) => {
  const router = useRouter();

  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? '');

  const upload = async image => {
    if (!upload) return;

    let toastId;

    try {
      setDisabled(true);
      toastId = toast.loading('Uploading...');
      const { data } = await fetch('/api/image-upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({image}),
      });
      //axios.post('/api/image-upload', { image });
      setImageUrl(data?.url);
      toast.success('Successfully upload', { id: toastId});
    } catch (e) {
      console.log(e);
      toast.error('Unable to upload', { id: toastId});
      setImageUrl('');
    } finally {
      setDisabled(false);
    }
  };

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading('Submitting...');
      //submit data
      if (typeof onSubmit === 'function') {
        await onSubmit({ ...values, image: imageUrl });
      }
      toast.success('Successfully submitted', { id: toastId });
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error('Unable to submit', { id: toastId });
      setDisabled(false);
    }
  };

  const { image, ...inititalFormValues } = initialValues ?? {
    image: '',
    title: '',
    description: '',
    price: 0,
    guests: 1,
    beds: 1,
    baths: 1,
  };

  return (
    <div>
      <div className="mb-8 max-w-md">
        <ImageUpload
          initialImage={{ src: image, alt: inititalFormValues.title }}
          onChangePicture={upload}
        />
      </div>

      <Formik
        initialValues={inititalFormValues}
        validationSchema={ListingSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-8">
            <div className="space-y-6">
              <Input
                id="title"
                name="title"
                type="text"
                label="Title"
                placeholder="Entire rental unit - Amsterdam"
                disabled={disabled}
              />

              <Input
                id="description"
                name="description"
                type="textarea"
                label="Description"
                placeholder="Very charming and modern apartment in Amsterdam..."
                disabled={disabled}
                rows={5}
              />

              <Input
                id="price"
                name="price"
                type="number"
                min="0"
                label="Price per night"
                placeholder="100"
                disabled={disabled}
              />

              <div className="flex space-x-4">
                <Input
                  id="guests"
                  name="guests"
                  type="number"
                  min="0"
                  label="Guests"
                  placeholder="2"
                  disabled={disabled}
                />

                <Input
                  id="beds"
                  name="beds"
                  type="number"
                  min="0"
                  label="Beds"
                  placeholder="1"
                  disabled={disabled}
                />

                <Input
                  id="baths"
                  name="baths"
                  type="number"
                  min="0"
                  label="Baths"
                  placeholder="1"
                  disabled={disabled}
                />
              </div>

            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={disabled || !isValid}
                className="bg-rose-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-rose-600 focus:ring-opacity-50 hover:bg-rose-500 transition disabled:cursor-not-allowed disabled:hover:bg-rose-600"
              >
                {isSubmitting ? 'Submitting...' : buttonText}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ListingForm.propTypes = {
  initialValues: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    price: PropTypes.number,
    guests: PropTypes.number,
    beds: PropTypes.number,
    baths: PropTypes.number,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ListingForm;
