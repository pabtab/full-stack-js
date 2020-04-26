import { addNewTask, updateTask } from "./server";

(async function myFunc() {

  await addNewTask({
    name: 'My task',
    id: '1234'
  })

  await updateTask({
    id: '1234',
    name: 'pabtab'
  })
})()
