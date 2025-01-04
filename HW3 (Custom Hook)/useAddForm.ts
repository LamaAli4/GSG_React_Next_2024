// import { useState } from "react";
import { IStudent } from "./types.ts";
import { validateStudent } from "./utils/validation.ts";

const INITIAL_STUDENT: IStudent = {
  age: 0,
  coursesList: [],
  id: "",
  isGraduated: false,
  name: "",
  absents: 0,
};

interface UseAddFormProps {
  onSubmit: (std: IStudent) => void;
}

const useAddForm = ({ onSubmit }: UseAddFormProps) => {
  const [student, setStudent] = useState<IStudent>(INITIAL_STUDENT);
  const [errorsList, setErrorsList] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (field: string, value: any) => {
    setStudent({ ...student, [field]: value });
  };

  const handleCoursesChange = (list: string[]) => {
    setStudent({ ...student, coursesList: list });
  };

  const handleSubmit = () => {
    const newStudent: IStudent = { ...student, id: Date.now().toString() };

    const errors = validateStudent(newStudent);
    if (errors.length > 0) {
      setErrorsList(errors);
    } else {
      setErrorsList([]);
      onSubmit(newStudent);
      handleClear();
    }
  };

  const handleClear = () => {
    setStudent(INITIAL_STUDENT);
  };

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return {
    student,
    errorsList,
    isOpen,
    handleChange,
    handleCoursesChange,
    handleSubmit,
    handleClear,
    toggleOpen,
  };
};

export default useAddForm;
