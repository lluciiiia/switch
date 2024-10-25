interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export const initialTodos: Todo[] = [
  { id: 1, text: "Confirm customer reservations", completed: false },
  { id: 2, text: "Prepare check-in documents", completed: false },
  { id: 3, text: "Prepare room key", completed: false },
];
