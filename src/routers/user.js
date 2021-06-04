const express = require('express');
const User = require('../models/user');

const userRouter = new express.Router();

//--------------------------------------------------------------------------------------//
//                                       CREATE                                         //
//--------------------------------------------------------------------------------------//

userRouter.post('/user', async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ message: 'User created' });
  } catch (e) {
    res.status(400).send({ message: `User could not be created because ${e}` });
  }
});

//--------------------------------------------------------------------------------------//
//                                        READ                                          //
//--------------------------------------------------------------------------------------//

// ---- Read: All users ------------------------------------------------------------------

userRouter.get('/users', async (req, res) => {
  try {
    const users = await Task.find({});
    res.status(200).send(users);
  } catch (e) {
    es.send(500).send();
  }
});

// ---- Read: Single user ----------------------------------------------------------------

// Get a user by ID
userRouter.get('/users/:id', async (req, res) => {
  try {
    const user = await Task.findById(req.params.id);
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(user);
  } catch (e) {
    res.send(500).send();
  }
});

//--------------------------------------------------------------------------------------//
//                                       UPDATE                                         //
//--------------------------------------------------------------------------------------//

userRouter.patch('/users/:id', async (req, res) => {
  // Only update the document if the update is permitted
  const permittedUpdates = ['userName', 'email'];
  const updateKeys = Object.keys(req.body);

  const isValid = updateKeys.every((key) => permittedUpdates.includes(key));

  if (!isValid) {
    return res.status(403).send();
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    // no matching task
    if (!user) {
      return res.status(404).send('Task not found');
    }
    // update successful
    res.status(200).send(user);
  } catch (e) {
    res.send(500).send(); //update failed
  }
});

//--------------------------------------------------------------------------------------//
//                                       DELETE                                         //
//--------------------------------------------------------------------------------------//

userRouter.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    // no matching user
    if (!user) {
      return res.status(404).send('No matching user');
    }
    // delete successful
    res.status(200).send(user);
  } catch (e) {
    res.send(500).send(e.message); //delete failed
  }
});

//  **************************************************************************************

module.exports = userRouter;
