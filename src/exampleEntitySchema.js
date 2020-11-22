import * as yup from "yup";

export const entitySchema = yup.object().shape({
  id: yup.string(),
  first_name: yup.string().required(),
  last_name: yup.string(),
  email: yup.string().email().required(),
  gender: yup.string().oneOf(["male", "female", "other"]),
});

export const entityColumns = [
  {
    id: "id",
    label: "ID",
    type: "hidden",
  },
  {
    id: "first_name",
    label: "First name",
    type: "text",
  },
  {
    id: "last_name",
    label: "Last name",
    type: "text",
  },
  {
    id: "email",
    label: "Email address",
    type: "text",
  },
  {
    id: "gender",
    label: "Gender",
    type: "select",
    options: [
      {
        id: "male",
        label: "male",
      },
      {
        id: "female",
        label: "female",
      },
    ],
  },
];
