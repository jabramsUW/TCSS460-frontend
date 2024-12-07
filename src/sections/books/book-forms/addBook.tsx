'use client';

import React from 'react';

// next

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import AnimateButton from 'components/@extended/AnimateButton';

import axios from 'utils/axios';

export default function SendBook({  
  onSuccess,
  onError
}: {
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  return (
    <>
      <Formik
        initialValues={{
          isbn13: '',
          publication_year: '',
          title: '',
          image_url: '',
          small_url: '',
          authors: '',
          series_name: '',
          series_pos: '',
          rating_1: 0,
          rating_2: 0,
          rating_3: 0,
          rating_4: 0,
          rating_5: 0,

          submit: null
        }}

        validationSchema={Yup.object().shape({
          isbn13: Yup.number().required('ISBN is required'),
          publication_year: Yup.number().min(1000).required('Publication Year is required'),
          title: Yup.string().max(255).required('Title is required'),
          image_url: Yup.string(),
          small_url: Yup.string(),
          authors: Yup.string().required('Authors is required (comma-separated)').test('is-valid-authors', 'Authors must be a comma-separated list of strings', (value) => {
          if (!value) return false; // Field is required
          const authorsArray = value.split(',').map((author) => author.trim());
          return authorsArray.every((author) => author.length > 0); // Ensure all names are non-empty
          }),
          series_name: Yup.string(),
          series_pos: Yup.number(),
          rating_1: Yup.number().min(0).default(0),
          rating_2: Yup.number().min(0).default(0),
          rating_3: Yup.number().min(0).default(0),
          rating_4: Yup.number().min(0).default(0),
          rating_5: Yup.number().min(0).default(0),

        })}
        onSubmit={(values, { setErrors, setSubmitting, setValues, resetForm }) => {
          console.dir(values);
           
          //helper for arrays for author
          const authorsArray = values.authors.split(',').map((author) => author.trim());
          const seriesName = values.series_name || "N/A";
          const seriesNumber = values.series_pos || 0;
          const imageURL = values.image_url || "N/A";
          const smallImageURL = values.small_url || "N/A";

          axios
            .post('/book', { 
              isbn13: values.isbn13,
              publication_year: values.publication_year,
              title: values.title,
              image_url: imageURL,
              small_url: smallImageURL,
              authors: authorsArray,
              series_name: seriesName,
              series_pos: seriesNumber,
              rating_1: values.rating_1,
              rating_2: values.rating_2,
              rating_3: values.rating_3,
              rating_4: values.rating_4,
              rating_5: values.rating_5
          
               })
            .then((response) => {
              setSubmitting(false);
              resetForm({
                values: {
                  isbn13: '',
                  publication_year: '',
                  title: '',
                  image_url: '',
                  small_url: '',
                  authors: '',
                  series_name: '',
                  series_pos: '',
                  rating_1: 0,
                  rating_2: 0,
                  rating_3: 0,
                  rating_4: 0,
                  rating_5: 0,
                  
                  submit: null
                }
              });
              onSuccess();
            })
            .catch((error) => {
              console.error(error);
              setErrors({ submit: error.message });
              setSubmitting(false);
              onError(error.message);
            });
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            
            <Grid container spacing={1}>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="isbn13">Book ISBN</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.isbn13 && errors.isbn13)}
                    id="isbn13"
                    type="number"
                    value={values.isbn13}
                    name="isbn13"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the ISBN (13 digits)"
                
                  />
                </Stack>
                {touched.isbn13 && errors.isbn13 && (
                  <FormHelperText error id="standard-weight-helper-text-name-message-send">
                    {errors.isbn13}
                  </FormHelperText>
                )}
              </Grid>
              
              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="publication_year">Published Year</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.publication_year && errors.publication_year)}
                    id="publication_year"
                    type="number"
                    value={values.publication_year}
                    name="publication_year"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the published Year (XXXX)"
                  />
                </Stack>
                {touched.publication_year && errors.publication_year && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.publication_year}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="title">Title</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.title && errors.title)}
                    id="title"
                    type="text"
                    value={values.title}
                    name="title"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the Title "
                  />
                </Stack>
                {touched.title && errors.title && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.title}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="authors">Authors</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.authors && errors.authors)}
                    id="authors"
                    type="text"
                    value={values.authors}
                    name="authors"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter Author name(s)"
                  />
                </Stack>
                {touched.authors && errors.authors && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.authors}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="series_name">Series Name</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.series_name && errors.series_name)}
                    id="series_name"
                    type="text"
                    value={values.series_name}
                    name="series_name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the Series name (Leave blank if not exists)"
                  />
                </Stack>
                {touched.series_name && errors.series_name && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.series_name}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={6}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="series_pos">Series Number</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.series_pos && errors.series_pos)}
                    id="series_pos"
                    type="number"
                    value={values.series_pos}
                    name="series_pos"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter the Series number (Leave blank if not exists)"
                  />
                </Stack>
                {touched.series_pos && errors.series_pos && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.series_pos}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="image_url">image_url</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.image_url && errors.image_url)}
                    id="image_url"
                    type="text"
                    value={values.image_url}
                    name="image_url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter image url for the book (Leave blank if not exists)"
                  />
                </Stack>
                {touched.image_url && errors.image_url && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.image_url}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="small_url">small_url</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.small_url && errors.small_url)}
                    id="small_url"
                    type="text"
                    value={values.small_url}
                    name="small_url"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter small image url for the book (Leave blank if not exists)"
                  />
                </Stack>
                {touched.small_url && errors.small_url && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.small_url}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={2.4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rating_1">1 Star Rating</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rating_1 && errors.rating_1)}
                    id="rating_1"
                    type="number"
                    value={values.rating_1}
                    name="rating_1"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="# of Ratings"
                  />
                </Stack>
                {touched.rating_1 && errors.rating_1 && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.rating_1}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={2.4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rating_2">2 Star Rating</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rating_2 && errors.rating_2)}
                    id="rating_2"
                    type="number"
                    value={values.rating_2}
                    name="rating_2"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="# of Ratings"
                  />
                </Stack>
                {touched.rating_2 && errors.rating_2 && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.rating_2}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={2.4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rating_3">3 Star Rating</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rating_3 && errors.rating_3)}
                    id="rating_3"
                    type="number"
                    value={values.rating_3}
                    name="rating_3"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="# of Ratings"
                  />
                </Stack>
                {touched.rating_3 && errors.rating_3 && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.rating_3}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={2.4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rating_4">4 Star Rating</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rating_4 && errors.rating_4)}
                    id="rating_4"
                    type="number"
                    value={values.rating_4}
                    name="rating_4"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="# of Ratings"
                  />
                </Stack>
                {touched.rating_4 && errors.rating_4 && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.rating_4}
                  </FormHelperText>
                )}
              </Grid>

              <Grid item xs={2.4}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="rating_5">5 Star Rating</InputLabel>
                  <OutlinedInput
                    fullWidth
                    error={Boolean(touched.rating_5 && errors.rating_5)}
                    id="rating_5"
                    type="number"
                    value={values.rating_5}
                    name="rating_5"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="# of Ratings"
                  />
                </Stack>
                {touched.rating_5 && errors.rating_5 && (
                  <FormHelperText error id="standard-weight-helper-text-msg-message-send">
                    {errors.rating_5}
                  </FormHelperText>
                )}
              </Grid>


              {errors.submit && (
                <Grid item xs={12}>
                  <FormHelperText error>{errors.submit}</FormHelperText>
                </Grid>
              )}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                    Add Book!
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}
