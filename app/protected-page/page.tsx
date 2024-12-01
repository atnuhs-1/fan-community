"use client"; // form.tsx

import { getFormProps, getInputProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";
import { useFormState } from "react-dom";
import { login } from "@/app/actions/testactions";
import { schema } from "@/app/actions/testschema";
import { X } from "lucide-react";

export default function LoginForm() {
  const [lastResult, action] = useFormState(login, undefined);

  const [form, fields] = useForm({
    constraint: getZodConstraint(schema),
    onValidate: ({ formData }) => parseWithZod(formData, { schema }),
    defaultValue: { todos: [{ title: "title", notes: "aaaa" }] },
  });

  // getFieldListを使うことで配列の各要素にアクセスすることができる
  const todos = fields.todos.getFieldList();
  console.log(todos);

  return (
    <form {...getFormProps(form)} noValidate>
      <ul className="bg-white p-4 m-4 space-y-2">
        <div className="flex justify-between p-2">
          <h1 className="font-bold">Todo</h1>
          <button
            {...form.insert.getButtonProps({
              name: fields.todos.name,
            })}
            className="text-white bg-blue-500 rounded-xl px-3 py-1"
          >
            +
          </button>
        </div>

        {todos.map((todo, index) => {
          // getFieldsetを使うことでオブジェクトの子フィールドにアクセスすることができる
          const todoFields = todo.getFieldset();
          return (
            <li key={todo.key} className="flex space-x-2 ">
              <div className="space-x-2">
                <label htmlFor={todoFields.title.id}>title:</label>
                <input
                  {...getInputProps(todoFields.title, { type: "text" })}
                  className="border rounded-xl p-2"
                />
                <div id={todoFields.title.errorId}>
                  {todoFields.title.errors}
                </div>
              </div>

              <div className="space-x-2">
                <label htmlFor={todoFields.notes.id}>notes:</label>
                <input
                  {...getInputProps(todoFields.notes, { type: "text" })}
                  className="border rounded-xl p-2"
                />
                <div id={todoFields.notes.errorId}>
                  {todoFields.notes.errors}
                </div>
              </div>
              <button
                {...form.remove.getButtonProps({
                  name: fields.todos.name,
                  index,
                })}
                className="text-red-500 hover:text-red-700"
              >
                <X className="w-5 h-5" />
              </button>
            </li>
          );
        })}
      </ul>
    </form>
  );
}
