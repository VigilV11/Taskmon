const express = require('express');
const Task = require('../models/task');

const taskRouter = new express.Router();

//--------------------------------------------------------------------------------------//
//                                       CREATE                                         //
//--------------------------------------------------------------------------------------//

taskRouter.post('/task', async (req, res) => {
  const task = new Task(req.body);

  try {
    await task.save();
    res.status(201).send({ message: 'Task created' });
  } catch (e) {
    res.status(400).send({ message: `Task could not be created because ${e}` });
  }
});

//--------------------------------------------------------------------------------------//
//                                        READ                                          //
//--------------------------------------------------------------------------------------//

// ---- Read: All tasks ------------------------------------------------------------------

// Get all tasks
taskRouter.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.send(500).send();
  }
});

// ---- Read: Single task ----------------------------------------------------------------

// Get a task by ID
taskRouter.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send('Task not found');
    }
    res.status(200).send(task);
  } catch (e) {
    res.send(500).send();
  }
});

//--------------------------------------------------------------------------------------//
//                                       UPDATE                                         //
//--------------------------------------------------------------------------------------//

// Update a task
taskRouter.patch('/tasks/:id', async (req, res) => {
  // Only update the document if the update is permitted
  const permittedUpdates = ['description', 'completed'];
  const updateKeys = Object.keys(req.body);

  const isValid = updateKeys.every((key) => permittedUpdates.includes(key));

  if (!isValid) {
    return res.status(403).send();
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // no matching task
    if (!task) {
      return res.status(404).send('Task not found');
    }
    // update successful
    res.status(200).send(task);
  } catch (e) {
    res.send(500).send(); //update failed
  }
});

//--------------------------------------------------------------------------------------//
//                                       DELETE                                         //
//--------------------------------------------------------------------------------------//

// Delete a task
taskRouter.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    // no matching task
    if (!task) {
      return res.status(404).send('No matching task');
    }
    // delete successful
    res.status(200).send(task);
  } catch (e) {
    res.send(500).send(e.message); //delete failed
  }
});

//  **************************************************************************************

module.exports = taskRouter;
